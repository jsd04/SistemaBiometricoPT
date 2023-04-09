import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";
import {
    renderTrabajadorForm,
    createNewTrabajador,
  } from "../controllers/trabajadores.controller.js";

const router = Router();


router.get("/", renderIndex);
router.get("/about", renderAbout);

router.get("/trabajadores/add", renderTrabajadorForm);

router.post("/trabajadores/new-trabajador", createNewTrabajador);


export default router;
