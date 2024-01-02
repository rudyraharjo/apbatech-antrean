-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_apbatech
CREATE DATABASE IF NOT EXISTS `db_apbatech` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db_apbatech`;

-- Dumping structure for table db_apbatech.antrian
CREATE TABLE IF NOT EXISTS `antrian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomorantrean` varchar(50) DEFAULT NULL,
  `angkaantrean` int(11) DEFAULT NULL,
  `norm` varchar(50) DEFAULT NULL,
  `namapoli` varchar(50) DEFAULT NULL,
  `kodepoli` varchar(50) DEFAULT NULL,
  `tglpriksa` date DEFAULT NULL,
  `nomorkartu` varchar(50) NOT NULL,
  `nik` varchar(50) NOT NULL,
  `keluhan` varchar(50) NOT NULL,
  `statusdipanggil` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `int` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_apbatech.antrian: ~8 rows (approximately)
DELETE FROM `antrian`;
INSERT INTO `antrian` (`id`, `nomorantrean`, `angkaantrean`, `norm`, `namapoli`, `kodepoli`, `tglpriksa`, `nomorkartu`, `nik`, `keluhan`, `statusdipanggil`) VALUES
	(1, 'A1', 1, '0002', 'POLI KANDUNGAN', '001', '2023-04-02', '0202001', '367010387283', 'Sakit Kepala', 3),
	(2, 'A2', 2, '0003', 'POLI GIGI', '002', '2023-04-02', '0202002', '367010387999', 'Sakit Gigi', 0),
	(3, 'A3', 3, '0004', 'POLI GIGI', '002', '2023-04-02', '0202003', '367010387199', 'Tambah Gigi', 0),
	(4, 'A4', 4, '0005', 'POLI GIGI', '002', '2023-04-02', '0202002', '367010387190', 'Tambah Gigi', 1),
	(25, 'A2', 3, '0006', 'POLI GIGI', '002', '2024-01-02', '000123456781', '3212345678987654', 'sakit gusi', 0),
	(26, 'A2', 4, '0007', 'POLI GIGI', '002', '2024-01-02', '000123456781', '3212345678987654', 'sakit gusi', 0),
	(27, 'A2', 5, '0008', 'POLI GIGI', '002', '2024-01-02', '000123456781', '3212345678987654', 'sakit gusi', 0),
	(28, 'A2', 5, '0008', 'POLI GIGI', '002', '2023-04-02', '0202002', '367010387999', 'Sakit Gigi', 0);

-- Dumping structure for table db_apbatech.poli
CREATE TABLE IF NOT EXISTS `poli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_poli` varchar(100) NOT NULL,
  `nama_poli` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_apbatech.poli: ~0 rows (approximately)
DELETE FROM `poli`;

-- Dumping structure for table db_apbatech.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db_apbatech.users: ~2 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `username`, `password`) VALUES
	(1, 'rraharjo', '$2a$10$CGxFXLAH5sAmHJnZXTkSDuHVwMSsahmZgFt8MDjiLZJOw7CmOh8Li'),
	(2, 'santiks', '$2a$10$NCKvJzeCD8Q6Vn0u3uRSj.DqObZCfpUFGul73fk24ooP9hvLezfMm');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
