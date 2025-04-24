import express from "express";

import sallesController from "../controllers/salles.controller.js";

const router = express.Router();

router.get("/salles/", sallesController.getAll);
router.get("/salles/:IDSalle", sallesController.getOne);
router.post("/salles/", sallesController.create);
router.put("/salles/:IDSalle", sallesController.updateOne);
router.delete("/salles/:IDSalle", sallesController.deleteOne);

export default router;