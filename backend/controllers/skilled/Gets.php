<?php

namespace Controller\Skilled;

use Controller\Controller;
use Model\Skilled\Skilled;

class Gets extends Controller
{
    public function totals()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        // Calculate the start and end dates for the current week
        $startOfWeek = date('Y-m-d', strtotime('monday this week'));
        $endOfWeek = date('Y-m-d', strtotime('sunday this week'));

        // Calculate the start and end dates for the current month
        $startOfMonth = date('Y-m-01');
        $endOfMonth = date('Y-m-t');

        return [
            'jobs' => $skilled->jobs->totalUserJobs(),
            'active_jobs' => $skilled->jobs->totalUserJobs('active'),
            'revenue' => $skilled->jobs->totalUserRevenue(),
            'revenue_this_month' => $skilled->jobs->totalUserRevenueByTime($startOfMonth, $endOfMonth),
            // 'revenue_this_week' => $skilled->jobs->totalUserRevenueByTime($startOfWeek, $endOfWeek),

            // 'proposals' => $skilled->proposals->totalProposals(),
            'accepted_propsals' => $skilled->proposals->totalProposals('accepted'),
            'views' => $skilled->totalUserViews(),
            'views_this_week' => $skilled->totalUserViewsByTime($startOfWeek, $endOfWeek),
            'views_this_month' => $skilled->totalUserViewsByTime($startOfMonth, $endOfMonth),
        ];
    }

    public function createView()
    {
        $skilled = new Skilled();

        [$empties, $values] = $this->clean($_REQUEST);

        if ($empties) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'System could not save view due to empty inputs',
            ];
        }

        $skilled->newSkilledView($values);

        return [
            'status' => 'success',
            'title' => 'View Saved',
            'message' => 'Your view of this profile has been saved',
        ];
    }

    public function jobs()
    {
        $this->startSession();

        [$empty, $type] = $this->clean($_REQUEST['type'] ?? 'recent');
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        $search = $this->searchEngine($type);

        return $skilled->jobs->filterUserJobs(...$search);
    }

    public function proposals()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        [$empty, $type] = $this->clean($_REQUEST['type'] ?? 'recent');
        $search = $this->searchEngine($type);


        return $skilled->proposals->filterProposals(...$search);
    }

    public function portfolios()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        return $skilled->portfolios();
    }

    public function portfolio()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        [$empty, $id] = $this->clean($_POST['id'] ?? '');

        if($empty) return [
            'status' => 'error',
            'title'  => 'System Busy',
            'message' => 'System is currently unable to retrive this portfolio'
        ];

        $result = $skilled->portfolio($id);

        $result['image_endpoint'] = $this->image_endpoint;
        $result['sql'] = "select portfolio.* from portfolio where skilled_id = $user_id and id = $id";

        return $result;
    }

    public function searchPortfolios()
    {
        [$empty, $value] = $this->clean($_REQUEST['value']);

        if($empty) return [];

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Skilled($user_id);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $employer->searchPortfolios($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function searchJobs()
    {
        [$empty, $value] = $this->clean($_REQUEST['value']);

        if($empty) return [];

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Skilled($user_id);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $employer->jobs->searchUserJobs($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function skilledReviews()
    {
        [$empty, $id] = $this->clean($_REQUEST['id']);

        if($empty) return [];

        $skilled = new Skilled();

        return $skilled->reviews($id);
    }

    public function skilledPortfolios()
    {
        [$empty, $id] = $this->clean($_REQUEST['id']);

        if($empty) return [];

        $skilled = new Skilled();

        return $skilled->skilledPortfolios($id);

    }

    
}
