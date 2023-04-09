import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";
import {
    renderInquilinoForm,
    createNewInquilino,
  } from "../controllers/inquilinos.controller.js";

const router = Router();


router.get("/", renderIndex);
router.get("/about", renderAbout);

router.get("/inquilinos/add", renderInquilinoForm);

router.post("/inquilinos/new-inquilino", createNewInquilino);


export default router;
