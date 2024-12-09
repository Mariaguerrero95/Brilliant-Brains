SELECT * FROM sql7749694.proyects;

UPDATE proyects SET fk_author = 1 WHERE idProyect = 1;
UPDATE proyects SET fk_author = 2 WHERE idProyect = 2;

DELETE FROM proyects WHERE idProyect = 3;
DELETE FROM proyects WHERE idProyect = 4;
