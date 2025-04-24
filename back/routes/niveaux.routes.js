import express from "express";

import niveauxController from "../controllers/niveaux.controller.js";

const router = express.Router();

router.get("/niveaux/", niveauxController.getAll);
router.get("/niveaux/:IDNiveaux", niveauxController.getOne);
router.post("/niveaux/", niveauxController.create);
router.put("/niveaux/:IDNiveaux", niveauxController.updateOne);
router.delete("/niveaux/:IDNiveaux", niveauxController.deleteOne);

export default router;