import Image from '../models/image.model.js';
import Image2 from '../models/image2.js';
import multer from 'multer';
import path from 'path';
import { spawn } from "child_process";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));

  export const renderIndex = async (req, res) => {
  // res.render("/");
    res.render("index",{  title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  export const renderContact = (req, res) => {
    res.render("contact",{ title: 'Contact'})
  };
  
  
  export const tomarFoto = (req, res) => {
    "use strict";
  
    const scriptPath = path.join(__dirname, "../views/administradores/tomar_foto.py");
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
     res.redirect("/");
    //  res.redirect("/", { imageData });
    });
  };

  export const tomarHuella = (req, res) => {
    "use strict";
  
    const scriptPath = path.join(__dirname, "../views/administradores/tomar_foto.py");
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
     res.redirect("/");
    //  res.redirect("/", { imageData });
    });
  };

  export const tomarVoz = (req, res) => {
    "use strict";
  
    const scriptPath = path.join(__dirname, "../views/administradores/tomar_foto.py");
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
     res.redirect("/");
    //  res.redirect("/", { imageData });
    });
  };
  


  /* ************* Subida de foto  *********** */
/*
  export const uploadFile = async (req,res) => {
    //console.log(req.file);
   // res.send('subidp');
    let errors = [];
    const rostro = req.file;
    console.log('body', req.file)
    console.log('rostro', rostro)
   
   if (!rostro) {
      errors.push({ text: "Por favor ingresa la iamgen" });
    }
        // Saving a Imagen
        const newImage = new Image({ 
          filename : req.file.filename,
          path : '/uploads/' + req.file.filename,
          originalname : req.file.originalname,
          date : req.file.date,
          size : req.file.size,
          rostro:{
          data:req.file.filename,
          contentType: 'image/png'}
          
        })
        console.log('new',newImage);
        await newImage.save();
        req.flash("success_msg", "La subdia ha sido un éxito.");
        res.redirect('/');      
      };
      */
// subir varias imagenes
//index cntroller
/*  export const uploadFiles = async (req,res) => {

    let errors = [];
    const rostro = req.files;
    console.log('body', req.files)
    console.log('rostro', rostro)
    console.log('son ',rostro.length)
   
   if (!rostro) {
      errors.push({ text: "Por favor ingresa al menos 2 iamgenes" });
    }
 
        // Saving some Imagen
        for(var i of req.files ){
          const newImage = new Image({ 
             filename : i.filename,
             path : '/uploads/' + i.filename,
             originalname : i.originalname,
             date : i.date,
             size : i.size,
             rostro:{
             data:i.filename,
             contentType: 'image/png'},
             
           })
           console.log('object',newImage.originalname)
           console.log('new',newImage);
           await newImage.save();
         }
           //res.send('subidp');
           req.flash("success_msg", "La subdia ha sido un éxito.");
           res.redirect('/');
         };
       */
//en routes router.post("/uploads" /*, controleradmin.upload*/ ,uploadFiles)

  
    /******** Buscador prueba ************* */
  /*
  export const buscador = async (req,res) => {
    
    console.log('query -> ',req.query)
    console.log('query.buscar -> ',req.query.buscar)
    if(req.query.buscar){
      console.log("buscar ", req.query.buscar)
      const inquilinosFound = await Inquilino.find({nombre:{ $eq: req.query.buscar}})
      .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("index",{ inquilinosFound })
    }
    else{
      console.log("no hay parametro")
      res.render("index")
    }
  };*/

  //router.get('/',(req,res))
  
  