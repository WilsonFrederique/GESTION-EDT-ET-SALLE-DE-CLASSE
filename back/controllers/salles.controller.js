import pool from "../config/db.config.js";

// ➕ Créer une salle
async function create(req, res) {
  try {
    const { IDSalle, Salle, Disponibilite } = req.body;

    if (!IDSalle || !Salle) {
      return res.status(400).json({
        error: "IDSalle et Salle sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO salles (IDSalle, Salle, Disponibilite) VALUES (?, ?, ?)`,
      [IDSalle, Salle, Disponibilite]
    );

    return res.status(201).json({
      message: "Salle ajoutée avec succès",
      IDSalle: IDSalle
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// ✏️ Modifier une salle
async function updateOne(req, res) {
  try {
    const { Salle, Disponibilite } = req.body;
    const { IDSalle } = req.params;

    if (!Salle) {
      return res.status(400).json({ error: "Le champ Salle est obligatoire" });
    }

    const [result] = await pool.query(
      `UPDATE salles SET Salle = ?, Disponibilite = ? WHERE IDSalle = ?`,
      [Salle, Disponibilite, IDSalle]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Salle non trouvée" });
    }

    return res.status(200).json({
      message: "Salle modifiée avec succès",
      IDSalle: IDSalle
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// ❌ Supprimer une salle
async function deleteOne(req, res) {
  try {
    const { IDSalle } = req.params;

    const [result] = await pool.query(
      `DELETE FROM salles WHERE IDSalle = ?`,
      [IDSalle]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Salle non trouvée" });
    }

    return res.status(200).json({
      message: "Salle supprimée avec succès"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// 📄 Lister toutes les salles
async function getAll(req, res) {
  try {
    const [result] = await pool.query(`SELECT * FROM salles`);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Erreur serveur: " + error.message
    });
  }
}

// 🔍 Obtenir une salle
async function getOne(req, res) {
  try {
    const { IDSalle } = req.params;

    const [result] = await pool.query(
      `SELECT * FROM salles WHERE IDSalle = ?`,
      [IDSalle]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Salle non trouvée" });
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
