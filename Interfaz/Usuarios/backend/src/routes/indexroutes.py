from flask import Blueprint, render_template
from controllers.indexcontroller import renderAbout, renderIndex
#from "../controllers/indexcontroller.py" import  renderAbout, renderContact, renderIndex 
#from controllers.indexcontroller import renderAbout, renderIndex
indexRoutes = Blueprint("indexRoutes", __name__, template_folder="templates")
@indexRoutes.route("/", methods=['GET'])
def index():
    return renderIndex() 
@indexRoutes.route("/about", methods=['GET'])
def about():
    return renderAbout() 
 


'''
import { Router } from "express";
import { renderAbout, renderContact } from "../controllers/index.controller.js";
//import { uploadFiles } from "../controllers/index.controller.js";
//import { buscador } from "../controllers/index.controller.js";
const router = Router();

//router.get("/", renderIndex);
router.get("/about", renderAbout);//
router.get("/contact", renderContact);

//router.get("/",buscador);

/* ************* Subida de foto  *********** */
 
/*router.post("/upload" ,uploadFile)
router.post("/uploads" ,uploadFiles)*/


export default router;
'''