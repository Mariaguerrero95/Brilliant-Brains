
CREATE TABLE proyects (
idProyect INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(45) NOT NULL,
slogan VARCHAR(50) NOT NULL,
repo TEXT NOT NULL,
demo TEXT NOT NULL,
tech VARCHAR(50) NOT NULL,
description VARCHAR(500) NOT NULL,
photo TEXT NOT NULL,
url TEXT NOT NULL
);

CREATE TABLE author (
idAuthor INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(45) NOT NULL,
job VARCHAR(45) NOT NULL,
image TEXT NOT NULL
);

INSERT INTO proyects (
name, 
slogan, 
repo, 
demo, 
tech,
photo, 
url, 
description
)VALUES
("BookLinker","Conecta lectores con historias inolvidables","https://github.com/autora/booklinker","https://booklinker.demo.com","JavaScript, React, Firebase","esto es una foto","esto es una url","Una plataforma que recomienda libros a los usuarios según sus lecturas pasadas y les permite registrar su progreso de lectura."),
("InvitePro","Tus eventos, organizados y únicos","https://github.com/autora/invitepro","https://invitepro.demo.com","HTML, CSS, JavaScript, Node.js","esto es una foto","esto es una url","Un sitio web para crear invitaciones digitales personalizadas para eventos sociales y corporativos, con opciones para compartir fácilmente en redes.");

INSERT INTO author ( name, job, image )
VALUES
("Alaina", "Web developer", "this is an image"), 
("Tania", "Front-end developer", "this is an image");

SELECT proyects.name, author.name
FROM proyects, author WHERE proyects.fk_author = author.idAuthor;
















