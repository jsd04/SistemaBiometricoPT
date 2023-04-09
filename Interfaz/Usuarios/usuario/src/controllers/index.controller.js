import { spawn } from "child_process";
import path from 'path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

  export const renderIndex = async (req, res) => {
    res.render("index",{  title: 'USUARIO'})
    //buenofinal es index3
  };
  
  export const renderAbout = async (req, res) => {
    res.render("about",{ title: 'About me'})
   /* const admin = await Administrador.find({ admin: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("administradores", { admin});*/
  };

  export const ingresar = (req, res) => {
   res.render("ingresar")
  };

  export const registrar = (req, res) => {
    res.render("registrar")
  };



  export const tomarFoto = (req, res) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const scriptPath = path.join(__dirname, "RecorteAlma2.py");

    const pythonProcess = spawn("python", [scriptPath]);
    let imageData = "";

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      imageData += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    
   // res.redirect("/");
    //  res.redirect("/", { imageData });
    });
};   