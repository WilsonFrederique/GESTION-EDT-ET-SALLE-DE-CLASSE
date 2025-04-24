import pool from "../config/db.config.js";

async function create(req, res) {
    try {
        const { 
            cinEns, Nom, Prenom, Sexe, Grade, Adresse, Telephone, Email, Specialite, Descriptions, Img 
        } = req.body;
    
        // Vérification de champs requis
        if (!cinEns || !Prenom) {
            return res.status(400).json({
            error: "cinEns, Prenom sont obligatoires"
            });
        }
    
        const [result] = await pool.query(
            `INSERT INTO enseignants 
            (cinEns, Nom, Prenom, Sexe, Grade, Adresse, Telephone, Email, Specialite, Descriptions, Img)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ cinEns, Nom, Prenom, Sexe, Grade, Adresse, Telephone, Email, Specialite, Descriptions, Img ]
        );
  
      return res.status(201).json({
        message: "Enseignant ajouté avec succès",
        cinEns: cinEns
      });
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur: " + error.message });
    }
}  

async function updateOne(req, res) {
    try {
        const {
            Nom, Prenom, Sexe, Grade, Adresse, Telephone, Email, Specialite, Descriptions, Img
        } = req.body;
    
        const { cinEns } = req.params;
    
        if (!Prenom) {
            return res.status(400).json({ error: "Prenom est obligatoire" });
        }
    
        const [result] = await pool.query(
            `UPDATE enseignants SET 
            Nom = ?, Prenom = ?, Sexe = ?, Grade = ?, Adresse = ?, 
            Telephone = ?, Email = ?, Specialite = ?, Descriptions = ?, Img = ?
            WHERE cinEns = ?`,
            [ Nom, Prenom, Sexe, Grade, Adresse, Telephone, Email, Specialite, Descriptions, Img, cinEns ]
        );
    
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Enseignant non trouvé" });
        }
    
        return res.status(200).json({
            message: "Enseignant modifié avec succès",
            cinEns: cinEns
        });
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur: " + error.message });
    }
}  

async function deleteOne(req, res) {
    try {
        const { cinEns } = req.params;

        const [result] = await pool.query(
        "DELETE FROM enseignants WHERE cinEns = ?",
        [cinEns]
        );

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Enseignant non trouvé" });
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
      const [result] = await pool.query("SELECT * FROM enseignants");
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur: " + error.message });
    }
}

async function getOne(req, res) {
    try {
      const { cinEns } = req.params;
      const [result] = await pool.query(
        "SELECT * FROM enseignants WHERE cinEns = ?",
        [cinEns]
      );
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Enseignant non trouvé" });
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