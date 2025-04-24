import pool from "../config/db.config.js";

// ➕ Créer un parcours
async function create(req, res) {
  try {
    const { IDParcours, Parcours } = req.body;

    if (!IDParcours || !Parcours) {
      return res.status(400).json({
        error: "IDParcours et Parcours sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO parcours (IDParcours, Parcours) VALUES (?, ?)`,
      [IDParcours, Parcours]
    );

    return res.status(201).json({
      message: "Parcours ajouté avec succès",
      IDParcours: IDParcours
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// ✏️ Modifier un parcours
async function updateOne(req, res) {
  try {
    const { Parcours } = req.body;
    const { IDParcours } = req.params;

    if (!Parcours) {
      return res.status(400).json({ error: "Le champ Parcours est obligatoire" });
    }

    const [result] = await pool.query(
      `UPDATE parcours SET Parcours = ? WHERE IDParcours = ?`,
      [Parcours, IDParcours]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Parcours non trouvé" });
    }

    return res.status(200).json({
      message: "Parcours mis à jour avec succès",
      IDParcours: IDParcours
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// ❌ Supprimer un parcours
async function deleteOne(req, res) {
  try {
    const { IDParcours } = req.params;

    const [result] = await pool.query(
      `DELETE FROM parcours WHERE IDParcours = ?`,
      [IDParcours]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Parcours non trouvé" });
    }

    return res.status(200).json({
      message: "Parcours supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// 📄 Lister tous les parcours
async function getAll(req, res) {
  try {
    const [result] = await pool.query(`SELECT * FROM parcours`);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// 🔍 Obtenir un seul parcours
async function getOne(req, res) {
  try {
    const { IDParcours } = req.params;

    const [result] = await pool.query(
      `SELECT * FROM parcours WHERE IDParcours = ?`,
      [IDParcours]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Parcours non trouvé" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
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