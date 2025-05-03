import pool from "./db.config.js";

async function insertDefaultAdmin() {
  try {
    // Vérifier si l'admin existe déjà
    const [existingAdmin] = await pool.query(
      "SELECT * FROM login WHERE NomPrenom = 'Admin' AND Email = 'admin@admin.com'"
    );

    if (existingAdmin.length > 0) {
      console.log("L'utilisateur Admin existe déjà.");
      return;
    }

    // Insérer l'admin par défaut
    const [result] = await pool.query(
      `INSERT INTO login (NomPrenom, Telephone, Email, Passwd, Img) 
       VALUES (?, ?, ?, ?, ?)`,
      ["Admin", "0000000000", "admin@admin.com", "Admin", null]
    );

    console.log("Utilisateur Admin créé avec succès. ID:", result.insertId);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error.message);
  } finally {
    await pool.end();
  }
}

insertDefaultAdmin();