<?php

namespace Model\User;

use Model\Model;

class User extends Model
{
    public int $employer_role_id = 1;
    public int $skilled_role_id = 2;

    public function totalUsers(string $status, int $role_id)
    {
        if ($status === '') {
            $this->logger->info('retrieved total employers');

            return $this->fetchTotal('users')
                        ->where('role_id', $role_id)->execute();
        }

        $this->logger->info("retrieved total $status users");

        return $this->fetchTotal('users')
                    ->where('status', $status)
                    ->andWhere('role_id', $role_id)->execute();
    }

    public function totalEmployers(string $status = '')
    {
        $this->logger->info("retrieved total $status employers");

        return $this->totalUsers($status, $this->employer_role_id);
    }

    public function totalSkilled(string $status = '')
    {
        $this->logger->info("retrieved total $status skilled people");

        return $this->totalUsers($status, $this->skilled_role_id);
    }

    public function roles(string $status = '')
    {
        $roles = $this->fetch('roles');
        if ($status === '') {
            return $roles->execute();
        }
        $this->logger->info('retrieved application roles');

        return $roles->where('status', $status)->execute();
    }

    public function plans(string $status = '')
    {
        $plans = $this->fetch('plans');
        if ($status === '') {
            return $plans->execute();
        }

        $this->logger->info('retrieved application plans');

        return $plans->where('status', $status)->execute();
    }

    public function plan_features(int $plan_id = null, $status = '')
    {
        $features = $this->fetch('plan_features');
        if ($status !== '') {
            $features->where('status', $status);
        }
        if ($plan_id === null) {
            return $features->execute();
        }

        $this->logger->info("retrieved plan features for plan with id $plan_id");

        return $features->where('plan_id', $plan_id)->execute();
    }

    public function confirmPayment($reference, $name, $email)
    {
        $payment = $this->fetchTotal('payments')
                        ->where('reference', $reference)
                        ->andWhere('name', $name)
                        ->andWhere('email', $email)
                        ->execute();
        if ($payment <= 0) {
            $this->logger->info("payment with reference $reference not in the database");

            return false;
        } else {
            $this->logger->info(" confirmed payment with reference $reference ");

            return true;
        }
    }

    public function registerPayment($reference, $name, $email)
    {
        $sql = 'insert into payments set name = ? , email = ?, reference = ?';
        $this->logger->info(" new payment with reference $reference registered in the database");

        $this->insert($sql, [$name, $email, $reference]);
    }

    public function new(array $values)
    {
        if ($this->userExists($values['email'], $values['number'])) {
            return false;
        }

        $sql = 'insert into users set fullname = ?, email = ?, number = ?, password = ?, media = ?, role_id = ?, plan_id = ?, rank = ?, location = ?, lat = ?, lng = ?, status="unverified";';

        $values = [
            $values['name'],
            $values['email'],
            $values['number'],
            $values['password'],
            $values['avatar'],
            $values['role'],
            $values['plan'],
            $values['rank'],
            $values['location'],
            $values['lat'],
            $values['lng'],
        ];

        $this->insert($sql, $values);

        return true;
    }

    public function userExists($email, $number)
    {
        $userExists = $this->fetchTotal('users')
        ->where('email', $email)
        ->orwhere('number', $email)
        ->orWhere('number', $number)
        ->orWhere('email', $number)
        ->execute();

        // $this->error($userExists);

        if ($userExists > 0) {
            return true;
        }

        return false;
    }

    public function user($identifier)
    {
        return $this->fetch('users')
             ->where('email', $identifier)
             ->orWhere('fullname', $identifier)
             ->orWhere('id', $identifier)
             ->execute()[0] ?? [];
    }

    public function userSkills($id)
    {
        return $this->query(" select * from skills where id in ( select skill_id from users_to_skills where skilled_id = ?) ", [$id]);
    }

    public function update($values, $callback = null)
    {
        $sql = 'update users set fullname = ?, email = ?, number = ?, media = ?, location = ?, lat = ?, lng = ? where id = ?;';

        $values = [
            $values['fullname'],
            $values['email'],
            $values['number'],
            $values['media'],
            $values['location'],
            $values['lat'],
            $values['lng'],
            $values['user_id'],
        ];

        if($callback !== null)
        $this->insert($sql, $values, $callback);
        else
        $this->insert($sql, $values);
    }

    public function linkUserToSkills($user_id, $skill_id)
    {
        $sql = 'insert into users_to_skills set skilled_id = ? , skill_id = ?';

        $this->insert($sql, [$user_id, $skill_id]);
    }

    public function clearUserSkills($user_id)
    {
        $sql = 'delete from users_to_skills where skilled_id = ?';

        $this->insert($sql, [$user_id]);
    }

    public function verificationCode($id, $code)
    {
        $this->query('update verification_codes set status = "invalid" where user_id = ?', [$id], false);

        $sql = 'insert into verification_codes set user_id = ? , code = ?; ';

        $this->insert($sql, [$id, $code]);
    }

    public function verifyCode($code)
    {
        $count = $this->fetchTotal('verification_codes')
                      ->where('code', $code)
                      ->andWhere('status', 'active')->execute();

        $user_id = $this->fetch('verification_codes')
                        ->where('code', $code)->execute()[0]['user_id'] ?? null;

        if ($count > 0) {
            $this->query('update users set status = "verified" where id = ?', [$user_id], false);

            $this->query('update verification_codes set status = "invalid" where user_id = ?', [$user_id], false);

            return [true, $user_id];
        }

        return [false, $user_id];
    }
}
