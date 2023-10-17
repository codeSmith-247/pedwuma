<?php

namespace Controller\Skilled;

use Controller\Controller;
use Middleware\Validator;
use Model\Skilled\Skilled;
use Model\Skill\Skill;

class Posts extends Controller
{
    public function createProposal()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        [$empties, $values] = $this->clean_assoc($_POST);

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please check all inputs and try again: '
            ];
        }

        $image_upload = $this->uploadFile('document', uniqid('proposal_document_'.time()), 'document');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = 'default.png';
        }

        $values['description'] = $_POST['description'];
        $values['id'] = $this->decode($_POST['id']);

        $job = $skilled->jobs->job($values['id']);
        $values['employer_id'] = $job['employer_id'];
        $values['skilled_id'] = $user_id;

        $proposal = $skilled->proposals->proposalExists($values['id']);

        if($proposal !== []) {
            return [
                'status' => 'warning',
                'title' => 'Proposal Exists',
                'message' => 'You have already sent a proposal for this job'
            ];
        }

        $skilled->proposals->new($values);

        return [
            'status' => 'success',
            'message' => 'Proposal Created Successfully',
            // 'data' => [$_FILES, $_POST],
        ];
    }
    
    public function createPortfolio()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        $values = [
            // 'image' => $_FILES['image']['tmp_name'] ?? '',
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'duration'    => $_POST['duration'] ?? '',
            'duration_unit' => $_POST['duration_unit'] ?? '',
            'budget'    => $_POST['budget'] ?? '',
        ];

        [$empties, $values] = $this->clean_assoc($values);

        if(count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please provide all inputs and try again'
            ];
        }

        $image_upload = $this->uploadFile('image', uniqid('portfolio_'.time()), 'image');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            return [
                'status' => 'warning',
                'title'  => 'No Portfolio Image',
                'message' => 'Please provide a portfolio image and try again.'
            ];
        }

        $skilled->createPortfolio($values);

        return [
            'status' => 'success',
            'title'  => 'Portfolio Created Successfully',
            'message' => ''
        ];
    }

    public function updatePortfolio()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        $values = [
            // 'image' => $_FILES['image']['tmp_name'] ?? '',
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'duration'    => $_POST['duration'] ?? '',
            'duration_unit' => $_POST['duration_unit'] ?? '',
            'budget'    => $_POST['budget'] ?? '',
            'id'        => $_POST['id'] ?? '',
        ];

        [$empties, $values] = $this->clean_assoc($values);

        if(count($empties) > 0) {
            return [
                'status' => 'warning',
                'title' => 'Empty Inputs',
                'message' => 'Please provide all inputs and try again'
            ];
        }

        if(isset($_FILES['image']['tmp_name'])) {
            $image_upload = $this->uploadFile('image', uniqid('portfolio_'.time()), 'image');
    
            if (is_array($image_upload)) {
                $values['media'] = $image_upload[0];
            }
        }

        $skilled->updatePortfolio($values);

        return [
            'status' => 'success',
            'title'  => 'Portfolio Updated Successfully',
            'message' => ''
        ];
    }

    public function deletePortfolio()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        [$empty, $id] = $this->clean($_POST['id']);

        if($empty) return [
            'status' => 'error',
            'title' => 'System Busy',
            'message' => 'System is currently unavailable, please try again later'
        ];

        $skilled->deletePortfolio($id);

        return [
            'status' => 'success',
            'title' => 'Portfolio Deleted Successfully',
            'message' => ''
        ];
    }

    public function updateSkilled()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $employer = new Skilled($user_id);

        $user = $employer->user($user_id);

        if ($user === []) {
            return [
                'status' => 'error',
                'title' => 'System Busy',
                'message' => 'System is reviewing your account due to some suspicious activities, please try again later',
            ];
        }

        [$empties, $values] = $this->clean_assoc($_POST);

        
        [$empty, $myskills] = $this->clean_array($_POST['skills'] ?? '');

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please provide all inputs and try again',
            ];
        }

        if ($empty) return [
            'status' => 'error',
            'title' => 'No Skills Provided',
            'message' => 'Please select some skills and try again',
        ];

        $image_upload = $this->uploadFile('avatar', uniqid('avatar_'.time()), 'image');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = $user['media'];
        }

        $values['user_id'] = $user_id;

        

        $employer->update($values, function ($id) use($employer, $user_id, $myskills) {
           
            $employer->clearUserSkills($user_id);

            $skillObj = new Skill();

            foreach($myskills as $skill) {
                $employer->linkUserToSkills($user_id, $skill);
            }
        });

        return [
            'status' => 'success',
            'title' => 'Update Successfull',
            'message' => 'Your profile has been updated successfully',
            'skills' => $myskills
        ];
    }
}