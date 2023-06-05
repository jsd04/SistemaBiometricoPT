import Image from '../models/image.model.js';
import Image2 from '../models/image2.js';
import multer from 'multer';
//import init from '../views/administradores/tomar_voz.js';
import path from 'path';
import { spawn } from "child_process";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));

  export const renderIndex = async (req, res) => {
  // res.render("/");
    res.render("index",{  title: 'Web principal'})
  };
  export const index2 = async (req,res) => {
    
    res.render ("index2", { title:'index2'})
  }
  
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


    const init = () => {
      const tieneSoporteUserMedia = () =>
          !!(navigator.mediaDevices.getUserMedia)
    
      // Si no soporta...
      // Amable aviso para que el mundo comience a usar navegadores decentes ;)
      if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia())
          return alert("Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome");
    
    
      // Declaración de elementos del DOM
      const $listaDeDispositivos = document.querySelector("#listaDeDispositivos"),
          $duracion = document.querySelector("#duracion"),
          $btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
          $btnDetenerGrabacion = document.querySelector("#btnDetenerGrabacion");
    
      // Algunas funciones útiles
      const limpiarSelect = () => {
          for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--) {
              $listaDeDispositivos.options.remove(x);
          }
      }
    
      const segundosATiempo = numeroDeSegundos => {
          let horas = Math.floor(numeroDeSegundos / 60 / 60);
          numeroDeSegundos -= horas * 60 * 60;
          let minutos = Math.floor(numeroDeSegundos / 60);
          numeroDeSegundos -= minutos * 60;
          numeroDeSegundos = parseInt(numeroDeSegundos);
          if (horas < 10) horas = "0" + horas;
          if (minutos < 10) minutos = "0" + minutos;
          if (numeroDeSegundos < 10) numeroDeSegundos = "0" + numeroDeSegundos;
    
          return `${horas}:${minutos}:${numeroDeSegundos}`;
      };
      // Variables "globales"
      let tiempoInicio, mediaRecorder, idIntervalo;
      const refrescar = () => {
              $duracion.textContent = segundosATiempo((Date.now() - tiempoInicio) / 1000);
          }
          // Consulta la lista de dispositivos de entrada de audio y llena el select
      const llenarLista = () => {
          navigator
              .mediaDevices
              .enumerateDevices()
              .then(dispositivos => {
                  limpiarSelect();
                  dispositivos.forEach((dispositivo, indice) => {
                      if (dispositivo.kind === "audioinput") {
                          const $opcion = document.createElement("option");
                          // Firefox no trae nada con label, que viva la privacidad
                          // y que muera la compatibilidad
                          $opcion.text = dispositivo.label || `Dispositivo ${indice + 1}`;
                          $opcion.value = dispositivo.deviceId;
                          $listaDeDispositivos.appendChild($opcion);
                      }
                  })
              })
      };
      // Ayudante para la duración; no ayuda en nada pero muestra algo informativo
      const comenzarAContar = () => {
          tiempoInicio = Date.now();
          idIntervalo = setInterval(refrescar, 500);
      };
    
      // Comienza a grabar el audio con el dispositivo seleccionado
      const comenzarAGrabar = () => {
          if (!$listaDeDispositivos.options.length) return alert("No hay dispositivos");
          // No permitir que se grabe doblemente
          if (mediaRecorder) return alert("Ya se está grabando");
    
          navigator.mediaDevices.getUserMedia({
                  audio: {
                      deviceId: $listaDeDispositivos.value,
                  }
              })
              .then(
                  stream => {
                      // Comenzar a grabar con el stream
                      mediaRecorder = new MediaRecorder(stream);
                      mediaRecorder.start();
                      comenzarAContar();
                      // En el arreglo pondremos los datos que traiga el evento dataavailable
                      const fragmentosDeAudio = [];
                      // Escuchar cuando haya datos disponibles
                      mediaRecorder.addEventListener("dataavailable", evento => {
                          // Y agregarlos a los fragmentos
                          fragmentosDeAudio.push(evento.data);
                      });
                      // Cuando se detenga (haciendo click en el botón) se ejecuta esto
                      mediaRecorder.addEventListener("stop", () => {
                          // Detener el stream
                          stream.getTracks().forEach(track => track.stop());
                          // Detener la cuenta regresiva
                          detenerConteo();
                          // Convertir los fragmentos a un objeto binario
                          const blobAudio = new Blob(fragmentosDeAudio);
    
                          // Crear una URL o enlace para descargar
                          const urlParaDescargar = URL.createObjectURL(blobAudio);
                          // Crear un elemento <a> invisible para descargar el audio
                          let a = document.createElement("a");
                          document.body.appendChild(a);
                          a.style = "display: none";
                          a.href = urlParaDescargar;
                          a.download = "grabacion_parzibyte.me.webm";
                          // Hacer click en el enlace
                          a.click();
                          // Y remover el objeto
                          window.URL.revokeObjectURL(urlParaDescargar);
                      });
                  }
              )
              .catch(error => {
                  // Aquí maneja el error, tal vez no dieron permiso
                  console.log(error)
              });
      };
    
    
      const detenerConteo = () => {
          clearInterval(idIntervalo);
          tiempoInicio = null;
          $duracion.textContent = "";
      }
    
      const detenerGrabacion = () => {
          if (!mediaRecorder) return alert("No se está grabando");
          mediaRecorder.stop();
          mediaRecorder = null;
      };
    
    
      $btnComenzarGrabacion.addEventListener("click", comenzarAGrabar);
      $btnDetenerGrabacion.addEventListener("click", detenerGrabacion);
    
      // Cuando ya hemos configurado lo necesario allá arriba llenamos la lista
    
      llenarLista();
    }
    // Esperar a que el documento esté listo...
    document.addEventListener("DOMContentLoaded", init);
    
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
  
  