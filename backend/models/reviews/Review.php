<?php

namespace Model\Review;

use Model\Model;

class Review extends Model
{

    public function totalReviews() : int
    {
        $reviews = $this->totalEmployerReviews() + $this->totalSkilledReviews();

        $this->logger->info('retrieved total reviews');

        return $reviews;
    }

    public function totalEmployerReviews() : int
    {
        $reviews = $this->fetchTotal('employer_reviews')
                        ->execute();

        $this->logger->info('retrieved employer total reviews');

        return $reviews;
    }

    public function totalSkilledReviews() : int
    {
        $reviews = $this->fetchTotal('employer_reviews')
                        ->execute();

        $this->logger->info('retrieved skilled total reviews');

        return $reviews;
    }

    public function positiveReviews() : array
    {
        $reviews = $this->fetch('employer_reviews')
                        ->subFetch('title', 'select title from jobs where jobs.id = employer_reviews.job_id')
                        ->join('join users on users.id = employer_reviews.employer_id')
                        ->where('type', 'positive')->getDistance(0, 0)
                        ->desc('distance asc, created_at')->execute();

        $this->logger->info("retrieved positive reviews from the database");

        return $reviews;
    }
}