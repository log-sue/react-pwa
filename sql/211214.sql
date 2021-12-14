-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.6.5-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- test 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `test`;

-- 테이블 test.user 구조 내보내기
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userId` varchar(50) NOT NULL,
  `userPw` varchar(50) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 test.user:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userId`, `userPw`) VALUES
	('test33@test', '1234'),
	('test44@test', '1234'),
	('test@test', '1234');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 테이블 test.usercontents 구조 내보내기
DROP TABLE IF EXISTS `usercontents`;
CREATE TABLE IF NOT EXISTS `usercontents` (
  `contentId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contentId`),
  KEY `FK__user` (`userId`),
  CONSTRAINT `FK__user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 test.usercontents:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `usercontents` DISABLE KEYS */;
INSERT INTO `usercontents` (`contentId`, `userId`, `content`, `subject`, `image`) VALUES
	(1, 'test@test', '1111111111', '1111', '22aa52638042bafb6f1a852fa9df0c7a'),
	(2, 'test@test', '222222', '222', '909e1e6b8d604e14e6e96665f4643434'),
	(3, 'test@test', '33333', '3333', '45f817cd65d9a067132dbd29be0c193a'),
	(4, 'test@test', '44444', '4444', 'cb6c038c9c8bacf0ccab09ded46dd49d');
/*!40000 ALTER TABLE `usercontents` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
