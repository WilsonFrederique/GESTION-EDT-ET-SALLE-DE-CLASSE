CREATE TABLE IF NOT EXISTS creneaux (
    IDCreneaux INT AUTO_INCREMENT PRIMARY KEY,
    Jours VARCHAR(20),
    HeureDebut TIME,
    HeureFin TIME,
    DateDebut DATE,
    DateFin DATE
);