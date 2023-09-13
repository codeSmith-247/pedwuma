<?php

namespace Model\Chat;

use Model\Model;

class Chat extends Model
{
    public $id;

    public function __construct($user_id)
    {
            parent::__construct();
            $this->id = $id;
    }

    public function recipients()
    {
        $sql = "SELECT 
                    r.id AS id,
                    r.fullname AS name,
                    c.message AS message,
                    MAX(c.updated_at) AS last_time
                FROM users u
                JOIN chats c ON u.id = c.sender_id
                JOIN users r ON r.id = c.recipient_id
                WHERE u.id = ?
                GROUP BY r.id, r.fullname, u.id, u.fullname
                ORDER BY last_time DESC; 
            ";

        $recipients = $this->query($sql, [$this->id]);

        return $recipients;
    }
}