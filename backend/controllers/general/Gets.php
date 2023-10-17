<?php

namespace Controller\General;

use Controller\Controller;
use Model\Job\Job;
use Model\Job\Appointment;
use Model\Proposal\Proposal;
use Model\Review\Review;
use Model\Skill\Skill;
use Model\User\User;
use Middleware\Validator;

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

    public function skilledPeople()
    {
        $skillObj = new Skill();

        [$empty, $filter] = $this->clean($_REQUEST['filter']);
        [$empty, $skill] = $this->clean($_REQUEST['skill'] ?? '');

        $search = $this->searchEngine($filter);

        $search['skill'] = $skill;

        $result = $skillObj->filterSkilledPeople(...$search);

        $index = 0;
        foreach ($result as $singlePerson) {
            $result[$index]['skills'] = $skillObj->userSkills($singlePerson['id']);
            ++$index;
        }

        return $result;
    }

    public function skilledPerson()
    {
        $user = new User();

        [$empty, $id] = $this->clean($_REQUEST['id'] ?? '');

        $error = [
            'status' => 'error',
            'title'  => 'Opps',
            'message' => 'System is currently busy, please try again later',
        ];

        if($empty) {
            return $error;
        }

        $result = $user->user($id);

        if($result['role_id'] == 2) {
            $skill = new Skill();

            $result['skills'] = $skill->userSkills($result['id']);
            $result['image_endpoint'] = $this->image_endpoint;
            // $result['image_endpoint'] = $this->image_endpoint;

            return $result;
        }

        return $error;
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

        if($empty) return [];

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

        if($empty) return [];

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $skill->searchSkills($value),
            'image_endpoint' => $this->image_endpoint,
        ];
    }

    public function searchSkilled()
    {
        $skill = new Skill();

        [$empty, $value] = $this->clean($_REQUEST['value']);

        if($empty) return [];

        return [
            'status' => 'success',
            'title' => 'Jobs Retrieved Successfully',
            'message' => '',
            'data' => $skill->searchSkilled($value),
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

        $data['skills'] = $user->userSkills($user_id);

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
        [$empty, $value] = $this->clean($_REQUEST['value'] ?? '');

        if($empty || str_replace(' ', '', $value) == '') return [];

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

    public function sendMessage()
    {
        $values = [
            "email" => $_POST["email"] ?? '',
            "message" => $_POST["message"] ?? '',
            "number" => $_POST["number"] ?? '',
        ];

        [$empties, $values] = $this->clean_assoc($values);

        if(count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please provide an email and message and try again',
                // 'empties' => $empties
            ];
        }

        $validator = new Validator();

        [$is_empty, $email] = $validator->validateEmail($values["email"]);

        if($is_empty !== '') {
            return [
                'status'  => 'warning',
                'title'   => 'Invalid Email',
                'message' => 'Please use a valid email and try again'
            ];
        }

        if ($this->sendEmail(
            "adedavid.tech@gmail.com",
            'Attempted Contact from ' . $email . ', '. $values['number'],
            'MESSAGE: ' . $values['message'],
        )) {
            return [
                'status' => 'success',
                'title' => 'Message Sent Successfull',
                'message' => 'Thanks for reaching out, we would review your message and get back to you soon.',
            ];
        } else {
            return [
                'status' => 'warning',
                'title' => 'System Busy',
                'message' => 'System is unable to send your message at the moment, please try again later',
            ];
        }
    }

    public function debug()
    {
        $value = str_replace(' ', '', $_GET['value'] ?? '');
        
        return [
            'is alpha' => ctype_alnum($value),
            'value' => $_GET['value'] ?? '',
        ];
    }

    public function appointments()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        [$empty, $type] = $this->clean($_REQUEST['type'] ?? '');

        $search = $this->searchEngine($type);
        
        $appointment = new Appointment($user_id);

        $results = $appointment->appointments(...$search);

        $index = 0;

        foreach($results as $result)
        {
            if($result['sender_id'] == $user_id) {
                $results[$index]['image'] = $result['recipient_image'];
                $results[$index]['fullname'] = $result['recipient_name'];
            }
            else {
                $results[$index]['image'] = $result['sender_image'];
                $results[$index]['fullname'] = $result['sender_name'];
            }

            $index++;
        }

        return $results;
    }

    public function appointment()
    {
        [$empty, $id] = $this->clean($_POST['id'] ?? '');
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        
        $appointment = new Appointment($user_id);

        $result =  $appointment->appointment($id);

        if(count($result) <= 0) return [];
        

        if($result['recipient_id'] == $user_id) $result['is_recipient'] = true;
        else $result['is_recipient'] = false;

        return $result;
    }
}
