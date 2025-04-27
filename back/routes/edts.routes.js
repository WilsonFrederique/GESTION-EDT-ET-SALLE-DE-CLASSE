import express from "express";

import edtsController from "../controllers/edts.controller.js";

const router = express.Router();

router.get("/edts/", edtsController.getAll);
router.get("/edts/latest", edtsController.getAllWithLatestDates);
router.get("/edts/:IDEdt", edtsController.getOne);
router.post("/edts/", edtsController.create);
router.put("/edts/:IDEdt", edtsController.updateOne);
router.delete("/edts/:IDEdt", edtsController.deleteOne);

export default router;