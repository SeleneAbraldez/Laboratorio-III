-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2019 a las 01:34:16
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mercado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarixs`
--

DROP TABLE IF EXISTS `usuarixs`;
CREATE TABLE `usuarixs` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `apellido` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `mail` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `clave` varchar(10) COLLATE latin1_general_ci NOT NULL,
  `perfil` int(11) NOT NULL,
  `estado` int(11) DEFAULT '1',
  `foto` varchar(50) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `usuarixs`
--

INSERT INTO `usuarixs` (`id`, `nombre`, `apellido`, `mail`, `clave`, `perfil`, `estado`, `foto`) VALUES
(1, 'Ramiro', 'Perez', 'falso@gmail.com', '456', 0, 1, 'chunky.jpg'),
(2, 'Juana', 'Helado', 'mailsito@hotmail.com', '123', 1, 1, 'chunkier.jpg'),
(3, 'Emi', 'Lia', 'mail', '1', 0, 0, ''),
(5, 'b', 'b', 'b', 'b', 0, 1, 'b.225353.jpg'),
(6, 'c', 'c', 'c', 'c', 0, 1, 'c.225609.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarixs`
--
ALTER TABLE `usuarixs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarixs`
--
ALTER TABLE `usuarixs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
