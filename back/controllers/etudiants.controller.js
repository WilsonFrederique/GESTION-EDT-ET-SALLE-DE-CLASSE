import pool from "../config/db.config.js";

async function create(req, res) {
  try {
    const {
      Matricule, IDNiveaux, IDParcours, Nom, Prenom,
      Sexe, Age, Adresse, Telephone, Email, Img
    } = req.body;

    // Vérification des champs requis
    if (!Matricule || !Prenom) {
      return res.status(400).json({
        error: "Matricule et Prenom sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO etudiants 
      (Matricule, IDNiveaux, IDParcours, Nom, Prenom, Sexe, Age, Adresse, Telephone, Email, Img)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ Matricule, IDNiveaux, IDParcours, Nom, Prenom, Sexe, Age, Adresse, Telephone, Email, Img ]
    );

    return res.status(201).json({
      message: "Étudiant ajouté avec succès",
      Matricule: Matricule
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function updateOne(req, res) {
  try {
    const {
      IDNiveaux, IDParcours, Nom, Prenom,
      Sexe, Age, Adresse, Telephone, Email, Img
    } = req.body;

    const { Matricule } = req.params;

    if (!Prenom) {
      return res.status(400).json({ error: "Prenom est obligatoire" });
    }

    const [result] = await pool.query(
      `UPDATE etudiants SET 
      IDNiveaux = ?, IDParcours = ?, Nom = ?, Prenom = ?, Sexe = ?, 
      Age = ?, Adresse = ?, Telephone = ?, Email = ?, Img = ?
      WHERE Matricule = ?`,
      [ IDNiveaux, IDParcours, Nom, Prenom, Sexe, Age, Adresse, Telephone, Email, Img, Matricule ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    return res.status(200).json({
      message: "Étudiant modifié avec succès",
      Matricule: Matricule
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const { Matricule } = req.params;

    const [result] = await pool.query(
      "DELETE FROM etudiants WHERE Matricule = ?",
      [Matricule]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    return res.status(200).json({
      message: "Suppression effectuée avec succès"
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function getAll(req, res) {
  try {
    const [result] = await pool.query("SELECT * FROM etudiants");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function getOne(req, res) {
  try {
    const { Matricule } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM etudiants WHERE Matricule = ?",
      [Matricule]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

export default {
  create,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
