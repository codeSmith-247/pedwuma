<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(__DIR__);
$baseDir = dirname($vendorDir);

return array(
    'Symfony\\Polyfill\\Mbstring\\' => array($vendorDir . '/symfony/polyfill-mbstring'),
    'Symfony\\Component\\VarDumper\\' => array($vendorDir . '/symfony/var-dumper'),
    'Symfony\\Component\\ErrorHandler\\' => array($vendorDir . '/symfony/error-handler'),
    'Service\\' => array($baseDir . '/services'),
    'Psr\\Log\\' => array($vendorDir . '/psr/log/src'),
    'Phroute\\Phroute\\' => array($vendorDir . '/phroute/phroute/src/Phroute'),
    'PHPMailer\\PHPMailer\\' => array($vendorDir . '/phpmailer/phpmailer/src'),
    'Monolog\\' => array($vendorDir . '/monolog/monolog/src/Monolog'),
    'Model\\User\\' => array($baseDir . '/models/users'),
    'Model\\Skilled\\' => array($baseDir . '/models/skilled'),
    'Model\\Skill\\' => array($baseDir . '/models/skills'),
    'Model\\Review\\' => array($baseDir . '/models/reviews'),
    'Model\\Proposal\\' => array($baseDir . '/models/proposals'),
    'Model\\Job\\' => array($baseDir . '/models/jobs'),
    'Model\\Employer\\' => array($baseDir . '/models/employers'),
    'Model\\' => array($baseDir . '/models'),
    'Middleware\\' => array($baseDir . '/middlewares'),
    'Firebase\\JWT\\' => array($vendorDir . '/firebase/php-jwt/src'),
    'Controller\\Skilled\\' => array($baseDir . '/controllers/skilled'),
    'Controller\\General\\' => array($baseDir . '/controllers/general'),
    'Controller\\Employer\\' => array($baseDir . '/controllers/employers'),
    'Controller\\Chat\\' => array($baseDir . '/controllers/chats'),
    'Controller\\' => array($baseDir . '/controllers'),
);