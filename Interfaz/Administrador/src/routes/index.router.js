import { Router } from "express";
import { uploadFile, renderAbout, renderContact } from "../controllers/index.controller.js";
//import { buscador } from "../controllers/index.controller.js";
const router = Router();

//router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

//router.get("/",buscador);

/* ************* Subida de foto  *********** */
 
router.post("/" /*, controleradmin.upload*/ ,uploadFile)


export default router;
