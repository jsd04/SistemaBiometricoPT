import { Router } from "express";
import { renderIndex, renderAbout, tomarFoto, ingresar, registrar} from "../controllers/index.controller.js";


const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);//s

router.get("/foto",tomarFoto);
router.get("/ingresar", ingresar)
router.get("/registrar",registrar);


export default router;

