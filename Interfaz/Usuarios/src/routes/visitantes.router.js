import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import { renderContacts  } from "../controllers/visitantes.controller.js";
import {
    renderVisitanteForm,
    createNewVisitante,
    renderVisitantes,
    renderEditForm,
    updateVisitante,
    deleteVisitante,
  } from "../controllers/visitantes.controller.js";
  
const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);
//router.get("/note/add", notesCtrl);
router.get("/visitante/adds",renderContacts );
// New Note
router.get("/visitantes/add", renderVisitanteForm);

router.post("/visitantes/new-visitante", createNewVisitante);

// Get All Notes
router.get("/visitantes", renderVisitantes);

// Edit Notes
router.get("/visitantes/edit/:id", renderEditForm);

router.put("/visitantes/edit-visitante/:id", updateVisitante);

// Delete Notes
router.delete("/visitantes/delete/:id", deleteVisitante);
export default router;
