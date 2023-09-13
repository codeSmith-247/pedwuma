-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 13, 2023 at 03:54 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peadwuma`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `sender_id`, `recipient_id`, `message`, `type`, `updated_at`, `created_at`, `status`) VALUES
(3, 1, 2, '', 'init', '2023-09-13 11:24:56', '2023-09-13 11:24:56', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `employer_reviews`
--

CREATE TABLE `employer_reviews` (
  `id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `review` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` mediumtext NOT NULL,
  `media` varchar(255) NOT NULL,
  `minimum_pay` double NOT NULL,
  `location` text NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `description`, `content`, `media`, `minimum_pay`, `location`, `lat`, `lng`, `employer_id`, `skilled_id`, `status`, `updated_at`, `created_at`) VALUES
(1, 'something here', 'This is a short description', '{\"ops\":[{\"insert\":\"\\n\"}]}', 'name', 302, 'Amasaman, Ghana', '5.706214', '-0.301928', 1, 0, 'active', '2023-09-12 16:40:39', '2023-08-30 00:45:40'),
(2, 'something here', 'This is a short description', '', 'name', 302, 'Amasaman, Ghana', '5.706214', '-0.301928', 1, 0, 'active', '2023-09-05 13:10:13', '2023-08-30 00:51:48'),
(3, 'something here', 'This is a short description', '', 'name', 302, 'Amasaman, Ghana', '5.706214', '-0.301928', 1, 0, 'active', '2023-09-05 13:10:16', '2023-08-30 00:52:27'),
(4, 'First Time Gardener Needed', 'This is a short description of my first job', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"This is content\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"}]}', 'F', 1000, 'Accra, Ghana', '5.603717', '-0.186964', 1, 1, 'active', '2023-09-12 17:24:44', '2023-09-02 15:38:43'),
(5, 'My Second Job', 'This is a short description of my first job', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"This is my Content bro\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"}]}', 'F', 1000, 'Circle Mall Circle Accra Ghana, JR36+5HQ, Accra, Ghana', '5.602490', '-0.193398', 1, 1, 'active', '2023-09-03 15:41:02', '2023-09-02 15:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `jobs_to_skills`
--

CREATE TABLE `jobs_to_skills` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs_to_skills`
--

INSERT INTO `jobs_to_skills` (`id`, `job_id`, `skill_id`, `status`, `updated_at`, `created_at`) VALUES
(19, 5, 28, 'active', '2023-09-03 15:41:02', '2023-09-03 15:41:02'),
(21, 1, 7, 'active', '2023-09-12 16:40:39', '2023-09-12 16:40:39'),
(22, 4, 14, 'active', '2023-09-12 17:24:44', '2023-09-12 17:24:44');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page_contents`
--

CREATE TABLE `page_contents` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `media` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `name`, `email`, `reference`, `status`, `updated_at`, `created_at`) VALUES
(1, 'David Shalom', 'shalomdavid197@gmail.com', 'T759108383169275', 'active', '2023-08-31 14:52:05', '2023-08-31 14:52:05'),
(2, 'David Shalom', 'adedavid.tech@gmail.com', 'T149248205914559', 'active', '2023-09-03 15:54:35', '2023-09-03 15:54:35'),
(3, 'David Shalom', 'shalomdavid197@gmail.com', 'T686160536158644', 'active', '2023-09-03 16:06:13', '2023-09-03 16:06:13'),
(4, 'David Shalom', 'shalomdavid197@gmail.com', 'T600305748610943', 'active', '2023-09-03 16:08:14', '2023-09-03 16:08:14'),
(5, 'David Shalom', 'shalomdavid197@gmail.com', 'T411901389426576', 'active', '2023-09-03 16:14:00', '2023-09-03 16:14:00'),
(6, 'David Shalom', 'shalomdavid197@gmail.com', 'T453974991211583', 'active', '2023-09-03 16:17:51', '2023-09-03 16:17:51'),
(7, 'David Shalom', 'shalomdavid197@gmail.com', 'T569644282176813', 'active', '2023-09-03 16:21:42', '2023-09-03 16:21:42'),
(8, 'David Shalom', 'shalomdavid197@gmail.com', 'T261287845794094', 'active', '2023-09-03 16:23:17', '2023-09-03 16:23:17'),
(9, 'David Shalom', 'shalomdavid197@gmail.com', 'T325798099104048', 'active', '2023-09-03 16:25:11', '2023-09-03 16:25:11'),
(10, 'David Shalom', 'shalomdavid197@gmail.com', 'T789772924349227', 'active', '2023-09-03 16:27:50', '2023-09-03 16:27:50'),
(11, 'David Shalom', 'shalomdavid197@gmail.com', 'T198601157573374', 'active', '2023-09-03 16:32:52', '2023-09-03 16:32:52');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `price` double NOT NULL DEFAULT 10.5,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `name`, `status`, `price`, `updated_at`, `created_at`) VALUES
(1, 'Basic', 'active', 0, '2023-08-31 11:38:34', '2023-08-31 08:19:53'),
(2, 'Recommended', 'active', 55.5, '2023-08-31 11:38:45', '2023-08-31 08:19:53'),
(3, 'Pro', 'active', 550, '2023-08-31 11:39:04', '2023-08-31 08:19:53');

-- --------------------------------------------------------

--
-- Table structure for table `plan_features`
--

CREATE TABLE `plan_features` (
  `id` int(11) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan_features`
--

INSERT INTO `plan_features` (`id`, `feature`, `plan_id`, `status`, `updated_at`, `created_at`) VALUES
(1, '20 proposals a day', 1, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(2, '1000 proposals a day', 2, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(3, 'Unlimited proposals a day', 3, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(4, '50 jobs a week', 1, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(5, '1000 jobs a week', 2, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(6, 'Unlimited jobs a week', 3, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(7, 'Basic rank boost', 1, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(8, 'Recommended rank boost', 2, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(9, 'Proffessional rank boost', 3, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(10, '20 portfolios with on modification', 1, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(11, '1000 portfolios with modification', 2, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22'),
(12, 'Unlimited portfolios with modification', 3, 'active', '2023-08-31 08:32:22', '2023-08-31 08:32:22');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `media` varchar(255) NOT NULL,
  `budget` double NOT NULL,
  `duration` varchar(255) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_to_media`
--

CREATE TABLE `portfolio_to_media` (
  `id` int(11) NOT NULL,
  `portfolio_id` int(11) NOT NULL,
  `media` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

CREATE TABLE `proposals` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `media` varchar(255) NOT NULL,
  `job_id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proposals`
--

INSERT INTO `proposals` (`id`, `title`, `description`, `media`, `job_id`, `employer_id`, `skilled_id`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Project Proposal for First Time Gardener Needed', '{\"ops\":[{\"insert\":\"\\n\"}]}', 'default.png', 5, 1, 2, 'accepted', '2023-09-13 11:24:56', '2023-09-05 16:15:11'),
(2, 'Project Proposal for First Time Gardener Needed', '{\"ops\":[{\"insert\":\"\\n\"}]}', 'default.png', 5, 1, 2, 'pending', '2023-09-13 11:24:48', '2023-09-05 16:16:07'),
(4, 'This is a test title', '{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"This is the description\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nA bold description that contains a list of items\\nThe first item in the list\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"subitemone\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"subitemtwo\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\\n\"}]}', 'proposal_document_1694533604650087e4ee718.png', 4, 1, 2, 'pending', '2023-09-13 10:14:08', '2023-09-12 15:46:45');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Employer', 'active', '2023-08-31 09:41:57', '2023-08-31 09:41:57'),
(2, 'Skilled Person', 'active', '2023-08-31 09:41:57', '2023-08-31 09:41:57');

-- --------------------------------------------------------

--
-- Table structure for table `skilled_reviews`
--

CREATE TABLE `skilled_reviews` (
  `id` int(11) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `review` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skilled_views`
--

CREATE TABLE `skilled_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `media` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `title`, `description`, `media`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Carpentry', 'Hire a skilled tailor who can make fashionable clothes with fabrics and machines. Our tailors can measure, cut, sew, and design garments for various occasions.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(2, 'Mechanic', 'Hire a reliable mechanic who can fix and maintain vehicles with tools and parts. Our mechanics can diagnose, repair, and service cars, motorcycles, or trucks.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(3, 'Hairdressing', 'Hire a professional hairdresser who can style and beautify hair with scissors and products. Our hairdressers can cut, color, braid, and weave hair for different looks and preferences.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(4, 'Plumbing', 'Hire a competent plumber who can install and repair pipes and fixtures with wrenches and soldering. Our plumbers can work with water, gas, or drainage systems for homes or businesses.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(5, 'Electrician', 'Hire a certified electrician who can install and maintain electrical wiring and equipment with tools and meters. Our electricians can work with power lines, circuits, or appliances for safety and efficiency.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(6, 'Catering', 'Hire a quality caterer who can provide food and drinks for events with utensils and ingredients. Our caterers can plan menus, prepare dishes, and serve guests for various occasions.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(7, 'Journalism', 'Hire a credible journalist who can report news and stories with words and images. Our journalists can research, write, edit, and publish articles for print or online media.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(8, 'Music', 'Hire a talented musician who can create and perform musical sounds with instruments and voice. Our musicians can play, sing, compose, and record songs for entertainment or expression.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(9, 'Farming', 'Hire a hardworking farmer who can grow crops and raise animals with seeds and tools. Our farmers can plant, harvest, feed, and sell produce for food or income.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(10, 'Pottery', 'Hire an artistic potter who can make ceramic objects with clay and kilns. Our potters can shape mold fire and decorate pots vases or sculptures for art or utility.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(11, 'Sewing', 'Hire a skilled tailor who can make fashionable clothes with fabrics and machines. Our tailors can measure, cut, sew, and design garments for various occasions.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(12, 'Baking', 'Hire a talented baker who can make bread, cakes, pies, or other baked goods using an oven or a fire. Our bakers can prepare delicious recipes from traditional and modern cuisines.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(13, 'Basket weaving', 'Hire an artistic basket weaver who can make baskets or other containers from natural materials such as grasses, reeds, or palm leaves. Our basket weavers can create beautiful and functional products with a rich heritage and culture.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(14, 'Masonry', 'Hire a durable mason who can build structures from bricks, stones, or concrete blocks using mortar and tools. Our masons can work with sturdy and resilient materials for buildings and infrastructure.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(15, 'Fishing', 'Hire a vital fisher who can catch fish or other aquatic animals from rivers, lakes, or the sea using nets, rods, hooks, or traps. Our fishers can provide food and income from a large and diverse fishery sector.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(16, 'Jewelry making', 'Hire a beautiful jewelry maker who can create ornaments such as earrings, necklaces, bracelets, or rings from metals, beads, stones, or other materials. Our jewelry makers can produce unique and handmade jewelry for any occasion.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(17, 'Translation', 'Hire a valuable translator who can convert written text from one language to another while preserving the meaning and tone. Our translators can work with many languages spoken and written across different countries and regions.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(19, 'Soap making', 'Hire a practical soap maker who can produce soap from oils, fats, lye, water, and other ingredients using various methods such as cold process, hot process, or melt and pour. Our soap makers can provide natural and homemade soap for hygiene and health.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(20, 'Gardening', 'Hire a rewarding gardener who can grow plants such as flowers, vegetables, herbs, or fruits in pots, beds, or plots using soil, water, seeds, and tools. Our gardeners can create a green and productive garden for your home or business.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(26, 'Jewelry making', 'Hire a beautiful jewelry maker who can create ornaments such as earrings, necklaces, bracelets, or rings from metals, beads, stones, or other materials. Our jewelry makers can produce unique and handmade jewelry for any occasion.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(27, 'Translation', 'Hire a valuable translator who can convert written text from one language to another while preserving the meaning and tone. Our translators can work with many languages spoken and written across different countries and regions.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(28, 'Carpentry', 'Hire a versatile carpenter who can make or repair wooden objects or structures using wood and tools. Our carpenters can work with various wood products such as furniture, doors, windows, or roofs.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(29, 'Soap making', 'Hire a practical soap maker who can produce soap from oils, fats, lye, water, and other ingredients using various methods such as cold process, hot process, or melt and pour. Our soap makers can provide natural and homemade soap for hygiene and health.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25'),
(30, 'Gardening', 'Hire a rewarding gardener who can grow plants such as flowers, vegetables, herbs, or fruits in pots, beds, or plots using soil, water, seeds, and tools. Our gardeners can create a green and productive garden for your home or business.', 'default.png', 'active', '2023-09-02 20:37:25', '2023-09-02 20:37:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `media` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 0,
  `location` text NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `number`, `password`, `media`, `role_id`, `plan_id`, `rank`, `location`, `lat`, `lng`, `status`, `updated_at`, `created_at`) VALUES
(1, 'David Sherlock', 'adedavid.tech@gmail.com', '552595712', '$2y$12$U6xnb4qEc5NiJ/PMV1DI3OV/qvPilO8dLKT6VoDHE7WPsPvGDcDEe', 'avatar_169356344364f1ba33a7227.png', 1, 0, 1, 'Ofaakor, Ghana', '7.946527', '-1.023194', 'verified', '2023-09-04 11:26:48', '2023-09-01 10:17:23'),
(2, 'David Shalom', 'shalomdavid197@gmail.com', '508809980', '$2y$12$vpOlpcDrSN9/Gt2sKVFaVe0uvXX19AMZuRRs4qovIvELm6.z1Ptd.', 'avatar_169375877564f4b53793617.png', 2, 3, 3, 'Ofaakor, Ghana', '7.946527', '-1.023194', 'verified', '2023-09-03 16:48:45', '2023-09-03 16:32:55');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_skills`
--

CREATE TABLE `users_to_skills` (
  `id` int(11) NOT NULL,
  `skilled_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verification_codes`
--

CREATE TABLE `verification_codes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verification_codes`
--

INSERT INTO `verification_codes` (`id`, `user_id`, `code`, `status`, `updated_at`, `created_at`) VALUES
(1, 1, '@verify@my@pedwuma@account@64f2018625b49', 'invalid', '2023-09-01 15:25:30', '2023-09-01 15:21:42'),
(2, 1, '@verify@my@pedwuma@account@64f2026a7d6e4', 'invalid', '2023-09-01 15:56:44', '2023-09-01 15:25:30'),
(3, 1, '@verify@my@pedwuma@account@64f209bcad745', 'invalid', '2023-09-01 16:02:29', '2023-09-01 15:56:44'),
(4, 1, '@verify@my@pedwuma@account@64f20b151c678', 'invalid', '2023-09-01 16:24:59', '2023-09-01 16:02:29'),
(5, 1, '@verify@my@pedwuma@account@64f2105b51735', 'invalid', '2023-09-01 16:34:24', '2023-09-01 16:24:59'),
(6, 2, '@verify@my@pedwuma@account@64f4b79d2454a', 'invalid', '2023-09-03 16:48:45', '2023-09-03 16:43:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employer_reviews`
--
ALTER TABLE `employer_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs_to_skills`
--
ALTER TABLE `jobs_to_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_contents`
--
ALTER TABLE `page_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan_features`
--
ALTER TABLE `plan_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_to_media`
--
ALTER TABLE `portfolio_to_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skilled_reviews`
--
ALTER TABLE `skilled_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skilled_views`
--
ALTER TABLE `skilled_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_to_skills`
--
ALTER TABLE `users_to_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employer_reviews`
--
ALTER TABLE `employer_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs_to_skills`
--
ALTER TABLE `jobs_to_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_contents`
--
ALTER TABLE `page_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plan_features`
--
ALTER TABLE `plan_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio_to_media`
--
ALTER TABLE `portfolio_to_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposals`
--
ALTER TABLE `proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skilled_reviews`
--
ALTER TABLE `skilled_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skilled_views`
--
ALTER TABLE `skilled_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_to_skills`
--
ALTER TABLE `users_to_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verification_codes`
--
ALTER TABLE `verification_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;