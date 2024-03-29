import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
  renderAuth,
  renderMyAuth,
  renderAuthIni,
  renderEditForm,
  updateAdmin,
} from "../controllers/administradores.controllers.js";
import {isAuthenticated} from "../helpers/administradores.js";
const router = Router();

// Routes
router.get("/administradores/signup",  renderSignUpForm);

router.post("/administradores/signup", signup);

router.get("/administradores/signin", renderSigninForm);

router.post("/administradores/signin", signin);

router.get("/administradores/logout",  logout);

router.get("/administradores/administradores", renderAuth);

router.get("/administradores/perfil",isAuthenticated,  renderMyAuth);

router.get("/administradores/principal",isAuthenticated, renderAuthIni);
// Edit 
router.get("/administradores/edit/:id", renderEditForm);

router.put("/administradores/edit-admin/:id", updateAdmin);

export default router;
