

DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `id_persona` bigint NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id_login` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `id_persona` bigint DEFAULT NULL,
  PRIMARY KEY (`id_login`),
  FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `historial`;
CREATE TABLE `historial` (
  `id_historial` bigint NOT NULL AUTO_INCREMENT,
  `idioma` varchar(255) DEFAULT NULL,
  `palabra` varchar(255) DEFAULT NULL,
  `puntaje_higher` int DEFAULT NULL,
  `setwname` varchar(255) DEFAULT NULL,
  `id_login` bigint DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  FOREIGN KEY (`id_login`) REFERENCES `login` (`id_login`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;

INSERT INTO `persona` VALUES (1,'perez','abiperez0310@gmail.com','abi'),(2,'diaz','yire_diaz@gmail.com','yire'),(3,'lopez','emmanuellp@gmail.com','emmanuel'),(4,'perez','yamip@gmail.com','yami'),(5,'perez','yamip@gmail.com','yami'),(6,'perez','yamip@gmail.com','yami'),(7,'moreno','abi2@gmail.com','abi'),(8,'moreno','morenoester208@gmailcom','ester'),(9,'Pérez','aure@gmail.com','Aureliano'),(10,'moreno','sandra38@gmail.com','sandra'),(11,'Pérez','hildapc123@gmail.com','Hilda'),(12,'Pérez','salazar@hotmail.com','Hugo'),(13,'Navarro','franc89@outlook.com','Francisco'),(14,'rfdgdfg','adfgdfgbi2@gmail.com','eedffg'),(15,'Díaz','elidd@gmail.com','Eli'),(16,'moreno','yamper@yam.pe','yam'),(17,'moreno','yamper@yam.per','yam'),(18,'Moreno','pame@abi.com','Pame'),(19,'Moreno','pame@g.abb','Pame'),(20,'Moreno','pame@gmail.com','Pame'),(21,'Castro','castro1@gmail.com','Jorge'),(22,'Moreno','abimoreno203@gmail.com','Abigail'),(23,'Final','usuariofinal@gmail.com','Usuario'),(24,'dos','usuariodos@gmail.com','Usuario ');
INSERT INTO `login` VALUES (1,'4b1p3r3z','abi',1),(2,'y1r3d1az','yire',2),(3,'3m4nu3l','emmanuel',3),(4,'y4m1l3t','yam',4),(5,'y4m1l3t','yam',5),(6,'y4m1l3t','yam',6),(7,'123ester','abi20',7),(8,'123esterabigail','ester20',8),(9,'ure1234','aure40',9),(10,'sandramoreno123','sandra40',10),(11,'shaily4','hilda',11),(12,'hugo123','huguis',12),(13,'francisconav89','Francisco',13),(14,'asdsf123ewq','dfdfg',14),(15,'eli123456','eli',15),(16,'yami123456','yami',16),(17,'123ester','yam',17),(18,'pame12345','pame',18),(19,'pame1234','pame',19),(20,'123ester','pame',20),(21,'jorfe12345','jorge',21),(22,'abim0r3n0','abi203',22),(23,'usuariof1n4l','usuario1',23),(24,'usuario2','usuario2',24);
INSERT INTO `historial` VALUES (1,'espanol','vestido',458,'ropa',1),(2,'espanol','blusa',458,'ropa',1),(3,'espanol','falda',458,'ropa',1),(4,'espanol','pantalon',458,'ropa',1),(5,'espanol','camisa',458,'ropa',1),(6,'ingles','dress',458,'ropa',1),(7,'ingles','blouse',458,'ropa',1),(8,'ingles','skirt',458,'ropa',1),(9,'ingles','pants',458,'ropa',1),(10,'ingles','shirt',458,'ropa',1),(11,'espanol','cinco',458,'numeros',2),(12,'espanol','diez',458,'numeros',2),(13,'espanol','tres',458,'numeros',2),(14,'espanol','uno',458,'numeros',2),(15,'espanol','siete',458,'numeros',2),(16,'ingles','five',458,'numeros',2),(17,'ingles','ten',458,'numeros',2),(18,'ingles','three',458,'numeros',2),(19,'ingles','one',458,'numeros',2),(20,'ingles','seven',458,'numeros',2),(21,'espanol','gato',458,'animales',3),(22,'espanol','serpiente',458,'animales',3),(23,'espanol','perro',458,'animales',3),(24,'espanol','mariposa',458,'animales',3),(25,'espanol','mosca',458,'animales',3),(26,'ingles','cat',458,'animales',3),(27,'ingles','snake',458,'animales',3),(28,'ingles','dog',458,'animales',3),(29,'ingles','butterfly',458,'animales',3),(30,'ingles','fly',458,'animales',3),(31,'espanol','hola',0,'Random',7),(32,'ingles','dog',0,'Random',7),(33,'espanol','perro',0,'Random',7),(34,'ingles','hello',0,'Random',7),(35,'ingles','hello',0,'Abigail',7),(36,'espanol','adios',0,'Abigail',7),(37,'ingles','goodbye',0,'Abigail',7),(38,'espanol','hola',0,'Abigail',7),(39,'ingles','blouse',0,'ropa',7),(40,'ingles','jean',0,'ropa',7),(41,'espanol','pantalon',0,'ropa',7),(42,'espanol','blusa',0,'ropa',7),(43,'espanol','perro',0,'animales',7),(44,'espanol','gato',0,'animales',7),(45,'ingles','dog',0,'animales',7),(46,'ingles','cat',0,'animales',7),(47,'espanol','negro',0,'colores',7),(48,'ingles','black',0,'colores',7),(49,'espanol','rojo',0,'colores',7),(50,'ingles','red',0,'colores',7),(51,'espanol','dos',0,'numeros',7),(52,'ingles','one',0,'numeros',7),(53,'ingles','two',0,'numeros',7),(54,'espanol','uno',0,'numeros',7),(55,'ingles','seven',0,'numeros2',7),(56,'espanol','diez',0,'numeros2',7),(57,'espanol','siete',0,'numeros2',7),(58,'ingles','ten',0,'numeros2',7),(59,'ingles','apple',0,'cosas',7),(60,'espanol','manzana',0,'cosas',7),(61,'ingles','pen',0,'cosas',7),(62,'espanol','lapicero',0,'cosas',7),(63,'ingles','sun',0,'naturaleza',7),(64,'espanol','sol',0,'naturaleza',7),(65,'espanol','flor',0,'naturaleza',7),(66,'ingles','flower',0,'naturaleza',7),(67,'ingles','hello',0,'grupoUno',7),(68,'espanol','hola',0,'grupoUno',7),(69,'ingles','red',0,'grupoUno',7),(70,'espanol','negro',0,'grupoUno',7),(71,'ingles','sun',0,'grupoUno',7),(72,'espanol','rojo',0,'grupoUno',7),(73,'ingles','black',0,'grupoUno',7),(74,'espanol','perro',0,'Random',23),(75,'espanol','hola',0,'Random',23),(76,'espanol','adios',0,'Random',23),(77,'ingles','hello',0,'Random',23),(78,'ingles','dog',0,'Random',23),(79,'ingles','goodbye',0,'Random',23),(80,'ingles','dog',0,'Random',24),(81,'espanol','hola',0,'Random',24),(82,'espanol','perro',0,'Random',24),(83,'espanol','adios',0,'Random',24),(84,'ingles','goodbye',0,'Random',24),(85,'ingles','hello',0,'Random',24);