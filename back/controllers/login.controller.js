// import pool from "../config/db.config.js";

// // ➕ Créer un login
// async function create(req, res) {
//   try {
//     const { NomPrenom, Telephone, Email, Passwd, Img } = req.body;

//     if (!NomPrenom || !Passwd) {
//       return res.status(400).json({
//         error: "NomPrenom et Passwd sont obligatoires"
//       });
//     }

//     const [result] = await pool.query(
//       `INSERT INTO login (NomPrenom, Telephone, Email, Passwd, Img) VALUES (?, ?, ?, ?, ?)`,
//       [NomPrenom, Telephone, Email, Passwd, Img || null]
//     );

//     return res.status(201).json({
//       message: "Login ajouté avec succès",
//       IDLogin: result.insertId
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // ✏️ Modifier un login
// async function updateOne(req, res) {
//   try {
//     const { NomPrenom, Telephone, Email, Passwd, Img } = req.body;
//     const { IDLogin } = req.params;

//     if (!NomPrenom || !Passwd) {
//       return res.status(400).json({ 
//         error: "NomPrenom et Passwd sont obligatoires" 
//       });
//     }

//     const [result] = await pool.query(
//       `UPDATE login SET 
//         NomPrenom = ?, 
//         Telephone = ?, 
//         Email = ?, 
//         Passwd = ?, 
//         Img = ? 
//        WHERE IDLogin = ?`,
//       [NomPrenom, Telephone, Email, Passwd, Img || null, IDLogin]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Login non trouvé" });
//     }

//     return res.status(200).json({
//       message: "Login mis à jour avec succès",
//       IDLogin: IDLogin
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // ❌ Supprimer un login
// async function deleteOne(req, res) {
//   try {
//     const { IDLogin } = req.params;

//     const [result] = await pool.query(
//       `DELETE FROM login WHERE IDLogin = ?`,
//       [IDLogin]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Login non trouvé" });
//     }

//     return res.status(200).json({
//       message: "Login supprimé avec succès"
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // 📄 Lister tous les logins
// async function getAll(req, res) {
//   try {
//     const [result] = await pool.query(`SELECT * FROM login`);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // 🔍 Obtenir un seul login
// async function getOne(req, res) {
//   try {
//     const { IDLogin } = req.params;

//     const [result] = await pool.query(
//       `SELECT * FROM login WHERE IDLogin = ?`,
//       [IDLogin]
//     );

//     if (result.length === 0) {
//       return res.status(404).json({ error: "Login non trouvé" });
//     }

//     return res.status(200).json(result[0]);
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // 🔍 Rechercher un login par email (utile pour l'authentification)
// async function getByEmail(req, res) {
//   try {
//     const { Email } = req.params;

//     const [result] = await pool.query(
//       `SELECT * FROM login WHERE Email = ?`,
//       [Email]
//     );

//     if (result.length === 0) {
//       return res.status(404).json({ error: "Login non trouvé" });
//     }

//     return res.status(200).json(result[0]);
//   } catch (error) {
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// async function authenticate(req, res) {
//   try {
//     const { Email, Passwd } = req.body;

//     if (!Email || !Passwd) {
//       return res.status(400).json({ 
//         error: "Email et mot de passe sont requis",
//         code: "CREDENTIALS_REQUIRED"
//       });
//     }

//     const [result] = await pool.query(
//       `SELECT IDLogin, Email, NomPrenom FROM login WHERE Email = ? AND Passwd = ?`,
//       [Email, Passwd]
//     );

//     if (result.length === 0) {
//       return res.status(401).json({ 
//         error: "Email ou mot de passe incorrect",
//         code: "INVALID_CREDENTIALS"
//       });
//     }

//     // Créer une session
//     req.session.user = {
//       IDLogin: result[0].IDLogin,
//       Email: result[0].Email,
//       NomPrenom: result[0].NomPrenom
//     };
//     req.session.isAuthenticated = true;

//     // Créer un token JWT (optionnel)
//     const token = generateToken(result[0]);

//     return res.status(200).json({
//       message: "Authentification réussie",
//       user: {
//         IDLogin: result[0].IDLogin,
//         Email: result[0].Email,
//         NomPrenom: result[0].NomPrenom
//       },
//       token: token // Optionnel si vous utilisez JWT
//     });
//   } catch (error) {
//     console.error("Erreur d'authentification:", error);
//     return res.status(500).json({ 
//       error: "Erreur serveur lors de l'authentification",
//       code: "SERVER_ERROR"
//     });
//   }
// }

// // Fonction pour générer un token JWT (optionnel)
// function generateToken(user) {
//   const jwt = require('jsonwebtoken');
//   return jwt.sign(
//     { 
//       userId: user.IDLogin,
//       email: user.Email 
//     },
//     process.env.JWT_SECRET || 'votre_secret_jwt',
//     { expiresIn: '24h' }
//   );
// }

// // Vérifier l'authentification
// async function checkAuth(req, res) {
//   try {
//     if (req.session.isAuthenticated && req.session.user) {
//       return res.status(200).json({ 
//         isAuthenticated: true,
//         user: req.session.user 
//       });
//     }
//     return res.status(200).json({ isAuthenticated: false });
//   } catch (error) {
//     console.error("Erreur de vérification d'authentification:", error);
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // Déconnexion
// async function logout(req, res) {
//   try {
//     req.session.destroy(err => {
//       if (err) {
//         console.error("Erreur lors de la destruction de la session:", err);
//         return res.status(500).json({ error: "Erreur lors de la déconnexion" });
//       }
//       return res.status(200).json({ message: "Déconnexion réussie" });
//     });
//   } catch (error) {
//     console.error("Erreur de déconnexion:", error);
//     return res.status(500).json({ error: "Erreur serveur: " + error.message });
//   }
// }

// // 📦 Export des fonctions
// export default {
//   create,
//   updateOne,
//   deleteOne,
//   getAll,
//   getOne,
//   getByEmail,
//   authenticate,
//   checkAuth,
//   logout
// };