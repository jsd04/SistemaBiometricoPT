import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import { renderContacts  } from "../controllers/inquilinos.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);
//router.get("/note/add", notesCtrl);
router.get("/inquilino/adds",renderContacts );

export default router;
