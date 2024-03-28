-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: wireframe
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `option_key` varchar(20) DEFAULT NULL,
  `option_value` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`),
  CONSTRAINT `option_master_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `select_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_master`
--

LOCK TABLES `option_master` WRITE;
/*!40000 ALTER TABLE `option_master` DISABLE KEYS */;
INSERT INTO `option_master` VALUES (1,1,'male','male'),(2,1,'female','female'),(3,1,'other','other'),(4,2,'single','single'),(5,2,'married','married'),(6,3,'gujarat','gujarat'),(7,3,'maharastra','maharastra'),(8,3,'rajasthan','rajasthan'),(9,3,'madhya pradesh','madhya pradesh'),(10,4,'guajrati','gujarati'),(11,4,'hindi','hindi'),(12,4,'english','english'),(13,4,'marathi','marathi'),(14,5,'python','python'),(15,5,'php','php'),(16,5,'java','java'),(17,5,'javascript','javascript');
/*!40000 ALTER TABLE `option_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `select_master`
--

DROP TABLE IF EXISTS `select_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `select_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `select_field` varchar(20) NOT NULL,
  `unique_name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `multipleValue` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `select_master`
--

LOCK TABLES `select_master` WRITE;
/*!40000 ALTER TABLE `select_master` DISABLE KEYS */;
INSERT INTO `select_master` VALUES (1,'gender','gender1','radio',0),(2,'relation','relation2','combo',0),(3,'state','state3','combo',0),(4,'language','language4','checkbox',1),(5,'technology','technology5','checkbox',1),(12,'department','department12','combo',0);
/*!40000 ALTER TABLE `select_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-27 17:33:49
