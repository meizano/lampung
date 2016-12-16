-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2016 at 12:58 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kaganga`
--

-- --------------------------------------------------------

--
-- Table structure for table `indonesia`
--

CREATE TABLE IF NOT EXISTS `indonesia` (
  `id` int(11) NOT NULL,
  `kata` varchar(50) NOT NULL,
  `definisi` varchar(200) DEFAULT NULL,
  `jenis` varchar(25) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `indonesia2lampung`
--

CREATE TABLE IF NOT EXISTS `indonesia2lampung` (
  `id_indonesia` int(11) NOT NULL,
  `id_lampung` int(11) NOT NULL,
  `keterangan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lampung`
--

CREATE TABLE IF NOT EXISTS `lampung` (
  `id` int(11) NOT NULL,
  `kata` varchar(50) NOT NULL,
  `definisi` varchar(300) DEFAULT NULL,
  `jenis` varchar(25) DEFAULT NULL,
  `dialek` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indonesia`
--
ALTER TABLE `indonesia`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `kata` (`kata`);

--
-- Indexes for table `indonesia2lampung`
--
ALTER TABLE `indonesia2lampung`
  ADD UNIQUE KEY `ID_Indonesia2Lampung` (`id_indonesia`,`id_lampung`), ADD KEY `ID_Lampung` (`id_lampung`);

--
-- Indexes for table `lampung`
--
ALTER TABLE `lampung`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `kata` (`kata`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `indonesia`
--
ALTER TABLE `indonesia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `lampung`
--
ALTER TABLE `lampung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=348;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `indonesia2lampung`
--
ALTER TABLE `indonesia2lampung`
ADD CONSTRAINT `IDLampung` FOREIGN KEY (`id_lampung`) REFERENCES `lampung` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
