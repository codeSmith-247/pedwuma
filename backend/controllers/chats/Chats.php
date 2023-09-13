<?php 

namespace Controller\Chat;

use Controller\Controller;

class Chats extends Controller
{
    public function getRecipient()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $chat = new Chat($user_id);


        return $chat->recipients();
    }
}