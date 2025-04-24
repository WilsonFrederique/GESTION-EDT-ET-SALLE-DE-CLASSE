import pool from "../config/db.config.js";

// ➕ Créer un niveau
async function create(req, res) {
  try {
    const { IDNiveaux, Niveaux } = req.body;

    if (!IDNiveaux || !Niveaux) {
      return res.status(400).json({
        error: "IDNiveaux et Niveaux sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO niveaux (IDNiveaux, Niveaux) VALUES (?, ?)`,
      [IDNiveaux, Niveaux]
    );

    return res.status(201).json({
      message: "Niveau ajouté avec succès",
      IDNiveaux: IDNiveaux
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// ✏️ Modifier un niveau
async function updateOne(req, res) {
  try {
    const { IDNiveaux } = req.params;
    const { Niveaux } = req.body;

    // Validation de l'entrée
    if (!IDNiveaux) {
      return res.status(400).json({ error: "L'identifiant du niveau est requis dans l'URL." });
    }

    if (!Niveaux || Niveaux.trim() === "") {
      return res.status(400).json({ error: "Le champ Niveaux est obligatoire." });
    }

    // Requête de mise à jour
    const [result] = await pool.query(
      "UPDATE niveaux SET Niveaux = ? WHERE IDNiveaux = ?",
      [Niveaux, IDNiveaux]
    );

    // Vérifier si le niveau existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Aucun niveau trouvé avec l'identifiant ${IDNiveaux}` });
    }

    // Succès
    return res.status(200).json({
      message: `Le niveau avec l'ID ${IDNiveaux} a été mis à jour avec succès.`,
      IDNiveaux,
      nouveauNiveau: Niveaux
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur : " + error.message });
  }
}


// ❌ Supprimer un niveau
async function deleteOne(req, res) {
  try {
    const { IDNiveaux } = req.params;

    const [result] = await pool.query(
      `DELETE FROM niveaux WHERE IDNiveaux = ?`,
      [IDNiveaux]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Niveau non trouvé" });
    }

    return res.status(200).json({
      message: "Niveau supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// 📄 Lister tous les niveaux
async function getAll(req, res) {
  try {
    const [result] = await pool.query(`SELECT * FROM niveaux`);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

// 🔍 Obtenir un seul niveau
async function getOne(req, res) {
  try {
    const { IDNiveaux } = req.params;

    const [result] = await pool.query(
      `SELECT * FROM niveaux WHERE IDNiveaux = ?`,
      [IDNiveaux]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Niveau non trouvé" });
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
