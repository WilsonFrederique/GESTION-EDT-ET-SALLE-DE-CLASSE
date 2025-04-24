import pool from "../config/db.config.js";

async function create(req, res) {
  try {
    const {
      IDSalle, IDNiveaux, IDParcours, 
      IDCreneaux, IDMatiere, cinEns,
    } = req.body;

    // Vérification des champs requis
    if (!IDSalle || !IDNiveaux || !IDParcours || !IDCreneaux || !IDMatiere || !cinEns) {
      return res.status(400).json({
        error: "Tous les champs sont obligatoires"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO edts 
      (IDSalle, IDNiveaux, IDParcours, IDCreneaux, IDMatiere, cinEns)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [IDSalle, IDNiveaux, IDParcours, IDCreneaux, IDMatiere, cinEns]
    );

    return res.status(201).json({
      message: "EDT ajouté avec succès",
      IDEdt: result.insertId
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function updateOne(req, res) {
  try {
    const {
      IDSalle, IDNiveaux, IDParcours,
      IDCreneaux, IDMatiere, cinEns,
    } = req.body;

    const { IDEdt } = req.params;

    const [result] = await pool.query(
      `UPDATE edts SET 
      IDSalle = ?, IDNiveaux = ?, IDParcours = ?, 
      IDCreneaux = ?, IDMatiere = ?, cinEns = ?
      WHERE IDEdt = ?`,
      [IDSalle, IDNiveaux, IDParcours, IDCreneaux, IDMatiere, cinEns, IDEdt]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enregistrement non trouvé" });
    }

    return res.status(200).json({
      message: "EDT modifié avec succès",
      IDEdt: IDEdt
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const { IDEdt } = req.params;

    const [result] = await pool.query(
      "DELETE FROM edts WHERE IDEdt = ?",
      [IDEdt]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enregistrement non trouvé" });
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
    const [result] = await pool.query("SELECT * FROM edts");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function getOne(req, res) {
  try {
    const { IDEdt } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM edts WHERE IDEdt = ?",
      [IDEdt]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Enregistrement non trouvé" });
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
