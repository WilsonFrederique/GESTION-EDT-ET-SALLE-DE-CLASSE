import pool from "../config/db.config.js";

// ➕ Créer une matière
async function create(req, res) {
  try {
    const { IDMatiere, Matiere } = req.body;

    if (!IDMatiere || !Matiere) {
      return res.status(400).json({
        error: "IDMatiere et Matiere sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO matieres (IDMatiere, Matiere) VALUES (?, ?)`,
      [IDMatiere, Matiere]
    );

    return res.status(201).json({
      message: "Matière ajoutée avec succès",
      IDMatiere
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// ✏️ Modifier une matière
async function updateOne(req, res) {
  try {
    const { Matiere } = req.body;
    const { IDMatiere } = req.params;

    if (!Matiere) {
      return res.status(400).json({ error: "Le champ Matiere est obligatoire" });
    }

    const [result] = await pool.query(
      `UPDATE matieres SET Matiere = ? WHERE IDMatiere = ?`,
      [Matiere, IDMatiere]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Matière non trouvée" });
    }

    return res.status(200).json({
      message: "Matière modifiée avec succès",
      IDMatiere
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// ❌ Supprimer une matière
async function deleteOne(req, res) {
  try {
    const { IDMatiere } = req.params;

    const [result] = await pool.query(
      `DELETE FROM matieres WHERE IDMatiere = ?`,
      [IDMatiere]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Matière non trouvée" });
    }

    return res.status(200).json({
      message: "Matière supprimée avec succès"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// 📄 Lister toutes les matières
async function getAll(req, res) {
  try {
    const [result] = await pool.query(`SELECT * FROM matieres`);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// 🔍 Obtenir une matière par ID
async function getOne(req, res) {
  try {
    const { IDMatiere } = req.params;

    const [result] = await pool.query(
      `SELECT * FROM matieres WHERE IDMatiere = ?`,
      [IDMatiere]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Matière non trouvée" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// 📦 Export des fonctions
export default {
  create,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
