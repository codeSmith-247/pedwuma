<?php

namespace Model\Employer;

use Model\Job\Job;
use Model\Proposal\Proposal;
use Model\User\Chat;
use Model\User\User;

class Employer extends User
{
    public $id = null;
    public object $jobs;
    public object $proposals;
    public object $chats;

    public function __construct($id = null)
    {
        parent::__construct();

        $this->id = $id;
        $this->jobs = new Job('employer', $id);
        $this->proposals = new Proposal('employer', $id);
        $this->chats = new Chat($id, 'employer');
    }
}
