import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import enseignantsRoutes from "./routes/ensignants.routes.js";
import niveauxRoutes from "./routes/niveaux.routes.js";
import parcoursRoutes from "./routes/parcours.routes.js";
import etudiantsRoutes from "./routes/etudiants.routes.js";
import creneauxRoutes from "./routes/creneaux.routes.js";
import sallesRoutes from "./routes/salles.routes.js";
import matieresRoutes from "./routes/matieres.routes.js";
import edtsRoutes from "./routes/edts.routes.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

app.use(express.json());

// Monte chaque routeur sur un préfixe clair
app.use("/api", enseignantsRoutes);
app.use("/api", niveauxRoutes);
app.use("/api", parcoursRoutes);
app.use("/api", etudiantsRoutes);
app.use("/api", creneauxRoutes);
app.use("/api", sallesRoutes);
app.use("/api", matieresRoutes);
app.use("/api", edtsRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
