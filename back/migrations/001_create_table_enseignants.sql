CREATE TABLE IF NOT EXISTS enseignants (
    cinEns VARCHAR(14) PRIMARY KEY,
    Nom VARCHAR(50),
    Prenom VARCHAR(50),
    Sexe VARCHAR(10),
    Grade VARCHAR(100),
    Adresse VARCHAR(50),
    Telephone VARCHAR(13),
    Email VARCHAR(50),
    Specialite VARCHAR(50),
    Descriptions TEXT,
    Img VARCHAR(255)
);
