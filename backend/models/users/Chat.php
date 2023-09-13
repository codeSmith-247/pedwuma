<?php

namespace Model\User;

use Model\Model;

class Chat extends Model
{
    public $id;
    public $user_type;

    public function __construct($user_id, $user_type = null)
    {
        parent::__construct();
        $this->id = $user_id;
        $this->user_type = $user_type;
    }

    public function recipients()
    {
        $sql = 'SELECT 
                    r.id AS id,
                    r.fullname AS name,
                    r.media AS image,
                    c.message AS message,
                    MAX(c.updated_at) AS last_time
                FROM users u
                JOIN chats c ON u.id = c.sender_id
                JOIN users r ON r.id = c.recipient_id
                WHERE u.id = ?
                GROUP BY r.id, r.fullname, u.id, u.fullname
                ORDER BY last_time DESC; 
            ';

        $recipients = $this->query($sql, [$this->id]);

        return $recipients;
    }

    public function initChat($id)
    {
        $sql = 'insert into chats set type = "init", message = "", sender_id = ?, recipient_id = ?';

        $values = [
            $this->id,
            $id,
        ];

        $this->insert($sql, $values);
    }

    public function chats($id)
    {
        $sql = "SELECT
                    id,
                    sender_id,
                    recipient_id,
                    message,
                    CASE 
                        WHEN sender_id = ? THEN 'sender'
                        ELSE 'recipient'
                    END AS who,
                    updated_at,
                    created_at,
                    status
                FROM chats
                WHERE sender_id = ? and recipient_id = ? and type != 'init'
                ORDER BY updated_at;
            ";

        $values = [
            $this->id,
            $this->id,
            $id,
        ];

        return $this->query($sql, $values);
    }

    public function new()
    {  
        $sql = "insert into chats set sender_id = ?, recipient_id = ?, type = ?, message = ?";

        $values = [
            $this->id,
            $values['recipient'],
            $values['type'],
            $values['message'],
        ];

        return $this->insert($sql, $values);
    }
}
