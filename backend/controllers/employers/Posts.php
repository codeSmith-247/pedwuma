<?php

namespace Controller\Employer;

use Controller\Controller;
use Model\Employer\Employer;

class Posts extends Controller
{
    public function createJob()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $values = [
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'currency' => $_POST['currency'],
            'content' => $_POST['content'],
            'address' => $_POST['address'],
            'minimum_pay' => $_POST['minimum_pay'],
            'skills' => $_POST['skills'] ?? [],
            'lat' => $_POST['lat'],
            'lng' => $_POST['lng'],
            'employer_id' => $user_id,
            'skilled_id' => '1',
        ];

        [$empties, $values] = $this->clean_assoc($values);

        $image_upload = $this->uploadFile('document', uniqid('job_document_'.time()), 'document');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = 'default.png';
        }

        if (count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please check the inputs and try again: '.implode(', ', $empties),
            ];
        }
        $values['content'] = $_POST['content'];

        if(!is_array($values['skills'])) {
            $values['skills'] = explode(',', $values['skills']);
        }

        $values['skilled_id'] = 0;

        $employer->jobs->new($values);

        return [
            'status' => 'success',
            'message' => 'Job Created Successfully',
            // 'data' => [$_FILES, $_POST],
        ];
    }

    public function deleteJob()
    {
        {
            $user_id = $this->decode($_SESSION['pedwuma_test']);
            $employer = new Employer($user_id);
    
            $values = [
                'job_id' => $_POST['id'] ?? '',
            ];
    
            [$empties, $values] = $this->clean_assoc($values);
    
            $job = $employer->jobs->userJob((int) $values['job_id']);
    
            if ($job === []) {
                return [
                    'status' => 'warning',
                    'title' => 'Unauthorized Access',
                    'message' => 'You are currently unauthorized to update this job',
                    'job_id' => $values['job_id'],
                ];
            }
    
            $employer->jobs->deleteJob($values['job_id']);
    
            return [
                'status' => 'success',
                'message' => 'Job Deleted Successfully',
                // 'data' => [$_FILES, $_POST],
            ];
        }
    }

    public function createSkilledJob()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $values = [
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'currency' => $_POST['currency'],
            'content' => $_POST['content'],
            'address' => $_POST['address'],
            'minimum_pay' => $_POST['minimum_pay'],
            'skills' => $_POST['skills'] ?? [],
            'lat' => $_POST['lat'],
            'lng' => $_POST['lng'],
            'employer_id' => $user_id,
            'skilled_id' => $_POST['skilled_id'] ?? 0,
        ];

        [$empties, $values] = $this->clean_assoc($values);

        $image_upload = $this->uploadFile('document', uniqid('job_document_'.time()), 'document');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = 'default.png';
        }

        if (count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please check the inputs and try again: '.implode(', ', str_replace('_', ' ', $empties)),
            ];
        }
        $values['content'] = $_POST['content'];

        if(!is_array($values['skills'])) {
            $values['skills'] = explode(',', $values['skills']);
        }

        $employer->jobs->new($values, true);

        return [
            'status' => 'success',
            'message' => 'Job Sent Successfully',
            // 'data' => [$_FILES, $_POST],
        ];
    }

    public function updateJob()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $values = [
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'currency' => $_POST['currency'],
            'content' => $_POST['content'],
            'address' => $_POST['address'],
            'minimum_pay' => $_POST['minimum_pay'],
            'skills' => $_POST['skills'] ?? [],
            'lat' => $_POST['lat'],
            'lng' => $_POST['lng'],
            'employer_id' => $user_id,
            'job_id' => $_POST['id'],
        ];

        [$empties, $values] = $this->clean_assoc($values);

        $job = $employer->jobs->userJob((int) $values['job_id']);

        if ($job === []) {
            return [
                'status' => 'warning',
                'title' => 'Unauthorized Access',
                'message' => 'You are currently unauthorized to update this job',
                'job_id' => $values['job_id'],
            ];
        }

        $image_upload = $this->uploadFile('document', uniqid('avatar_'.time()), 'document');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = $job['media'];
        }

        if (count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please check the inputs and try again: '.implode(', ', $empties),
            ];
        }
        $values['content'] = $_POST['content'];

        $employer->jobs->updateJob($values);

        return [
            'status' => 'success',
            'message' => 'Job Updated Successfully',
            // 'data' => [$_FILES, $_POST],
        ];
    }

    public function updateEmployer()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $user = $employer->user($user_id);

        if ($user === []) {
            return [
                'status' => 'error',
                'title' => 'System Busy',
                'message' => 'System is reviewing your account due to some suspicious activities, please try again later',
            ];
        }

        [$empties, $values] = $this->clean_assoc($_POST);

        if ($empties) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please provide all inputs and try again',
            ];
        }

        $image_upload = $this->uploadFile('avatar', uniqid('avatar_'.time()), 'image');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = $user['media'];
        }

        $values['user_id'] = $user_id;

        $employer->update($values);

        return [
            'status' => 'success',
            'title' => 'Update Successfull',
            'message' => 'Your profile has been updated successfully',
        ];
    }

    public function setProposal()
    {
        [$empties, $values] = $this->clean_assoc($_REQUEST);

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'System Error',
                'text' => 'System is unable to handle your request, please try again later or contact pedwuma if problem persists',
            ];
        }

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $response = $employer->proposals->setProposal(...$values);

        if ($response === true && $values['status'] === 'accepted') {
            $proposal = $employer->proposals->userProposal($values['id']);
            $employer->chats->initChat($proposal['skilled_id']);

            return [
                'status' => 'success',
                'title' => 'Proposal Accepted',
                'message' => 'The proposal has been accepted please procceed to the chat page to continue negotiations',
            ];
        }

        if ($response === true && $values['status'] === 'rejected') {
            return [
                'status' => 'info',
                'title' => 'Proposal Rejected',
                'message' => 'The proposal has been rejected successfully',
            ];
        }

        return $values;
    }

    public function getJobs()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        [$empty, $recipient] = $this->clean($_POST['recipient']);

        return $employer->jobs->getAwardableJobs($recipient);
    }

    public function getCompletableJobs()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        [$empty, $recipient] = $this->clean($_POST['recipient']);

        return $employer->jobs->getCompletableJobs($recipient);
    }

    public function awardJobs()
    {
        $values = explode(',', $_POST['job_ids']);

        [$empty, $skilled_id] = $this->clean($_POST['id'] ?? '');

        if (count($values) <= 0 || $empty) {
            return [
                'status' => 'error',
                'title' => 'No Jobs Selected',
                'message' => 'Please select the jobs you intend to award',
            ];
        }

        $string = '';

        if (count($values) > 1) {
            $string = 's';
        }

        $values = array_map(fn ($value) => $this->clean($value)[1], $values);

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $employer->jobs->awardJobs($values, $skilled_id);

        return [
            'status' => 'success',
            'title' => "Job$string Awarded Successfully",
            'message' => "Congratulations, please complete the job$string by clicking the 'complete job' button when this job has been completed. Thank you.",
        ];
    }

    public function completeJobs()
    {
        $values = explode(',', $_POST['job_ids']);

        [$empty, $skilled_id] = $this->clean($_POST['id'] ?? '');

        if (count($values) <= 0 || $empty) {
            return [
                'status' => 'error',
                'title' => 'No Jobs Selected',
                'message' => 'Please select the jobs you intend to complete',
            ];
        }

        $string = '';

        if (count($values) > 1) {
            $string = 's';
        }

        $values = array_map(fn ($value) => $this->clean($value)[1], $values);

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $employer->jobs->completeJobs($values, $skilled_id);

        return [
            'status' => 'success',
            'title' => "Job$string Completed Successfully",
            'message' => "Congratulations, Thank you for using pedwuma.",
        ];
    }

    public function postReview()
    {
        $values = explode(',', $_POST['job_ids']);

        [$empty, $skilled_id] = $this->clean($_POST['id'] ?? '');

        [$empties, $sub_values] = $this->clean_assoc([
            'id' => $_POST['id'] ?? '',
            'rating' => $_POST['rating'] ?? '',
            'review' => $_POST['review'] ?? '',
        ]);

        if (count($values) <= 0 || count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'No Jobs Selected',
                'message' => 'Please select the jobs you intend to complete',
            ];
        }

        $values = array_map(fn ($value) => $this->clean($value)[1], $values);

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Employer($user_id);

        $employer->jobs->postReview($values, $sub_values);

        return [
            'status' => 'success',
            'title' => "Review Posted Successfully",
            'message' => "",
        ];
    }
}
