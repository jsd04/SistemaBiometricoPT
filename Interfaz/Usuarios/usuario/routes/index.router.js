import { Router } from "express";
import { renderIndex, renderAbout, renderContact, tomarFoto } from "../controllers/index.controller.js";

import { takeFoto} from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);//
router.get("/contact", renderContact);
//router.get("/",buscador);

 
router.get("/tomarFoto",tomarFoto);
//router.post("/tomarFoto",takeFoto);

export default router;

