<?php

namespace Model\Job;

use Model\Model;

class Appointment extends Model
{
    private $user_type;
    private $id;

    public function __construct($id = null, $user_type = null)
    {
        parent::__construct();

        $this->user_type = $user_type;
        $this->id = $id;
    }

    public function new($values)
    {
        // $this->error('i Got here');
        $sql = "insert into appointments set sender_id = ? , recipient_id = ?, title = ?, `desc` = ?, start = ? , end = ? ";

        $values = [
            $this->id,
            $values['id'],
            $values['title'],
            $values['description'],
            $values['start'],
            $values['end'],
        ];

        $this->insert($sql, $values);
    }

    public function appointments(string $target, string $operator, string $value, string $search = '')
    {
        $sql = "";
        $jobs = $this->fetch('appointments')
                    ->subFetch('recipient_image', '( select media from users where id = recipient_id )')
                    ->subFetch('sender_image', '( select media from users where id = sender_id )')
                    ->subFetch('recipient_name', '( select fullname from users where id = recipient_id )')
                    ->subFetch('sender_name', '( select fullname from users where id = sender_id )')
                    ->rawCondition(" where ( sender_id = ? ", [$this->id])
                    ->rawCondition(" or recipient_id = ? ) ", [$this->id]);
        

        if ($operator !== 'order') {
            $jobs = $jobs->andWhere($target, $operator, $value);
        }

        if ($value === 'asc') {
            $jobs->asc($target);
        }
        if ($value === 'desc') {
            $jobs->desc($target);
        }

        return $jobs->paginate()->execute();
    }

    public function appointment($id)
    {
        return $this->fetch('appointments')
                    ->where('id', $id)
                    // ->andWhere('sender_id', $this->id)
                    ->execute()[0] ?? [];
    }

    public function pending()
    {
        return $this->query(" select *, (select email from users where users.id = sender_id) as sender_email, (select email from users where users.id = recipient_id) as recipient_email,  DATE_FORMAT(start, '%W, %M %e, %Y %l:%i %p') as start_date, DATE_FORMAT(end, '%W, %M %e, %Y %l:%i %p') as end_date from appointments where start > now() ");
    }

    public function make($id, $value)
    {
        $this->insert(" update appointments set status = ? where id = ? ", [$value, $id]);
    }

}