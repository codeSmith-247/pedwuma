<?php

$router->any('/', ['Controller\General\Gets', 'totals']);
$router->any('/totals', ['Controller\General\Gets', 'totals']);
$router->any('/skills', ['Controller\General\Gets', 'skills']);
$router->any('/skilledPeople', ['Controller\General\Gets', 'skilledPeople']);
$router->any('/skilledPerson', ['Controller\General\Gets', 'skilledPerson']);
$router->any('/jobs', ['Controller\General\Gets', 'jobs']);
$router->any('/jobs/search', ['Controller\General\Gets', 'searchJobs']);
$router->any('/skills/search', ['Controller\General\Gets', 'searchSkill']);
$router->any('/skilled/search', ['Controller\General\Gets', 'searchSkilled']);
$router->any('/job', ['Controller\General\Gets', 'job']);
$router->any('/jobSkills', ['Controller\General\Gets', 'jobSkills']);
$router->any('/reviews', ['Controller\General\Gets', 'reviews']);
$router->any('/roles', ['Controller\General\Gets', 'roles']);
$router->any('/plans', ['Controller\General\Gets', 'plans']);
$router->any('/token', ['Controller\General\Gets', 'token']);
$router->any('/mail', ['Controller\General\Gets', 'mail']);
$router->any('/sendMessage', ['Controller\General\Gets', 'sendMessage']);
$router->any('/view/skilled', ['Controller\Skilled\Gets', 'createView']);
$router->any('/skilledReviews', ['Controller\Skilled\Gets', 'skilledReviews']);
$router->any('/skilled/portfolios/id', ['Controller\Skilled\Gets', 'skilledPortfolios']);

$router->any('/debug', ['Controller\General\Gets', 'debug']);
$router->any('/reminder', ['Controller\General\Posts', 'reminder']);
$router->post('/verifyAccount', ['Controller\General\Posts', 'verifyEmail']);

$router->group(['before' => 'authenticate'], function () use ($router) {
    $router->any('/info', ['Controller\General\Gets', 'userInfo']);
    $router->post('/sendEmailVerification', ['Controller\General\Posts', 'sendVerificationCode']);
    $router->post('/proposal', ['Controller\General\Gets', 'proposal']);
    $router->post('/proposals/search', ['Controller\General\Gets', 'searchProposals']);
    $router->post('/chats/recipients', ['Controller\Chat\Chats', 'getRecipient']);
    $router->post('/chats/send', ['Controller\Chat\Chats', 'sendChat']);
    $router->post('/chats', ['Controller\Chat\Chats', 'getChats']);
    $router->post('/createAppointment', ['Controller\General\Posts', 'createAppointment']);
    $router->any('/appointments', ['Controller\General\Gets', 'appointments']);
    $router->any('/appointment', ['Controller\General\Gets', 'appointment']);
    

    $router->group(['before' => 'employer'], function () use ($router) {
        $router->any('/employer/totals', ['Controller\Employer\Gets', 'totals']);
        $router->any('/employer/proposals', ['Controller\Employer\Gets', 'proposals']);
        $router->any('/employer/jobs', ['Controller\Employer\Gets', 'jobs']);
        $router->any('/employer/job', ['Controller\Employer\Gets', 'job']);
        $router->any('/employer/jobs/search', ['Controller\Employer\Gets', 'searchJobs']);
        $router->post('/createJob', ['Controller\Employer\Posts', 'createJob']);
        $router->post('/createSkilledJob', ['Controller\Employer\Posts', 'createSkilledJob']);
        $router->post('/updateJob', ['Controller\Employer\Posts', 'updateJob']);
        $router->post('/deleteJob', ['Controller\Employer\Posts', 'deleteJob']);
        $router->post('/updateEmployer', ['Controller\Employer\Posts', 'updateEmployer']);
        $router->post('/setProposal', ['Controller\Employer\Posts', 'setProposal']);
        $router->post('/getJobs', ['Controller\Employer\Posts', 'getJobs']);
        $router->post('/getCompletableJobs', ['Controller\Employer\Posts', 'getCompletableJobs']);
        $router->post('/awardJobs', ['Controller\Employer\Posts', 'awardJobs']);
        $router->post('/completeJobs', ['Controller\Employer\Posts', 'completeJobs']);
        $router->post('/postReview', ['Controller\Employer\Posts', 'postReview']);

    });

    $router->group(['before' => 'skilled'], function () use ($router) {
        $router->any('/skilled/totals', ['Controller\Skilled\Gets', 'totals']);
        $router->any('/skilled/jobs', ['Controller\Skilled\Gets', 'jobs']);
        // $router->any('/skilled/job', ['Controller\Employer\Gets', 'job']);
        $router->any('/skilled/jobs/search', ['Controller\Skilled\Gets', 'searchJobs']);
        $router->post('/updateSkilled', ['Controller\Skilled\Posts', 'updateSkilled']);
        
        $router->any('/createProposal', ['Controller\Skilled\Posts', 'createProposal']);
        $router->any('/createPortfolio', ['Controller\Skilled\Posts', 'createPortfolio']);
        $router->any('/deletePortfolio', ['Controller\Skilled\Posts', 'deletePortfolio']);
        
        $router->any('/skilled/proposals', ['Controller\Skilled\Gets', 'proposals']);
        $router->any('/skilled/portfolios', ['Controller\Skilled\Gets', 'portfolios']);
        $router->any('/skilled/portfolio', ['Controller\Skilled\Gets', 'portfolio']);
        $router->post('/updatePortfolio', ['Controller\Skilled\Posts', 'updatePortfolio']);
        $router->post('/portfolios/search', ['Controller\Skilled\Gets', 'searchPortfolios']);

        // $router->post('/createProposal', ['Controller\Employer\Posts', 'createProposal']);
        // $router->post('/updateSkilled', ['Controller\Employer\Posts', 'updateSkilled']);
    });
});

$router->post('/createUser', ['Controller\General\Posts', 'createUser']);
$router->post('/login', ['Controller\General\Posts', 'login']);
$router->post('/confirmPayment', ['Controller\General\Posts', 'confirmPayment']);
