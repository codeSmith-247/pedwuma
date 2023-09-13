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
                    ->desc('rank')->paginate()->execute();
        
        
    }

    public function searchSkills(string $search): array
    {
        $skills = $this->fetch('skills')
                     ->groupWhere([
                        ['where', 'title', 'like', "%$search%"]
                     ], true);

        return $skills->paginate()->execute();
    }
}