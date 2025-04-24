import express from "express";

import parcoursController from "../controllers/parcours.controller.js";

const router = express.Router();

router.get("/parcours/", parcoursController.getAll);
router.get("/parcours/:IDParcours", parcoursController.getOne);
router.post("/parcours/", parcoursController.create);
router.put("/parcours/:IDParcours", parcoursController.updateOne);
router.delete("/parcours/:IDParcours", parcoursController.deleteOne);

export default router;