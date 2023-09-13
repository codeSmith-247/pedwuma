<?php

$router->any('/', ['Controller\General\Gets', 'totals']);
$router->any('/totals', ['Controller\General\Gets', 'totals']);
$router->any('/skills', ['Controller\General\Gets', 'skills']);
$router->any('/jobs', ['Controller\General\Gets', 'jobs']);
$router->any('/jobs/search', ['Controller\General\Gets', 'searchJobs']);
$router->any('/skills/search', ['Controller\General\Gets', 'searchSkill']);
$router->any('/job', ['Controller\General\Gets', 'job']);
$router->any('/jobSkills', ['Controller\General\Gets', 'jobSkills']);
$router->any('/reviews', ['Controller\General\Gets', 'reviews']);
$router->any('/roles', ['Controller\General\Gets', 'roles']);
$router->any('/plans', ['Controller\General\Gets', 'plans']);
$router->any('/token', ['Controller\General\Gets', 'token']);
$router->any('/mail', ['Controller\General\Gets', 'mail']);
$router->any('/view/skilled', ['Controller\Skilled\Gets', 'createView']);

$router->group(['before' => 'authenticate'], function () use ($router) {
    $router->any('/info', ['Controller\General\Gets', 'userInfo']);
    $router->post('/verifyAccount', ['Controller\General\Posts', 'verifyEmail']);
    $router->post('/sendEmailVerification', ['Controller\General\Posts', 'sendVerificationCode']);
    $router->post('/proposal', ['Controller\General\Gets', 'proposal']);
    $router->post('/proposals/search', ['Controller\General\Gets', 'searchProposals']);
    $router->post('/chats/recipients', ['Controller\Chat\Chats', 'getRecipient']);
    $router->post('/chats/send', ['Controller\Chat\Chats', 'sendChat']);
    $router->post('/chats', ['Controller\Chat\Chats', 'getChats']);

    $router->group(['before' => 'employer'], function () use ($router) {
        $router->any('/employer/totals', ['Controller\Employer\Gets', 'totals']);
        $router->any('/employer/proposals', ['Controller\Employer\Gets', 'proposals']);
        $router->any('/employer/jobs', ['Controller\Employer\Gets', 'jobs']);
        $router->any('/employer/job', ['Controller\Employer\Gets', 'job']);
        $router->any('/employer/jobs/search', ['Controller\Employer\Gets', 'searchJobs']);
        $router->post('/createJob', ['Controller\Employer\Posts', 'createJob']);
        $router->post('/updateJob', ['Controller\Employer\Posts', 'updateJob']);
        $router->post('/updateEmployer', ['Controller\Employer\Posts', 'updateEmployer']);
        $router->post('/setProposal', ['Controller\Employer\Posts', 'setProposal']);
    });

    $router->group(['before' => 'skilled'], function () use ($router) {
        $router->any('/skilled/totals', ['Controller\Skilled\Gets', 'totals']);
        // $router->any('/skilled/proposals', ['Controller\Employer\Gets', 'proposals']);
        $router->any('/skilled/jobs', ['Controller\Skilled\Gets', 'jobs']);
        // $router->any('/skilled/job', ['Controller\Employer\Gets', 'job']);
        $router->any('/skilled/jobs/search', ['Controller\Skilled\Gets', 'searchJobs']);

        $router->any('/createProposal', ['Controller\Skilled\Posts', 'createProposal']);
        // $router->post('/createProposal', ['Controller\Employer\Posts', 'createProposal']);
        // $router->post('/updateProposal', ['Controller\Employer\Posts', 'updateProposal']);
        // $router->post('/updateSkilled', ['Controller\Employer\Posts', 'updateSkilled']);
    });
});

$router->post('/createUser', ['Controller\General\Posts', 'createUser']);
$router->post('/login', ['Controller\General\Posts', 'login']);
$router->post('/confirmPayment', ['Controller\General\Posts', 'confirmPayment']);
