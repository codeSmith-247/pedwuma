<?php

namespace Model\Proposal;

use Model\Model;

class Proposal extends Model
{
    private $user_type;
    private $id;

    public function __construct($user_type = null, $id = null)
    {
        parent::__construct();

        $this->user_type = $user_type;
        $this->id = $id;
    }

    public function totalProposals(string $status = ''): int
    {
        $proposal = $this->fetchTotal('proposals');

        if ($this->user_type == 'employer') {
            $proposal->where('employer_id', $this->id);
        } else {
            $proposal->where('skilled_id', $this->id);
        }

        if ($status === '') {
            $proposal = $proposal->execute();
            $this->logger->info('retrieved total proposals');

            return (int) $proposal;
        }

        $proposal = $proposal->where('status', $status)
                    ->execute();

        $this->logger->info("retrieved total $status proposals");

        return (int) $proposal;
    }

    public function totalProposalsByTime(string $startDate, string $endDate, string $status = ''): int
    {
        $proposal = $this->fetchTotal('proposals')
                    ->where('created_at', '>=', $startDate)
                    ->andWhere('created_at', '<=', $endDate);

        if ($this->user_type == 'employer') {
            $proposal->andWhere('employer_id', $this->id);
        } else {
            $proposal->andWhere('skilled_id', $this->id);
        }

        if ($status !== '') {
            $proposal->andWhere('status', $status);
        }

        return (int) $proposal->execute();
    }

    public function proposals(string $status = ''): array
    {
        $proposals = $this->fetch('proposals')
                          ->subFetch('image', 'select media from users where users.id = proposals.skilled_id')
                          ->subFetch('name', 'select fullname from users where users.id = proposals.skilled_id')
                          ->subFetch('location', 'select location from users where users.id = proposals.skilled_id');

        if ($this->user_type == 'employer') {
            $proposals->where('employer_id', $this->id);
        } else {
            $proposals->where('skilled_id', $this->id);
        }

        if ($status !== '') {
            $proposals->andWhere('status', $status);
        }

        return $proposals->paginate()->execute();
    }

    public function proposal($id): array
    {
        $proposals = $this->fetch('proposals')
                     ->subFetch('image', 'select media from users where users.id = proposals.skilled_id')
                     ->subFetch('name', 'select fullname from users where users.id = proposals.skilled_id')
                     ->groupWhere([
                        ['where', 'employer_id', $this->id],
                        ['or', 'skilled_id', $this->id],
                     ], true)
                     ->andWhere('id', $id)
                     ->execute();

        $this->logger->info("retrieved a proposal with id:$id");

        return $proposals[0] ?? [];
    }

    public function userProposal(int $id, string $status = ''): array
    {
        $proposals = $this->fetch('proposals');

        if ($this->user_type == 'employer') {
            $proposals->where('employer_id', $this->id);
        } else {
            $proposals->where('skilled_id', $this->id);
        }

        $proposals->andWhere('id', $id);

        if ($status !== '') {
            $proposals->andWhere('status', $status);
        }

        return $proposals->execute()[0] ?? [];
    }

    public function proposalExists(int $id, string $status = ''): array
    {
        $proposals = $this->fetch('proposals');

        if ($this->user_type == 'employer') {
            $proposals->where('employer_id', $this->id);
        } else {
            $proposals->where('skilled_id', $this->id);
        }

        $proposals->andWhere('job_id', $id);

        if ($status !== '') {
            $proposals->andWhere('status', $status);
        }

        return $proposals->execute()[0] ?? [];
    }

    public function new(array $values): void
    {
        $sql = 'insert into proposals set title = ? , description = ?,  media = ?, job_id = ?, employer_id = ?, skilled_id = ?, status = "pending"';

        $values = [
            $values['title'],
            $values['description'],
            $values['media'],
            $values['id'],
            $values['employer_id'],
            $values['skilled_id'],
        ];

        $this->insert($sql, $values);

        $this->logger->info("created new proposal with title: {$values[0]}");
    }

    public function setProposal($id, $status)
    {
        $sql = 'update proposals set status = ? where id = ?;';

        if ($status !== 'accepted') {
            $status = 'rejected';
        }

        $values = [
            $status,
            $id,
        ];

        $this->insert($sql, $values);

        return true;
    }

    public function searchProposals(string $search): array
    {
        $proposals = $this->fetch('proposals, users', ['distinct proposals.*'])
                     ->subFetch('image', 'select media from users where users.id = proposals.skilled_id')
                     ->subFetch('name', 'select fullname from users where users.id = proposals.skilled_id')
                     ->subFetch('location', 'select location from users where users.id = proposals.skilled_id')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'users.fullname', 'like', "%$search%"],
                        ['or', 'users.location', 'like', "%$search%"],
                     ], true)
                     ->groupWhere([
                        ['where', 'employer_id', $this->id],
                        ['or', 'skilled_id', $this->id],
                     ], operator: 'and')
                     ->rawCondition(" and (proposals.employer_id = users.id or proposals.skilled_id = users.id) ");

        return $proposals->paginate()->execute();
    }
}
