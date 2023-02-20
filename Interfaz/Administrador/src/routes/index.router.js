import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
//import { buscador } from "../controllers/index.controller.js";
const router = Router();

//router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

//router.get("/",buscador);

export default router;
