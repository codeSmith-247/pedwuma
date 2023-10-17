<?php

namespace Model\Skill;

use Model\Model;

class Skill extends Model
{
    public function skills()
    {
        $this->logger->info("retrived skills from the database, page: ", [
            'page' => $this->clean($_GET['page'] ?? 1)[1], 
        ]);

        return $this->fetch("skills")
                    ->subFetch('rank', 'select count(*) from jobs_to_skills where jobs_to_skills.job_id = skills.id')
                    ->desc('rank')->paginate(20)->execute();
        
        
    }

    public function skill($id)
    {
        return $this->fetch("skills")->where("id", $id)->execute()[0] ?? [];
    }

    public function skilledPeople()
    {
        return $this->fetch("users")
                    ->where('role_id', 2)
                    ->paginate()->execute();
    }

    public function searchSkills(string $search): array
    {
        $skills = $this->fetch('skills')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"]
                     ], true);

        return $skills->paginate()->execute();
    }

    public function searchSkilled(string $search): array
    {
        $skills = $this->fetch('users')
                     ->groupWhere([
                        ['where', 'fullname', 'like', "%$search%"],
                        ['or', 'email', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                        ['or', 'number', 'like', "%$search%"],
                     ], true)
                     ->andWhere('role_id', 2);

        return $skills->paginate()->execute();
    }

    public function filterSkilledPeople(string $target, string $operator, string $value, string $search = '', string $skill = ''): array
    {
        $jobs = $this->fetch('users')
                     ->getDistance()
                     ->groupWhere([
                        ['where', 'fullname', 'like', "%$search%"],
                        ['or', 'email', 'like', "%$search%"],
                        ['or', 'location', 'like', "%$search%"],
                        ['or', 'number', 'like', "%$search%"],
                     ], true)
                     ->rawCondition('and id in (select skilled_id from users_to_skills where skill_id in (select id from skills where title like ?))', ["%$skill%"]);

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

    public function userSkills(int $id, string $status = ''): array
    {
        $jobs = $this->fetch('users_to_skills')
                     ->subFetch('skill', 'select title from skills where skills.id = users_to_skills.skill_id')
                     ->where('skilled_id', $id);

        if ($status !== '') {
            $jobs->andWhere('status', $status);
        }

        return $jobs->execute();
    }
}