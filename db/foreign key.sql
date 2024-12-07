ALTER TABLE proyects ADD COLUMN fk_author INT;
ALTER TABLE proyects ADD FOREIGN KEY (fk_author) REFERENCES author(idAuthor);