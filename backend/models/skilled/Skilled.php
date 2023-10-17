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

    public function createPortfolio($values)
    {
        $sql = " insert into portfolio set title = ? , description = ? , media = ? , budget = ? , duration = ? , skilled_id = ?  ";

        $this->insert($sql, [
            $values['title'],
            $values['description'],
            $values['media'],
            $values['budget'],
            $values['duration'] . ' ' . $values['duration_unit'],
            $this->id,
        ]);
    }

    public function updatePortfolio($values)
    {
        //adds media to the update query if an image is uploaded
        $if_image = isset($values['media']) ? " media = ? , " : "";

        $sql = " update portfolio set $if_image title = ? , description = ? , budget = ? , duration = ? where id = ? and skilled_id = ?  ";

        //sets image value if an image is uploaded
        $image_value = [];

        if(isset($values['media']))
            array_push($image_value, $values['media']);


        $values = [
            ...$image_value,
            $values['title'],
            $values['description'],
            $values['budget'],
            $values['duration'] . ' ' . $values['duration_unit'],
            $values['id'],
            $this->id,
        ];
            
        $this->insert($sql, $values);
    }

    public function deletePortfolio($id)
    {
        $sql = " delete from portfolio where id = ? and skilled_id = ? ";

        $values = [
            $id,
            $this->id
        ];

        $this->query($sql, $values, false);
    }

    public function portfolios()
    {
        $portfolios = $this->fetch('portfolio')
                           ->where('skilled_id', $this->id)
                           ->paginate()
                           ->execute();

        return $portfolios;
    }

    public function portfolio($id)
    {
        $portfolios = $this->fetch('portfolio')
                           ->where('skilled_id', $this->id)
                           ->andWhere('id', $id)
                           ->execute();

        return $portfolios[0] ?? [];
    }

    public function searchPortfolios(string $search): array
    {
        $portfolios = $this->fetch('portfolio')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'budget', 'like', "%$search%"],
                        ['or', 'duration', 'like', "%$search%"],
                     ], true)
                     ->andWhere('skilled_id', $this->id);

        return $portfolios->paginate()->execute();
    }

    public function reviews($id)
    {
        $reviews = $this->fetch('employer_reviews')
                        ->subFetch('image', '( select media from users where id = employer_id )')
                        ->subFetch('name', '( select fullname from users where id = employer_id )')
                        ->where('skilled_id', $id)
                        ->desc('created_at')
                        ->paginate()->execute();

        return $reviews ?? [];
    }

    public function skilledPortfolios($id)
    {
        $portfolios = $this->fetch('portfolio')
                           ->where('skilled_id', $id)
                           ->desc('created_at')
                           ->paginate()
                           ->execute();

        return $portfolios ?? [];
    }
}
