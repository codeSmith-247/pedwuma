<?php

namespace Controller\Employer;

use Controller\Controller;
use Model\Employer\Employer;

class Gets extends Controller
{
    public function totals()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        // Calculate the start and end dates for the current week
        $startOfWeek = date('Y-m-d', strtotime('monday this week'));
        $endOfWeek = date('Y-m-d', strtotime('sunday this week'));

        // Calculate the start and end dates for the current month
        $startOfMonth = date('Y-m-01');
        $endOfMonth = date('Y-m-t');

        return [
            'jobs' => $employer->jobs->totalUserJobs(),
            'active_jobs' => $employer->jobs->totalUserJobs('active'),
            'jobs_this_week' => $employer->jobs->totalUserJobsByTime($startOfWeek, $endOfWeek),
            'jobs_this_month' => $employer->jobs->totalUserJobsByTime($startOfMonth, $endOfMonth),

            'proposals' => $employer->proposals->totalProposals(),
            'accepted_propsals' => $employer->proposals->totalProposals('accepted'),
            'proposals_this_week' => $employer->proposals->totalProposalsByTime($startOfWeek, $endOfWeek),
            'proposals_this_month' => $employer->proposals->totalProposalsByTime($startOfMonth, $endOfMonth),
        ];
    }

    public function proposals()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        return $employer->proposals->proposals();
    }

    public function jobs()
    {
        $this->startSession();

        [$empty, $type] = $this->clean($_REQUEST['type'] ?? 'recent');

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $search = $this->searchEngine($type);

        return $employer->jobs->filterUserJobs(...$search);
    }

    public function job()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        [$empty, $job_id] = $this->clean($_REQUEST['id']);

        $result = $employer->jobs->userJob((int) $job_id);
        $result['skills'] = $employer->jobs->jobSkills((int) $job_id);
        $result['docs_endpoint'] = $this->docs_endpoint;

        return $result;
    }

    public function searchJobs()
    {
        [$empty, $value] = $this->clean($_REQUEST['value']);

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $employer->jobs->searchUserJobs($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }
}
