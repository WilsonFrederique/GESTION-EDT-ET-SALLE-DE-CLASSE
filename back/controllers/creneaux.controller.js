import pool from "../config/db.config.js";

// ➕ Créer un créneau
async function create(req, res) {
  try {
    const { Jours, HeureDebut, HeureFin, DateDebut, DateFin } = req.body;

    if (!Jours || !HeureDebut || !HeureFin || !DateDebut || !DateFin) {
      return res.status(400).json({
        error: "Tous les champs sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO creneaux (Jours, HeureDebut, HeureFin, DateDebut, DateFin) VALUES (?, ?, ?, ?, ?)`,
      [Jours, HeureDebut, HeureFin, DateDebut, DateFin]
    );

    return res.status(201).json({
      message: "Créneau ajouté avec succès",
      IDCreneaux: result.insertId
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// ✏️ Modifier un créneau
async function updateOne(req, res) {
  try {
    const { Jours, HeureDebut, HeureFin, DateDebut, DateFin } = req.body;
    const { IDCreneaux } = req.params;

    const [result] = await pool.query(
      `UPDATE creneaux SET Jours = ?, HeureDebut = ?, HeureFin = ?, DateDebut = ?, DateFin = ? WHERE IDCreneaux = ?`,
      [Jours, HeureDebut, HeureFin, DateDebut, DateFin, IDCreneaux]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    return res.status(200).json({
      message: "Créneau mis à jour avec succès",
      IDCreneaux: IDCreneaux
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// ❌ Supprimer un créneau
async function deleteOne(req, res) {
  try {
    const { IDCreneaux } = req.params;

    const [result] = await pool.query(
      `DELETE FROM creneaux WHERE IDCreneaux = ?`,
      [IDCreneaux]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    return res.status(200).json({
      message: "Créneau supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// 📄 Lister tous les créneaux
async function getAll(req, res) {
  try {
    const [result] = await pool.query(`SELECT * FROM creneaux`);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// Dans creneaux.controller.js, modifiez la fonction getOne :
async function getOne(req, res) {
  try {
    const { IDCreneaux } = req.params;

    const [result] = await pool.query(
      `SELECT * FROM creneaux WHERE IDCreneaux = ?`,
      [IDCreneaux]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    // Retourner les dates telles quelles sans conversion
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
