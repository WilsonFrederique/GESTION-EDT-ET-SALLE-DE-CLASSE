CREATE TABLE IF NOT EXISTS edts (
    IDEdt INT AUTO_INCREMENT PRIMARY KEY,
    IDSalle VARCHAR(10),
    IDNiveaux VARCHAR(5),
    IDParcours VARCHAR(5),
    IDCreneaux INT,
    IDMatiere VARCHAR(10),
    cinEns VARCHAR(12),
    FOREIGN KEY (IDSalle) REFERENCES salles(IDSalle),
    FOREIGN KEY (IDNiveaux) REFERENCES niveaux(IDNiveaux),
    FOREIGN KEY (IDParcours) REFERENCES parcours(IDParcours),
    FOREIGN KEY (IDCreneaux) REFERENCES creneaux(IDCreneaux),
    FOREIGN KEY (IDMatiere) REFERENCES matieres(IDMatiere),
    FOREIGN KEY (cinEns) REFERENCES enseignants(cinEns)
);