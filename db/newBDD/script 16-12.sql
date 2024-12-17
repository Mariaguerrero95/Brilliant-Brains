UPDATE proyects SET fk_author = 1 WHERE idProyect = 1;
UPDATE proyects SET fk_author = 2 WHERE idProyect = 2;

DELETE FROM proyects WHERE idProyect = 3;
DELETE FROM proyects WHERE idProyect = 4;

DELETE FROM author WHERE idAuthor = 3;
DELETE FROM author WHERE idAuthor = 4;

SELECT * FROM author;