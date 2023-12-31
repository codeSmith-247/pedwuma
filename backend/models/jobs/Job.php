<?php

namespace Model\Job;

use Model\Model;

class Job extends Model
{
    private $user_type;
    private $id;

    public function __construct($user_type = null, $id = null)
    {
        parent::__construct();

        $this->user_type = $user_type;
        $this->id = $id;
    }

    public function totalJobs($status = ''): int
    {
        if ($status === '') {
            $jobs = $this->fetchTotal('jobs')->execute();
            $this->logger->info('retrieved total jobs');

            return $jobs;
        }

        $jobs = $this->fetchTotal('jobs')
                    ->where('status', $status)
                    ->execute();

        $this->logger->info("retrieved total $status jobs");

        return (int) $jobs;
    }

    public function jobs(): array
    {
        $page = $_GET['page'] ?? 1;
        $page = htmlspecialchars($page);

        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->where('status', '!=', 'deleted')
                     ->desc('distance asc, created_at, minimum_pay')
                     ->getDistance(0, 0)->paginate()->execute();

        $this->logger->info("retrieved a list of jobs in page:$page");

        return $jobs;
    }

    public function job($id): array
    {
        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->where('id', $id)
                     ->andWhere('status', '!=', 'deleted')
                     ->getDistance()
                     ->execute();

        $this->logger->info("retrieved a job with id:$id");

        return $jobs[0] ?? [];
    }

    public function totalUserJobs(string $status = ''): int
    {
        $job = $this->fetchTotal('jobs');

        if ($this->user_type == 'employer') {
            $job->where('employer_id', $this->id);
        } else {
            $job->where('skilled_id', $this->id);
        }

        

        if ($status === '') {
            $jobs = $job->execute();
            $this->logger->info('retrieved total jobs');

            return (int) $jobs;
        }

        $jobs = $job->andWhere('status', $status)
                    // ->andWhere('status', '!=', 'deleted')
                    ->execute();

        $this->logger->info("retrieved total $status jobs");

        return (int) $jobs;
    }

    public function totalUserJobsByTime(string $startDate, string $endDate, string $status = ''): int
    {
        $jobs = $this->fetchTotal('jobs')
                    ->where('created_at', '>=', $startDate)
                    ->andWhere('created_at', '<=', $endDate);
                    // ->andWhere('status', '!=', 'deleted');

        if ($this->user_type == 'employer') {
            $jobs->andWhere('employer_id', $this->id);
        } else {
            $jobs->andWhere('skilled_id', $this->id);
        }

        if ($status !== '') {
            $jobs->andWhere('status', $status);
        }

        return (int) $jobs->execute();
    }

    public function userJobs(string $status = ''): array
    {
        $jobs = $this->fetch('jobs');

        if ($this->user_type == 'employer') {
            $jobs->where('employer_id', $this->id);
        } else {
            $jobs->where('skilled_id', $this->id);
        }

        $jobs->andWhere('status', '!=', 'deleted');
        

        if ($status !== '') {
            $jobs->andWhere('status', $status);
        }

        return $jobs->paginate()->execute();
    }

    public function userJob(int $id, string $status = ''): array
    {
        $jobs = $this->fetch('jobs');

        if ($this->user_type == 'employer') {
            $jobs->where('employer_id', $this->id);
        } else {
            $jobs->where('skilled_id', $this->id);
        }

        $jobs->andWhere('id', $id)
        ->andWhere('status', '!=', 'deleted');

        if ($status !== '') {
            $jobs->andWhere('status', $status);
        }

        return $jobs->execute()[0] ?? [];
    }

    public function jobSkills(int $id, string $status = ''): array
    {
        $jobs = $this->fetch('jobs_to_skills')
                     ->subFetch('skill', 'select title from skills where skills.id = jobs_to_skills.skill_id')
                     ->where('job_id', $id);

        if ($status !== '') {
            $jobs->andWhere('status', $status);
        }

        return $jobs->execute();
    }

    public function searchUserJobs(string $search): array
    {
        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->subFetch('proposals', 'select count(*) from proposals where proposals.job_id = jobs.id')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                     ], true)
                     ->andWhere('status', '!=', 'deleted')
                     ;

        if ($this->user_type == 'employer') {
            $jobs->andWhere('employer_id', $this->id);
        } else {
            $jobs->andWhere('skilled_id', $this->id);
        }

        return $jobs->paginate()->execute();
    }

    public function searchJobs(string $search): array
    {
        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->subFetch('proposals', 'select count(*) from proposals where proposals.job_id = jobs.id')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                     ], true)
                     ->andWhere('status', '!=', 'deleted')
                     ;

        return $jobs->paginate()->execute();
    }

    public function filterUserJobs(string $target, string $operator, string $value, string $search = ''): array
    {
        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->subFetch('proposals', 'select count(*) from proposals where proposals.job_id = jobs.id')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                     ], true)
                     ->andWhere('status', '!=', 'deleted')
                     ;

        if ($this->user_type == 'employer') {
            $jobs->andWhere('employer_id', $this->id);
        } else {
            $jobs->andWhere('skilled_id', $this->id);
        }

        if ($operator !== 'order') {
            $jobs = $jobs->andWhere($target, $operator, $value);
        }

        if ($value === 'asc') {
            $jobs->asc($target);
        }
        if ($value === 'desc') {
            $jobs->desc($target);
        }

        return $jobs->paginate()->execute();
    }

    public function getAwardableJobs($id)
    {
        $sql = 'select * from jobs where id in (select job_id from proposals where skilled_id = ?) and skilled_id = 0 and employer_id = ? and status != "deleted"';

        return $this->query($sql, [
            $id,
            $this->id,
        ]);
    }

    public function getCompletableJobs($id)
    {
        $sql = 'select * from jobs where skilled_id = ? and employer_id = ? and status="ongoing"';

        return $this->query($sql, [
            $id,
            $this->id,
        ]);
    }

    public function awardJobs($job_ids, $skilled_id)
    {
        $sql = 'update jobs set skilled_id = ?, status="ongoing" where id in (select job_id from proposals where skilled_id = ?) and skilled_id = 0 and employer_id = ? and id = ? and status="active"';

        foreach($job_ids as $job_id) {
            $this->query($sql, [
                $skilled_id,
                $skilled_id,
                $this->id,
                $job_id,
            ], false);

            $sub_sql = "update proposals set status='rejected' where job_id = ? and skilled_id != ? and employer_id = ?";
    
            $this->query($sub_sql, [$job_id, $skilled_id, $this->id], false);
        }

    }

    public function completeJobs($job_ids, $skilled_id)
    {
        $sql = 'update jobs set status="completed" where  skilled_id = ? and employer_id = ? and id = ? and status="ongoing"';

        foreach($job_ids as $job_id) {
            $this->query($sql, [
                $skilled_id,
                $this->id,
                $job_id,
            ], false);
        }

    }

    public function postReview($job_ids, $values)
    {
        $sql = 'insert into employer_reviews set employer_id = ? , skilled_id = ? , job_id = ? , rank = ? , review = ?, type="positive"';

        $this->query($sql, [
            $this->id,
            $values['id'],
            $job_ids[0],
            $values['rating'],
            $values['review'],
        ], false);

    }

    public function filterJobs(string $target, string $operator, string $value, string $search = '', string $skill = ''): array
    {
        $jobs = $this->fetch('jobs')
                     ->subFetch('image', 'select media from users where users.id = jobs.employer_id')
                     ->subFetch('name', 'select fullname from users where users.id = jobs.employer_id')
                     ->subFetch('proposals', 'select count(*) from proposals where proposals.job_id = jobs.id')
                     ->getDistance()
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"],
                        ['or', 'description', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                     ], true)
                     ->andWhere('status', '!=', 'deleted')
                     ->rawCondition('and skilled_id = 0 and id in (select job_id from jobs_to_skills where skill_id in (select id from skills where title like ?))', ["%$skill%"]);

        if ($operator !== 'order') {
            $jobs = $jobs->andWhere($target, $operator, $value);
        }

        if ($value === 'asc') {
            $jobs->asc($target);
        }
        if ($value === 'desc') {
            $jobs->desc($target);
        }

        return $jobs->paginate()->execute();
    }

    public function new(array $values, bool $forSkilled = false): void
    {
        $sql = 'insert into jobs set title = ? , description = ?, content = ?, media = ?, minimum_pay = ?, location = ? , lat = ? , lng = ?, employer_id = ?, skilled_id = ?';

        $skills = $values['skills'];
        // $job_id = $values['job_id'];

        $values = [
            $values['title'],
            $values['description'],
            $values['content'],
            $values['media'],
            $values['minimum_pay'],
            $values['address'],
            $values['lat'],
            $values['lng'],
            $values['employer_id'],
            $values['skilled_id'],
        ];

        $this->insert($sql, $values, function ($id) use ($skills, $forSkilled, $values) {            
            $this->linkSkills($id, $skills);

            if($forSkilled) {

                $sql = 'insert into proposals set title = ? , description = \'Request For Service\', media = "default.png", job_id = ?, employer_id = ?, skilled_id = ?, status="ongoing" ';

                $this->insert($sql, [$values[0], $id, $values[8], $values[9]]);
            }
        });

        $this->logger->info("created new job with title: {$values[0]}");
    }

    public function updateJob(array $values): void
    {
        $sql = 'update jobs set title = ? , description = ?, content = ?, media = ?, minimum_pay = ?, location = ? , lat = ? , lng = ? where employer_id = ? and id = ?';

        $skills = $values['skills'];
        $job_id = $values['job_id'];

        $values = [
            $values['title'],
            $values['description'],
            $values['content'],
            $values['media'],
            $values['minimum_pay'],
            $values['address'],
            $values['lat'],
            $values['lng'],
            $values['employer_id'],
            $values['job_id'],
        ];

        $this->insert($sql, $values);

        $this->linkSkills((int) $job_id, $skills);

        $this->logger->info("updated new job with id: {$values[9]}");
    }

    public function deleteJob($id)
    {
        $sql = 'update jobs set status = "deleted" where id = ?';
        $this->insert($sql, [$id]);
    }

    public function linkSkills(int $id, array $skills, bool $remove_all_skills = true): void
    {
        if ($remove_all_skills) {
            $sql = 'delete from jobs_to_skills where job_id = ?';
            $this->insert($sql, [$id]);
            $this->logger->info('removed skills from job with id: '.$id);
        }

        foreach ($skills as $skill) {
            $sql = 'insert into jobs_to_skills set job_id = ?, skill_id = ?';
            $this->insert($sql, [$id, $skill]);

            $this->logger->info("added new skill with id: $skill to job with id: $id");
        }
    }

    public function totalUserRevenue(string $status = ''): int
    {
        $revenue = $this->fetchSum('jobs', 'minimum_pay');

        if ($this->user_type == 'employer') {
            $revenue->where('employer_id', $this->id);
        } else {
            $revenue->where('skilled_id', $this->id);
        }

        if ($status === '') {
            $revenues = $revenue->execute();
            $this->logger->info('retrieved total revenue for user with id: '.$this->id);

            return (int) $revenues;
        }

        $revenues = $revenue->andWhere('status', $status)
                    ->execute();

        $this->logger->info("retrieved total $status revenues");

        return (int) $revenues;
    }

    public function totalUserRevenueByTime(string $startDate, string $endDate, string $status = ''): int
    {
        $revenue = $this->fetchSum('jobs', 'minimum_pay')
                    ->where('created_at', '>=', $startDate)
                    ->andWhere('created_at', '<=', $endDate);

        if ($this->user_type == 'employer') {
            $revenue->andWhere('employer_id', $this->id);
        } else {
            $revenue->andWhere('skilled_id', $this->id);
        }

        if ($status !== '') {
            $revenue->andWhere('status', $status);
        }

        return (int) $revenue->execute();
    }
}
