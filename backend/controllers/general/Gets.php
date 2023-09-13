<?php

namespace Controller\General;

use Controller\Controller;
use Model\Job\Job;
use Model\Proposal\Proposal;
use Model\Review\Review;
use Model\Skill\Skill;
use Model\User\User;

class Gets extends Controller
{
    public function totals()
    {
        $job = new Job();
        $user = new User();
        $review = new Review();

        return [
            'jobs' => $job->totalJobs(),
            'completed_jobs' => $job->totalJobs('completed'),
            'ongoing_jobs' => $job->totalJobs('ongoing'),
            'reviews' => $review->totalReviews(),
            'employers' => $user->totalEmployers(),
        ];
    }

    public function skills()
    {
        $skill = new Skill();

        return $skill->skills();
    }

    public function jobs()
    {
        $job = new Job();

        [$empty, $filter] = $this->clean($_REQUEST['filter']);
        [$empty, $skill] = $this->clean($_REQUEST['skill'] ?? '');

        $search = $this->searchEngine($filter);

        $search['skill'] = $skill;

        $result = $job->filterJobs(...$search);

        $index = 0;
        foreach ($result as $singleJob) {
            $result[$index]['skills'] = $job->jobSkills($singleJob['id']);
            ++$index;
        }

        return $result;
    }

    public function job()
    {
        $job = new Job();

        [$empty, $id] = $this->clean($_REQUEST['id'] ?? '');

        if ($empty) {
            return [
                'status' => 'error',
                'title' => 'Oops',
                'message' => 'No job identification provided',
            ];
        }
        $result = $job->job($id);
        $result['skills'] = $job->jobSkills((int) $id);
        $result['id'] = $this->encode($id);
        $result['docs_endpoint'] = $this->docs_endpoint;

        return $result;
    }

    public function jobSkills()
    {
        $job = new Job();

        [$empty, $job_id] = $this->clean($_REQUEST['id']);

        return $job->jobSkills((int) $job_id);
    }

    public function searchJobs()
    {
        $job = new Job();

        [$empty, $value] = $this->clean($_REQUEST['value']);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $job->searchJobs($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function searchSkill()
    {
        $skill = new Skill();

        [$empty, $value] = $this->clean($_REQUEST['value']);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $skill->searchSkills($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function reviews()
    {
        $review = new Review();

        return $review->positiveReviews();
    }

    public function roles()
    {
        $user = new User();

        return $user->roles();
    }

    public function plans()
    {
        $user = new User();

        $plans = $user->plans();

        $pointer = 0;
        foreach ($plans as $plan) {
            $plans[$pointer]['features'] = $user->plan_features($plan['id']);
            ++$pointer;
        }

        return $plans;
    }

    public function userInfo()
    {
        $user = new User();

        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $data = $user->user($user_id);

        $data['password'] = '';
        $data['id'] = '';

        return [
            'status' => 'success',
            'title' => 'User Information',
            'message' => 'Information retrieved successfully',
            'data' => $data,
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function proposal()
    {
        $this->startSession();

        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $proposal = new Proposal(id: $user_id);

        [$empty, $id] = $this->clean($_REQUEST['id']);

        $result = $proposal->proposal($id);

        $result['docs_endpoint'] = $this->docs_endpoint;
        $result['image_endpoint'] = $this->image_endpoint;
        $result['video_endpoint'] = $this->video_endpoint;

        return $result;
    }

    public function searchProposals()
    {
        [$empty, $value] = $this->clean($_REQUEST['value']);

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $proposal = new Proposal(id: $user_id);

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $proposal->searchProposals($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function token()
    {
        return $this->generateToken(['id' => $this->encode(1)]);
    }

    public function mail()
    {
        return $this->sendEmail();
    }
}
