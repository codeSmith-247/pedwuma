<?php

namespace Model\Skilled;

use Model\Job\Job;
use Model\Proposal\Proposal;
use Model\User\User;

class Skilled extends User
{
    public $id = null;
    public object $jobs;
    public object $proposals;

    public function __construct($id = null)
    {
        parent::__construct();

        $this->id = $id;
        $this->jobs = new Job('skilled', $id);
        $this->proposals = new Proposal('skilled', $id);
    }

    public function newSkilledView(array $values)
    {
        $sql = 'insert into skilled_views set user_id = ?, ip = ?, lat = ?, lng = ?, location = ?';

        $values = [
            $values['id'],
            $values['ip'],
            $values['lat'],
            $values['lng'],
            $values['location'],
        ];

        $this->insert($sql, $values);
    }

    public function totalUserViews(string $status = '', int $id = null)
    {
        $id = $id == null ? $this->id : $id;

        $views = $this->fetchTotal('skilled_views')
                      ->where('user_id', $id);

        if ($status !== '') {
            $views->orWhere('status', $status);
        }

        $this->logger->info("retrieved total $status views");

        return (int) $views->execute();
    }

    public function totalUserViewsByTime(string $startDate, string $endDate, string $status = ''): int
    {
        $views = $this->fetchTotal('skilled_views')
                    ->where('created_at', '>=', $startDate)
                    ->andWhere('created_at', '<=', $endDate)
                    ->andWhere('user_id', '<=', $this->id);

        if ($status !== '') {
            $views->andWhere('status', $status);
        }

        return (int) $views->execute();
    }
}
