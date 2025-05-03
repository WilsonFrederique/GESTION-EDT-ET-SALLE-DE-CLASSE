CREATE TABLE IF NOT EXISTS etudiants (
    Matricule VARCHAR(10) PRIMARY KEY,
    IDNiveaux VARCHAR(5),
    IDParcours VARCHAR(5),
    Nom VARCHAR(50),
    Prenom VARCHAR(50),
    Sexe VARCHAR(10),
    Age INT,
    Adresse VARCHAR(50),
    Telephone VARCHAR(13),
    Email VARCHAR(50),
    Img VARCHAR(255),
    FOREIGN KEY (IDNiveaux) REFERENCES niveaux(IDNiveaux) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDParcours) REFERENCES parcours(IDParcours) ON DELETE CASCADE ON UPDATE CASCADE
);