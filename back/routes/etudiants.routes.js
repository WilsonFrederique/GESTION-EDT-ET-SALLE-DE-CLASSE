import express from "express";

import etudiantsController from "../controllers/etudiants.controller.js";

const router = express.Router();

router.get("/etudiants/", etudiantsController.getAll);
router.get("/etudiants/:Matricule", etudiantsController.getOne);
router.post("/etudiants/", etudiantsController.create);
router.put("/etudiants/:Matricule", etudiantsController.updateOne);
router.delete("/etudiants/:Matricule", etudiantsController.deleteOne);

export default router;