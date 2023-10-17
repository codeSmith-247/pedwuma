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
        u.id AS id,
        u.fullname AS name,
        u.media AS image,
        c.message AS message,
        max_time.last_time AS last_time
    FROM
        users u
    JOIN
        chats c ON (u.id = c.sender_id OR u.id = c.recipient_id)
    JOIN
        (
            SELECT
                CASE
                    WHEN sender_id = ? THEN recipient_id
                    ELSE sender_id
                END AS user_id,
                MAX(updated_at) AS last_time
            FROM
                chats
            WHERE
                sender_id = ? OR recipient_id = ?
            GROUP BY
                user_id
        ) AS max_time ON (u.id = max_time.user_id)
    WHERE
        (c.sender_id = ? OR c.recipient_id = ?) 
        AND c.updated_at = max_time.last_time
    ORDER BY
        max_time.last_time DESC;
            ';

        $recipients = $this->query($sql, [$this->id, $this->id, $this->id, $this->id, $this->id]);

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
                    type,
                    CASE 
                        WHEN sender_id = ? THEN 'sender'
                        ELSE 'recipient'
                    END AS who,
                    updated_at,
                    created_at,
                    status
                FROM chats
                WHERE ((sender_id = ? and recipient_id = ?) or (sender_id = ? and recipient_id = ?)) and type != 'init'
                ORDER BY updated_at;
            ";

        $values = [
            $this->id,
            $this->id,
            $id,
            $id,
            $this->id,
        ];

        return $this->query($sql, $values);
    }

    public function new($values)
    {
        $sql = 'insert into chats set sender_id = ?, recipient_id = ?, type = ?, message = ?';

        $values = [
            $this->id,
            $values['recipient'],
            $values['type'],
            $values['message'],
        ];

        return $this->insert($sql, $values);
    }
}
