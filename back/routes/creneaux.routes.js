import express from "express";

import creneauxController from "../controllers/creneaux.controller.js";

const router = express.Router();

router.get("/creneaux/", creneauxController.getAll);
router.get("/creneaux/:IDCreneaux", creneauxController.getOne);
router.post("/creneaux/", creneauxController.create);
router.put("/creneaux/:IDCreneaux", creneauxController.updateOne);
router.delete("/creneaux/:IDCreneaux", creneauxController.deleteOne);

export default router;