-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wobblywheels
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `bookingId` int NOT NULL AUTO_INCREMENT,
  `bookingName` varchar(100) NOT NULL,
  `bookingUserId` int NOT NULL,
  `bookingLessonId` int DEFAULT NULL,
  `bookingTime` varchar(45) NOT NULL,
  `bookingDate` varchar(100) NOT NULL,
  PRIMARY KEY (`bookingId`),
  UNIQUE KEY `bookingId_UNIQUE` (`bookingId`),
  KEY `bookingLessonId_idx` (`bookingLessonId`),
  KEY `bookingUserId_idx` (`bookingUserId`),
  CONSTRAINT `bookingLessonId` FOREIGN KEY (`bookingLessonId`) REFERENCES `lessons` (`lessonId`) ON DELETE SET NULL,
  CONSTRAINT `bookingUserId` FOREIGN KEY (`bookingUserId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coaches` (
  `coachId` int NOT NULL AUTO_INCREMENT,
  `coachName` varchar(100) NOT NULL,
  `coachBio` longtext NOT NULL,
  `coachPosition` varchar(100) NOT NULL,
  `coachPicture` blob NOT NULL,
  `coachPictureName` varchar(255) NOT NULL,
  PRIMARY KEY (`coachId`),
  UNIQUE KEY `coachId_UNIQUE` (`coachId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
INSERT INTO `coaches` VALUES (1,'Paige Maguire','Hey there, I\'m Coach Paige! Coaching is a true passion of mine and I have been a gymnastics coach for over 6 years, training those as young as 18 months to 75+ years old. Other classNamees I teach include parkour, artistic gymnastics and acrobatics. I am also trained in first aid. I have been roller skating for over 2 years and love to skate at the park. My favourite move is cartwheeling into a ramp and exiting with handstands.','Coach',_binary '[object Object]','Paige.jpg'),(2,'Layla Anderson','Hello, I\'m Coach Layla! I found my passion for roller skating over a year ago and love coaching our beginners! Skating has significantly improved my confidence and my overall wellbeing. I love the adrenaline of nailing new tricks and seeing myself progress. I am bubbly, energetic, love working with children and get great fulfilment seeing them progress! My favourite skill is spinning, and at the skate park I love to stall on the coping!','Coach',_binary '[object Object]','Layla.jpg'),(3,'Hamish Maguire','Hey, I’m Hamish! Come to me for all of your questions and concerns. You won’t be seeing me wearing any skates but I will be there next to you with an open hand and the encouragement to help you progress! You will find me setting up all the games, band-aiding the scraped knees, and keeping the kids upright and calm. I really enjoy working with children and always wear a smile. I will do my very best to keep everyone skating safe and having fun.','Admin, coach and Medical',_binary '[object Object]','Hamish.jpg');
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `galleryId` int NOT NULL AUTO_INCREMENT,
  `galleryTitle` varchar(45) NOT NULL,
  `galleryDescription` varchar(500) DEFAULT NULL,
  `galleryPicture` blob,
  `galleryLikes` int DEFAULT NULL,
  `galleryPictureName` varchar(200) NOT NULL,
  PRIMARY KEY (`galleryId`),
  UNIQUE KEY `galleryId_UNIQUE` (`galleryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `lessonId` int NOT NULL AUTO_INCREMENT,
  `lessonName` varchar(100) NOT NULL,
  `lessonPrice` int NOT NULL,
  `lessonDescription` varchar(1500) NOT NULL,
  `lessonDay` int DEFAULT NULL,
  `lessonTime` varchar(10) NOT NULL,
  `lessonCapacity` int NOT NULL,
  `lessonCoachA` int NOT NULL,
  `lessonCoachB` int DEFAULT NULL,
  `lessonLocationA` varchar(150) NOT NULL,
  `lessonLocationB` varchar(150) DEFAULT NULL,
  `lessonPictureName` varchar(45) DEFAULT NULL,
  `lessonPicture` blob,
  PRIMARY KEY (`lessonId`),
  UNIQUE KEY `lessonid_UNIQUE` (`lessonId`),
  KEY `lessonPrice` (`lessonPrice`),
  KEY `lessonCoachA_idx` (`lessonCoachA`),
  KEY `lessonCoachB_idx` (`lessonCoachB`),
  CONSTRAINT `lessonCoachA` FOREIGN KEY (`lessonCoachA`) REFERENCES `coaches` (`coachId`),
  CONSTRAINT `lessonCoachB` FOREIGN KEY (`lessonCoachB`) REFERENCES `coaches` (`coachId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `passwordreset`
--

DROP TABLE IF EXISTS `passwordreset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordreset` (
  `resetCode` int NOT NULL,
  `userName` varchar(200) NOT NULL,
  `userEmail` varchar(200) NOT NULL,
  PRIMARY KEY (`resetCode`),
  UNIQUE KEY `userName_UNIQUE` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordreset`
--

LOCK TABLES `passwordreset` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `reviewUserId` int NOT NULL,
  `reviewStars` int NOT NULL,
  `reviewText` varchar(1500) NOT NULL,
  `reviewDate` varchar(10) NOT NULL,
  PRIMARY KEY (`reviewId`),
  UNIQUE KEY `userId_UNIQUE` (`reviewId`),
  KEY `reviewUserId_idx` (`reviewUserId`),
  CONSTRAINT `reviewUserId` FOREIGN KEY (`reviewUserId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `skaters`
--

DROP TABLE IF EXISTS `skaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skaters` (
  `skaterId` int NOT NULL AUTO_INCREMENT,
  `skaterName` varchar(45) NOT NULL,
  `skaterLastName` varchar(45) NOT NULL,
  `skaterAssociatedUserId` int NOT NULL,
  `skaterDOB` varchar(45) NOT NULL,
  `skaterEmergencyContact` varchar(15) NOT NULL,
  PRIMARY KEY (`skaterId`),
  UNIQUE KEY `skaterId_UNIQUE` (`skaterId`),
  KEY `skaterAssociatedUserId_idx` (`skaterAssociatedUserId`) /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skaters`
--

LOCK TABLES `skaters` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `updates`
--

DROP TABLE IF EXISTS `updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `updates` (
  `updateId` int NOT NULL AUTO_INCREMENT,
  `updateTitle` varchar(150) NOT NULL,
  `updateText` varchar(1500) NOT NULL,
  `updateBookButton` int DEFAULT NULL,
  `updatePicture` blob,
  `updatePictureName` varchar(100) NOT NULL,
  PRIMARY KEY (`updateId`),
  UNIQUE KEY `updatesId_UNIQUE` (`updateId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `updates`
--

LOCK TABLES `updates` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `userPassword` varchar(200) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `userContact` int NOT NULL,
  `userIsAdmin` int NOT NULL DEFAULT '0',
  `userIsSuperAdmin` int NOT NULL DEFAULT '0',
  `userFirstName` varchar(100) NOT NULL,
  `userLastName` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`,`userName`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (10,'testing@testing.com','$2b$10$LRU/iPEpm2geAGQlbGuGcuCJ9.KYF9FvCQH756L9r8gz8TF3wxZVu','3123213123',22,1,1,'Test fname','testLname');
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
