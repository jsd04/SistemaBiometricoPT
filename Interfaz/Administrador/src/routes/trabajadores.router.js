import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import { renderContacts  } from "../controllers/trabajadores.controller.js";
import {
    renderTrabajadorForm,
    createNewTrabajador,
    renderTrabajadores,
    renderEditForm,
    updateTrabajador,
    deleteTrabajador,
  } from "../controllers/trabajadores.controller.js";
  
const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);
//router.get("/note/add", notesCtrl);
router.get("/trabajador/adds",renderContacts );
// New Note
router.get("/trabajadores/add", renderTrabajadorForm);

router.post("/trabajadores/new-trabajador", createNewTrabajador);

// Get All Notes
router.get("/trabajadores", renderTrabajadores);

// Edit Notes
router.get("/trabajadores/edit/:id", renderEditForm);

router.put("/trabajadores/edit-trabajador/:id", updateTrabajador);

// Delete Notes
router.delete("/trabajadores/delete/:id", deleteTrabajador);
export default router;
