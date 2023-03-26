import Image from '../models/image.model.js';
import Image2 from '../models/image2.js';
import multer from 'multer';
import path from 'path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));

export const renderIndex = async (req, res) => {
  //function takeSnapshot() {
   /* var capturas = [];

    Webcam.snap(function(data_uri) {
      capturas.push(data_uri);
      // Enviar la imagen a un servidor o procesarla con Python
      console.log(data_uri);
    }
   );*/
  //}
  
 // res.render("/");
    res.render("index",{  title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  export const renderContact = (req, res) => {
    res.render("contact",{ title: 'Contact'})
  };
  import { spawn } from "child_process";
  
  export const tomarFoto = (req, res) => {
    "use strict";

const raspberryPiCamera = require('raspberry-pi-camera-native');

raspberryPiCamera.on('frame', (frameData) => {
    //Frame Data es un buffer NodeJS
    console.log('Imagen captada', frameData);
});

raspberryPiCamera.start({
    width: 1280,
    height: 720,
    fps: 2,
    encoding: 'JPEG',
    quality: 75
});
  /*  const script = path.join(__dirname, "./views/administradores/tomar_foto.py");
  
    const child = spawn("python", [script]);
  
    child.on("close", () => {
      console.log(`child process exited with code `);
     // res.redirect("/");
    });*/
   /* const scriptPath = path.join(__dirname, "../views/administradores/tomar_foto.py");

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
    */
   res.redirect("/");
 //  res.redirect("/", { imageData });
/*
  });*/
};
  //};
  
  /*import { spawn } from "child_process";
import path from "path";

export const tomarFoto = (req, res) => {
  const scriptPath = path.join(__dirname, "../python/tomar_foto.py");

  const pythonProcess = spawn("python", [scriptPath]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.redirect("/");
  });
};
*/
  /* ++++++++++++ Toma de foto ++++++++++++ */
  export const takeFoto = (req, res) => {
    console.log('estiooi')
   /* $(
 
      '#staticBackdrop').on('shown.bs.modal', function() {
   // document.addEventListener("DOMContentLoaded", function() {
      const video = document.getElementById('video');
      const captureBtn = document.getElementById('captureBtn');
    
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(error => {
          console.error(error);
        });
    
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
    
      captureBtn.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        const img = new Image();
        img.src = canvas.toDataURL();
        document.body.appendChild(img);
      });
    });
    
  
    req.flash("success_msg", "La subdia ha sido un éxito.");
    res.redirect('/'); */
   // export const takeFoto = (req, res) => {
   /*   const video = document.getElementById('video');
      const captureBtn = document.getElementById('captureBtn');
    
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          // add event listener to capture button
          captureBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            const img = new Image();
            img.src = canvas.toDataURL();
            document.body.appendChild(img);
          });
        })
        .catch(error => {
          console.error(error);
        });
    
      req.flash("success_msg", "La subdia ha sido un éxito.");
      res.redirect('/');
  //  };
    */
  const openModalButton = document.querySelector('#openModal');
  const closeModalButton = document.querySelector('#closeModal');
  const videoElement = document.querySelector('#videoElement');
  
  openModalButton.addEventListener('click', () => {
    // Pedir permiso para acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // Mostrar el video en el modal
        videoElement.srcObject = stream;
        videoElement.play();
        document.getElementById('cameraModal').style.display = 'block';
      })
      .catch(err => {
        console.error('No se pudo acceder a la cámara', err);
      });
  });
  
  closeModalButton.addEventListener('click', () => {
    videoElement.pause();
    videoElement.srcObject.getTracks()[0].stop();
    document.getElementById('cameraModal').style.display = 'none';
  });
  res.render("/");
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
  
  