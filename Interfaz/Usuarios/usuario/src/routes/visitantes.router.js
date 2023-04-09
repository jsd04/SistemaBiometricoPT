import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";
import {
    renderVisitanteForm,
    createNewVisitante,
  } from "../controllers/visitantes.controller.js";

const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);

router.get("/visitantes/add", renderVisitanteForm);

router.post("/visitantes/new-visitante", createNewVisitante);


export default router;
