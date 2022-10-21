import { Router } from "express";
import { renderIndex, renderAbout, renderContact } from "../controllers/index.controller.js";
import { renderContacts  } from "../controllers/inquilinos.controller.js";
import {
    renderInquilinoForm,
    createNewInquilino,
    renderInquilinos,
    renderEditForm,
    updateInquilino,
    deleteInquilino,
  } from "../controllers/inquilinos.controller.js";
  
const router = Router();



router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/contact", renderContact);
//router.get("/note/add", notesCtrl);
router.get("/inquilino/adds",renderContacts );
// New Note
router.get("/inquilinos/add", renderInquilinoForm);

router.post("/inquilinos/new-inquilino", createNewInquilino);

// Get All Notes
router.get("/inquilinos", renderInquilinos);

// Edit Notes
router.get("/inquilinos/edit/:id", renderEditForm);

router.put("/inquilinos/edit-inquilino/:id", updateInquilino);

// Delete Notes
router.delete("/inquilinos/delete/:id", deleteInquilino);
export default router;
