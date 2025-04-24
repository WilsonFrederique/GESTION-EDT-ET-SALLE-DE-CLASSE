import express from "express";

import enseignantsController from "../controllers/enseignants.controller.js";

const router = express.Router();

router.get("/enseignants/", enseignantsController.getAll);
router.get("/enseignants/:cinEns", enseignantsController.getOne);
router.post("/enseignants/", enseignantsController.create);
router.put("/enseignants/:cinEns", enseignantsController.updateOne);
router.delete("/enseignants/:cinEns", enseignantsController.deleteOne);

export default router;