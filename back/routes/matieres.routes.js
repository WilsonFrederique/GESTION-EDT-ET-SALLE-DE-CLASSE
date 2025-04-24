import express from "express";

import matieresController from "../controllers/matieres.controller.js";

const router = express.Router();

router.get("/matieres/", matieresController.getAll);
router.get("/matieres/:IDMatiere", matieresController.getOne);
router.post("/matieres/", matieresController.create);
router.put("/matieres/:IDMatiere", matieresController.updateOne);
router.delete("/matieres/:IDMatiere", matieresController.deleteOne);

export default router;