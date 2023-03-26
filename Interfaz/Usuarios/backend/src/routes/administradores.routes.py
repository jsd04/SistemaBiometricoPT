
from flask import Blueprint, render_template
from controllers.administradores.controllers import {renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
  renderAuth,
  renderMyAuth,
  renderAuthIni,
  renderEditForm,
  updateAdmin}
from helpers.administradores import isAuthenticated
#from "../controllers/indexcontroller.py" import  renderAbout, renderContact, renderIndex 
#from controllers.indexcontroller import renderAbout, renderIndex
adminRoutes = Blueprint("adminRoutes", __name__, template_folder="templates")

# Routes
@adminRoutes.route("/administradores/signup", methods=['GET'])
#router.get("/administradores/signup",  renderSignUpForm);
def renderSignUpForm():
    return renderSignUpForm() 

@adminRoutes.route("//administradores/signup", methods=['POST'])
#router.post("/administradores/signup", signup);
def signup():
    return signup() 

@adminRoutes.route('/administradores/signin', methods=['GET'])
#router.get("/administradores/signin", renderSigninForm);
def renderSigninForm():
    return renderSigninForm()

@adminRoutes.route('/administradores/signin', methods=['POST'])
#router.post("/administradores/signin", signin);
def signin():
     return signin()

@adminRoutes.route('/administradores/logout', methods=['GET'])
#router.get("/administradores/logout",  logout);
def logout():
    return logout()

@adminRoutes.route('/administradores/administradores', methods=['GET'])
#router.get("/administradores/administradores", renderAuth);
def renderAuth():
    return renderAuth()

@adminRoutes.route('/administradores/perfil', methods=['GET'])
#router.get("/administradores/perfil",isAuthenticated,  renderMyAuth);
def renderMyAuth():
    return renderMyAuth()

@adminRoutes.route('/administradores/principal', methods=['GET'])
#router.get("/administradores/principal",isAuthenticated, renderAuthIni);
def renderAuthIni():
    return renderAuthIni()

@adminRoutes.route('/administradores/edit/<int:id>', methods=['GET'])
#router.get("/administradores/edit/:id", renderEditForm);
def renderEditForm(id):
   return renderEditForm()

@adminRoutes.route('/administradores/edit-admin/<int:id>', methods=['PUT'])
#router.put("/administradores/edit-admin/:id", updateAdmin);
def updateAdmin(id):
    return updateAdmin()

