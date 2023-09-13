<?php

namespace Model\Employer;

use Model\Job\Job;
use Model\Proposal\Proposal;
use Model\User\User;

class Employer extends User
{
    public $id = null;
    public object $jobs;
    public object $proposals;

    public function __construct($id = null)
    {
        parent::__construct();

        $this->id = $id;
        $this->jobs = new Job('employer', $id);
        $this->proposals = new Proposal('employer', $id);
    }
}
