<?php

namespace Controller\Chat;

use Controller\Controller;
use Model\User\Chat;
use Model\User\User;

class Chats extends Controller
{
    public function getRecipient()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $chat = new Chat($user_id);

        return $chat->recipients();
    }

    public function getChats()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $chat = new Chat($user_id);
        $user = new User();

        [$empty, $id] = $this->clean($_POST['id'] ?? '');

        if ($id === '') {
            return [];
        }

        return [
            'chats' => $chat->chats($id),
            'info' => $user->user($id),
        ];
    }

    public function sendChats()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $chat = new Chat($user_id);

        [$empties, $values] = $this->clean_assoc($_POST);

        if(count($empties) > 0) 
            return [
                'status' => 'error',
                'title'  => 'Unable to Send Message',
                'message'=> 'System is currently unable to send your message, please try again later'
            ];

        $chat->new($values);

        return [
            'status' => 'success',
            'title' => 'Message Sent',
            'message' => 'Message sent successfully'
        ];
    }
}
