<?php

namespace Controller\Skilled;

use Controller\Controller;
use Middleware\Validator;
use Model\Skilled\Skilled;

class Posts extends Controller
{
    public function createProposal()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $skilled = new Skilled($user_id);

        [$empties, $values] = $this->clean_assoc($_POST);

        $image_upload = $this->uploadFile('document', uniqid('proposal_document_'.time()), 'document');

        if (is_array($image_upload)) {
            $values['media'] = $image_upload[0];
        } else {
            $values['media'] = 'default.png';
        }

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please check all inputs and try again: '
            ];
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
    
}