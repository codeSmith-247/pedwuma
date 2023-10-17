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

        $result = $chat->recipients();

        if(is_null($result[0]['id'])) return [];

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

        $chats = $chat->chats($id);

        if(count($chats) <= 0) {
            $chat->initChat($id);
        }

        return [
            'chats' => $chat->chats($id),
            'info' => $user->user($id),
        ];
    }

    public function sendChat()
    {
        $user_id = $this->decode($_SESSION['pedwuma_test']);

        $chat = new Chat($user_id);

        [$empties, $values] = $this->clean_assoc($_POST);

        if ($values['type'] == 'image') {
            $image_upload = $this->uploadFile('image', uniqid('chat_'.time()), 'image');

            if (is_array($image_upload)) {
                $values['message'] = $image_upload[0];
            }
        } elseif ($values['type'] == 'file') {
            $image_upload = $this->uploadFile('file', uniqid('chat_'.time()), 'document');

            if (is_array($image_upload)) {
                $values['message'] = $image_upload[0];
            }
        } elseif (count($empties) > 0) {
            return [
                'status' => 'error',
                'title' => 'Unable to Send Message',
                'message' => 'System is currently unable to send your message, please try again later',
            ];
        }

        $chat->new($values);

        return [
            'status' => 'success',
            'title' => 'Message Sent',
            'message' => 'Message sent successfully',
            'image_endpoint' => $this->image_endpoint,
            'docs_endpoint' => $this->docs_endpoint,
        ];
    }
}
