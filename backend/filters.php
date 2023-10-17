<?php

$router->filter('authenticate', function () use ($middleware) {
    try {
        $token_data = $middleware->validateToken();

        if (!$token_data) {
            return [
                'status' => 'error',
                'title' => 'Session Expired',
                'message' => "it's been a while since you logged in, please log in again to continue using your account",
                'data' => [],
            ];
        }

        $middleware->startSession();

        $_SESSION['pedwuma_test'] = $token_data->data->id;
    } catch (\Exception $e) {
        return [
            'status' => 'warning',
            'title' => 'Session Expired',
            'message' => "it's been a while since you logged in, please log in again to continue using your account",
            'data' => [],
        ];
    }
});

$router->filter('employer', function () use ($middleware, $user) {
    $middleware->startSession();

    $user_id = $middleware->decode($_SESSION['pedwuma_test']);

    $user = $user->user($user_id);

    if ($user === [] or $user['role_id'] !== 1) {
        return [
            'status' => 'error',
            'title' => 'Unauthorised Access',
            'message' => 'Only employers are allowed to use this page, sign in or sign up as an "Employer" and try again',
        ];
    }
});

$router->filter('skilled', function () use ($middleware, $user) {
    $middleware->startSession();

    $user_id = $middleware->decode($_SESSION['pedwuma_test']);

    $user = $user->user($user_id);

    if ($user === [] or $user['role_id'] !== 2) {
        return [
            'status' => 'error',
            'title' => 'Unauthorised Access',
            'message' => 'Only skilled people are allowed to use this page, sign in or sign up as a "Service Provider" and try again',
        ];
    }
});
