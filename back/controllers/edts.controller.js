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

    // Récupérer les infos du créneau
    const [creneauInfo] = await pool.query(
      `SELECT Jours, HeureDebut, DateDebut FROM creneaux WHERE IDCreneaux = ?`,
      [IDCreneaux]
    );

    if (creneauInfo.length === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    const { Jours, HeureDebut, DateDebut } = creneauInfo[0];

    // Vérifier si le niveau/parcours a déjà un cours au même créneau horaire (peu importe la salle)
    const [niveauParcoursConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, ens.Nom, ens.Prenom, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN enseignants ens ON e.cinEns = ens.cinEns
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.IDNiveaux = ? AND e.IDParcours = ?
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?`,
      [IDNiveaux, IDParcours, Jours, HeureDebut, DateDebut]
    );

    if (niveauParcoursConflict.length > 0) {
      const conflict = niveauParcoursConflict[0];
      return res.status(409).json({
        error: "Conflit de niveau/parcours",
        message: `Ce créneau est déjà occupé pour ce niveau et parcours (même jour, heure et date)`,
        details: {
          jour: conflict.Jours,
          heure: conflict.HeureDebut,
          date: conflict.DateDebut,
          salle: conflict.Salle,
          matiere: conflict.Matiere,
          enseignant: `${conflict.Nom} ${conflict.Prenom}`
        }
      });
    }

    // Vérifier si l'enseignant est déjà occupé pour le même créneau horaire (peu importe la salle)
    const [teacherConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.cinEns = ? 
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?`,
      [cinEns, Jours, HeureDebut, DateDebut]
    );

    if (teacherConflict.length > 0) {
      const conflict = teacherConflict[0];
      return res.status(409).json({
        error: "Conflit d'enseignant",
        message: `L'enseignant est déjà occupé pour ce créneau horaire (même jour, heure et date)`,
        details: {
          jour: conflict.Jours,
          heure: conflict.HeureDebut,
          date: conflict.DateDebut,
          salle: conflict.Salle,
          matiere: conflict.Matiere,
          niveau: conflict.IDNiveaux,
          parcours: conflict.IDParcours
        }
      });
    }

    // Si pas de conflit, créer l'EDT
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


async function checkAvailability(req, res) {
  try {
    const { IDSalle, IDCreneaux, cinEns, excludeEdtId } = req.body;

    // Récupérer les infos du créneau
    const [creneauInfo] = await pool.query(
      `SELECT Jours, HeureDebut, DateDebut FROM creneaux WHERE IDCreneaux = ?`,
      [IDCreneaux]
    );

    if (creneauInfo.length === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    const { Jours, HeureDebut, DateDebut } = creneauInfo[0];

    // Vérifier conflit enseignant (même créneau horaire, peu importe la salle)
    const [teacherConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.cinEns = ? 
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?
       ${excludeEdtId ? 'AND e.IDEdt != ?' : ''}`,
      excludeEdtId ? [cinEns, Jours, HeureDebut, DateDebut, excludeEdtId] 
                   : [cinEns, Jours, HeureDebut, DateDebut]
    );

    // Vérifier conflit niveau/parcours (même créneau horaire, peu importe la salle)
    const [niveauParcoursConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, ens.Nom, ens.Prenom, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN enseignants ens ON e.cinEns = ens.cinEns
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.IDSalle = ? 
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?
       ${excludeEdtId ? 'AND e.IDEdt != ?' : ''}`,
      excludeEdtId ? [IDSalle, Jours, HeureDebut, DateDebut, excludeEdtId] 
                   : [IDSalle, Jours, HeureDebut, DateDebut]
    );

    return res.status(200).json({
      isTeacherAvailable: teacherConflict.length === 0,
      isNiveauParcoursAvailable: niveauParcoursConflict.length === 0,
      teacherConflictDetails: teacherConflict.length > 0 ? {
        matiere: teacherConflict[0].Matiere,
        salle: teacherConflict[0].Salle,
        date: teacherConflict[0].DateDebut,
        niveau: teacherConflict[0].IDNiveaux,
        parcours: teacherConflict[0].IDParcours
      } : null,
      niveauParcoursConflictDetails: niveauParcoursConflict.length > 0 ? {
        matiere: niveauParcoursConflict[0].Matiere,
        enseignant: `${niveauParcoursConflict[0].Nom} ${niveauParcoursConflict[0].Prenom}`,
        date: niveauParcoursConflict[0].DateDebut,
        salle: niveauParcoursConflict[0].Salle
      } : null
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

    // Récupérer les infos du créneau
    const [creneauInfo] = await pool.query(
      `SELECT Jours, HeureDebut, DateDebut FROM creneaux WHERE IDCreneaux = ?`,
      [IDCreneaux]
    );

    if (creneauInfo.length === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    const { Jours, HeureDebut, DateDebut } = creneauInfo[0];

    // Vérifier si l'enseignant est déjà occupé pour le même créneau (même jour, heure et date)
    // Peu importe la salle - conflit si même créneau horaire
    const [teacherConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.cinEns = ? 
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?
       AND e.IDEdt != ?`,
      [cinEns, Jours, HeureDebut, DateDebut, IDEdt]
    );

    if (teacherConflict.length > 0) {
      const conflict = teacherConflict[0];
      return res.status(409).json({
        error: "Conflit d'enseignant",
        message: `L'enseignant est déjà occupé pour ce créneau horaire (même jour, heure et date)`,
        details: {
          jour: conflict.Jours,
          heure: conflict.HeureDebut,
          date: conflict.DateDebut,
          salle: conflict.Salle,
          matiere: conflict.Matiere,
          niveau: conflict.IDNiveaux,
          parcours: conflict.IDParcours
        }
      });
    }

    // Vérifier si le créneau est déjà occupé pour le même niveau et parcours
    // Peu importe la salle - conflit si même créneau horaire avec même niveau/parcours
    const [niveauParcoursConflict] = await pool.query(
      `SELECT e.*, c.Jours, c.HeureDebut, c.DateDebut, 
              m.Matiere, ens.Nom, ens.Prenom, s.Salle
       FROM edts e
       JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
       JOIN matieres m ON e.IDMatiere = m.IDMatiere
       JOIN enseignants ens ON e.cinEns = ens.cinEns
       JOIN salles s ON e.IDSalle = s.IDSalle
       WHERE e.IDNiveaux = ? AND e.IDParcours = ?
       AND c.Jours = ? AND c.HeureDebut = ? AND c.DateDebut = ?
       AND e.IDEdt != ?`,
      [IDNiveaux, IDParcours, Jours, HeureDebut, DateDebut, IDEdt]
    );

    if (niveauParcoursConflict.length > 0) {
      const conflict = niveauParcoursConflict[0];
      return res.status(409).json({
        error: "Conflit de niveau/parcours",
        message: `Ce créneau est déjà occupé pour ce niveau et parcours (même jour, heure et date)`,
        details: {
          jour: conflict.Jours,
          heure: conflict.HeureDebut,
          date: conflict.DateDebut,
          salle: conflict.Salle,
          matiere: conflict.Matiere,
          enseignant: `${conflict.Nom} ${conflict.Prenom}`,
          niveau: conflict.IDNiveaux,
          parcours: conflict.IDParcours
        }
      });
    }

    // Si pas de conflit, mettre à jour l'EDT
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

async function getAllWithLatestDates(req, res) {
  try {
    const query = `
      SELECT e.IDNiveaux, e.*
      FROM edts e
      JOIN creneaux c ON e.IDCreneaux = c.IDCreneaux
      WHERE (c.DateDebut, c.DateFin) = (
          SELECT DateDebut, DateFin
          FROM creneaux
          WHERE IDCreneaux IN (
              SELECT IDCreneaux
              FROM edts
              WHERE IDNiveaux = e.IDNiveaux
          )
          ORDER BY DateDebut DESC, DateFin DESC
          LIMIT 1
      )
      AND e.IDNiveaux IN (
          SELECT IDNiveaux FROM niveaux
      )
      ORDER BY e.IDNiveaux;
    `;
    
    const [result] = await pool.query(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

export default {
  create,
  checkAvailability,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  getAllWithLatestDates,
};