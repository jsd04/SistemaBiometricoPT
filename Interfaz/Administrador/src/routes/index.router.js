import { Router } from "express";
import { renderIndex, renderAbout, renderContact, tomarFoto } from "../controllers/index.controller.js";
import { tomarHuella, tomarVoz } from "../controllers/index.controller.js";
//import { buscador } from "../controllers/index.controller.js";
//import { takeFoto} from "../controllers/index.controller.js";
const router = Router();

router.get("/index", renderIndex);
router.get("/about", renderAbout);//
router.get("/contact", renderContact);
//router.get("/",buscador);

/* ************* Subida de foto  *********** */
 
/*router.post("/upload" ,uploadFile)
router.post("/uploads" ,uploadFiles)*/
router.get("/tomarFoto",tomarFoto);
router.get("/tomarHuella",tomarHuella);
router.get("/tomarVoz",tomarVoz);

export default router;

