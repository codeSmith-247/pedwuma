<?php

namespace Controller\General;

use Controller\Controller;
use Middleware\Validator;
use Model\User\User;
use Model\Job\Appointment;

class Posts extends Controller
{
    public function createUser()
    {
        $user = new User();
        $validator = new Validator();

        [$empties, $values] = $this->clean_assoc([
            'name' => $_POST['name'] ?? '',
            'email' => $_POST['email'] ?? '',
            'number' => $_POST['number'] ?? '',
            'password' => $_POST['password'] ?? '',
            'repeat-password' => $_POST['repeat-password'] ?? '',
            'role' => $_POST['role'] ?? '',
            'location' => $_POST['address'] ?? '',
            'lat' => $_POST['lat'] ?? '',
            'lng' => $_POST['lng'] ?? '',
            'agree' => $_POST['agree'] ?? '',
        ]);

        if ($user->userExists($values['email'], $values['number'])) {
            return [
                'status' => 'error',
                'title' => 'Account Exists',
                'message' => 'Seems this account already exists, please login to use this account',
            ];
        }

        if ($values['password'] !== $values['repeat-password']) {
            return [
                'status' => 'error',
                'title' => 'Password Mismatch',
                'message' => 'Please check that both passwords are identical and try again',
            ];
        }

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please check your inputs ( '.implode(', ', $empties).') , and try again.',
            ];
        }

        $values['avatar'] = $_FILES['avatar']['tmp_name'] ?? 'default.jpg';


        [$empties, $values] = $validator->validate($values);

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Invalid Inputs',
                'message' => 'Please check your inputs and try again.',
                'data' => $empties,
                'values' => $values,
            ];
        }

        if (isset($_POST['plan'])) {
            [$empty, $plan] = $this->clean($_POST['plan']);

            if ($empty) {
                return [
                    'status' => 'error',
                    'title' => 'No Plan Selected',
                    'message' => 'Please select a plan and try again',
                ];
            }

            $values['plan'] = $plan;
        }

        if ($values['role'] !== "$user->skilled_role_id") {
            $values['plan'] = 0;
        }

        if (isset($values['plan'])) { // if the user is not a Service Provider or the user is a Service Provider and the plan is selected
            $image_upload = $this->uploadFile('avatar', uniqid('avatar_'.time()), 'image');

            if ($values['plan'] <= 1) {
                $values['rank'] = 1;
            } elseif ($values['plan'] <= 2) {
                $values['rank'] = 2;
            } else {
                $values['rank'] = 3;
            }

            if (!is_array($image_upload)) {
                $values['avatar'] = 'default.jpg';
            } else {
                $values['avatar'] = $image_upload[0];
            }

            if ($user->new($values)) {
                return [
                    'status' => 'success',
                    'title' => 'Account Created Successfully',
                    'message' => 'Please check your email for a confirmatory code',
                ];
            } else {
                return [
                    'status' => 'error',
                    'title' => 'Account Exists',
                    'message' => 'Seems this account already exists, please login to use this account',
                ];
            }
        }

        return [
            'status' => 'notSubmited',
            'title' => 'Valid Inputs',
        ];
    }

    public function sendVerificationCode($id = null, $email = null)
    {
        $this->startSession();

        if ($id === null) {
            $id = $this->decode($_SESSION['pedwuma_test']);
        }
        if ($email === null) {
            $email = $_POST['email'];
        }

        [$empty, $id] = $this->clean($id);
        [$empty2, $email] = $this->clean($email);

        if ($empty || $empty2) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please provide the verification inputs and try again',
            ];
        }

        $user = new User();

        $code = uniqid('@verify@my@pedwuma@account@');

        $verificationLink = $this->frontend_endpoint.'/verify/'.$this->encode($code);

        if ($user->user($id)['status'] !== 'unverified') {
            return [
                'status' => 'error',
                'title' => 'Account Already Verified',
                'message' => 'This account has already been verified! please login to use your account.',
            ];
        }

        $user->verificationCode($id, $code);

        if ($this->sendEmail(
            $email,
            'Email Verification',
            'Congratulations! welcome to pedwuma, please click the button bellow to verify your accout, if you did not create an account with us please ignore this email.',
            $verificationLink,
            'Verify Account'
        )) {
            return [
                'status' => 'success',
                'title' => 'Verification Link Sent',
                'message' => 'Please check your email for your verification link',
            ];
        } else {
            return [
                'status' => 'error',
                'title' => 'System Busy',
                'message' => 'System is unable to verify your account at the moment, please try again later',
            ];
        }
    }

    public function verifyEmail($code = null)
    {
        if ($code === null) {
            $code = $_POST['code'];
        }

        if (empty($code)) {
            return [
                'status' => 'error',
                'title' => 'Invalid Code',
                'message' => 'please use the code provided to you in the verification email',
            ];
        }

        $user = new User();

        $code = $this->decode($code);
        [$verified, $user_id] = $user->verifyCode($code);

        if ($verified) {
            return [
                'status' => 'success',
                'title' => 'Account Verified',
                'message' => 'Your account has been verified successfully!',
                'user_status' => $user->user($user_id)['status'],
            ];
        }

        if ($user_id !== null and $user->user($user_id)['status'] !== 'unverified') {
            return [
                'status' => 'error',
                'title' => 'Account Already Verified',
                'message' => 'This account has already been verified! please login to use your account.',
            ];
        }

        return [
            'status' => 'warning',
            'title' => 'Unable To Verify',
            'message' => 'Please click the verify button to verify your account or contact Pedwuma for further assistance.',
            'user_status' => 'unverified',
        ];
    }

    public function login()
    {
        $user = new User();

        $values = [
            'email' => $_POST['email'] ?? '',
            'password' => $_POST['password'] ?? '',
        ];

        [$empties, $values] = $this->clean_assoc($values);

        if (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please fill in all inputs and try again',
            ];
        }

        $user = $user->user($values['email']);

        if (count($user) <= 0 or !$this->verifyPassword($values['password'], $user['password'])) {
            return [
                'status' => 'error',
                'title' => 'Invalid Inputs',
                'message' => 'Please check your inputs and try again.',
            ];
        }

        return [
            'status' => 'success',
            'title' => 'Login Successfull',
            'message' => '',
            'token' => $this->generateToken([
                'id' => $this->encode($user['id']),
            ]),
            'user_status' => $user['status'],
            'role' => $user['role_id'],
        ];
    }

    public function confirmPayment()
    {
        $user = new User();
        [$empty, $reference] = $this->clean($_POST['reference'] ?? '');
        [$empty, $name] = $this->clean($_POST['name'] ?? '');
        [$empty, $email] = $this->clean($_POST['email'] ?? '');

        $error = [
            'status' => 'error',
            'title' => 'Payment Confirmation',
            'message' => 'System is unable to confirm payment, please contact pedwuma for further assistance if payment was made.',
            'data' => [$reference, $empty],
        ];

        $success = [
            'status' => 'success',
            'title' => 'Payment Successfull',
            'message' => 'Payment made is confirmed, thank you!',
        ];

        if ($reference === '' or $empty) {
            return $error;
        }

        if ($user->confirmPayment($reference, $name, $email)) {
            return $success;
        }

        if ($this->registerPayment($reference, $name, $email)) {
            return $success;
        }

        return $error;
    }

    public function registerPayment($reference, $name, $email)
    {
        $secretKey = 'sk_test_ee4258abd0e5f27ceee1f020d765e1d4b77bf31c';

        // Initialize cURL session
        $ch = curl_init('https://api.paystack.co/transaction/verify/'.$reference);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer '.$secretKey,
            'Content-Type: application/json',
        ]);

        // Execute cURL session
        $response = curl_exec($ch);

        // Close cURL session
        curl_close($ch);

        // Decode the JSON response
        $responseData = json_decode($response, true);

        // Check if the request was successful
        if ($responseData['status']) {
            $status = $responseData['data']['status'];
            if ($status === 'success') {
                $user = new User();
                $user->registerPayment($reference, $name, $email);

                return true;
            }
        }

        return false;
    }

    public function createAppointment()
    {
        [$empties, $values] = $this->clean_assoc($_POST);

        if(count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Empty Inputs',
                'message' => 'Please fill in all inputs and try again ' . implode(', ', $empties), 
            ];
        }

        $start = "{$values['start_month']} {$values['start_day']} {$values['start_time']} {$values['start_am']}";

        $end = "{$values['end_month']} {$values['end_day']} {$values['end_time']} {$values['end_am']}";

        $start = date_create_from_format('F jS g:i a', $start);
        $end   = date_create_from_format('F jS g:i a', $end);

        $now = new \DateTime();


        if($start >= $end) {
            return [
                'status' => 'error',
                'title'  => 'Invalid Dates',
                'message'=> 'Make sure your end date is after your start date and try again'
            ];
        }

        if($start < $now ) {
            return [
                'status' => 'error',
                'title'  => 'Invalid Dates',
                'message' => 'Make sure your appointment date is not in the past and try again',
                'now' => $now,
                'start' => $start,
            ];
        }

        $values['start'] = $start->format('Y-m-d H:i:s');
        $values['end']   = $end->format('Y-m-d H:i:s');

        $user_id = $this->decode($_SESSION['pedwuma_test']);
        $appointment = new Appointment($user_id);

        $appointment->new($values);

        return [
            'status' => 'success',
            'title'  => 'Appointment Booked Successfully',
            'message' => ""
        ];

        // $this->error($start, $end);
    }

    public function reminder()
    {

        $appointment = new Appointment();

        $appointments = $appointment->pending();


        foreach($appointments as $appoint ) {
            $endTimestamp = strtotime($appoint['start']); 

            $currentTimestamp = time();

            $timeDifference = $endTimestamp - $currentTimestamp;

            $thirtyMinutesInSeconds = 30 * 60; // 30 minutes
            $oneDayInSeconds = 24 * 60 * 60;    // 1 day

            if ($timeDifference <= $thirtyMinutesInSeconds && ($appoint['status'] == 'one day left' || $appoint['status'] == 'active') ) {
                $appointment->make($appoint['id'], "reminder sent");
                $this->sendEmail(
                    $appoint['recipient_email'],
                    'Upcomming Appointment In Less Than 30 Minutes',
                    "
                     <div>A humble reminder about your upcoming appointment, which is scheduled as follows:</div>
                    
                     <ul>
                        <li>Start Date: {$appoint['start_date']}</li>
                        <li>End Date: {$appoint['end_date']}</li>
                        <li>Title: {$appoint['title']}</li>
                     </ul>

                     <div>{$appoint['description']}</div>
                    ",
                    "https://pedwuma.com",
                    'Pedwuma'
                );
                $this->sendEmail(
                    $appoint['sender_email'],
                    'Upcomming Appointment In Less Than 30 Minutes',
                    "
                     <div>A humble reminder about your upcoming appointment, which is scheduled as follows:</div>
                    
                     <ul>
                        <li>Start Date: {$appoint['start_date']}</li>
                        <li>End Date: {$appoint['end_date']}</li>
                        <li>Title: {$appoint['title']}</li>
                     </ul>

                     <div>{$appoint['description']}</div>
                    ",
                    "https://pedwuma.com",
                    'Pedwuma'
                );
            } elseif ($timeDifference <= $oneDayInSeconds && $appoint['status'] == 'active') {
                $appointment->make($appoint['id'], "one day left");
                $this->sendEmail(
                    $appoint['recipient_email'],
                    'Upcomming Appointment In Less Than A Day',
                    "
                     <div>A humble reminder about your upcoming appointment, which is scheduled as follows:</div>
                    
                     <ul>
                        <li>Start Date: {$appoint['start_date']}</li>
                        <li>End Date: {$appoint['end_date']}</li>
                        <li>Title: {$appoint['title']}</li>
                     </ul>

                     <div>{$appoint['description']}</div>
                    ",
                    "https://pedwuma.com",
                    'Pedwuma'
                );
                $this->sendEmail(
                    $appoint['sender_email'],
                    'Upcomming Appointment In Less Than A Day',
                    "
                     <div>A humble reminder about your upcoming appointment, which is scheduled as follows:</div>
                    
                     <ul>
                        <li>Start Date: {$appoint['start_date']}</li>
                        <li>End Date: {$appoint['end_date']}</li>
                        <li>Title: {$appoint['title']}</li>
                     </ul>

                     <div>{$appoint['description']}</div>
                    ",
                    "https://pedwuma.com",
                    'Pedwuma'
                );
            }


        }

        return $appointments;
    }
}
