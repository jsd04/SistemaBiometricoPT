import Visitante from "../models/Visitante.js";

export const renderVisitanteForm = (req, res) => res.render("visitantes/new-visitante");

export const createNewVisitante = async (req, res) => {
  const { nombre, curp, telefono, correo, nombreInquilino, parentesco  } = req.body;
  const errors = [];
  
  /* comprobar el recibimiento de los datos */
  console.log('dody',req.body)
  console.log('body',nombre)
  const rostro = req.file;
  console.log('file', req.file)
  console.log('rostro', rostro)
  
  if(!rostro) {
    errors.push({ text: "Por favor ingresa tus datos biométricos en especial de rostro" });
  }
  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del visitante" });
  }
  if (!curp) {
    errors.push({ text: "Por favor escribe el curp" });
  }
  if (!telefono) {
    errors.push({ text: "Por favor escribe el número de teléfono" });
  }
  if (!correo) {
    errors.push({ text: "Por favor escribe el correo" });
  }
  /* *******   Correo  ******* */
  var valido= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  ///.+\@.+\..+/
  var esvalido = valido.test(correo);
  if(esvalido==false){
   // [, ''] // <- Validación regexp para correo
    errors.push({text:"Error de correo, por favor ingrese un correo válido"})
  }
  if (!nombreInquilino) {
    errors.push({ text: "Por favor escribe el nombre del inquilino a visitar" });
  }
  if (!parentesco) {
    errors.push({ text: "Por favor escribe el parentesco" });
  }
  if (errors.length > 0)
    return res.render("visitantes/new-visitante", {
      errors,
      nombre,
      curp,
      telefono,
      correo,
      nombreInquilino,
      parentesco,
      rostro,
    });

  const newVisitante = new Visitante({ 
    nombre, 
    curp, 
    telefono, 
    correo, 
    nombreInquilino, 
    parentesco,
    rostro:{
      data : req.file.filename,
      contentType: 'image/png',
      filename : req.file.filename,
      path : '/uploads/' + req.file.filename,
      originalname : req.file.originalname,
      date : req.file.date,
      size : req.file.size,
    }
  });
 // newVisitante.user = req.user.id;
  await newVisitante.save();
  console.log('usuariogaudado',newVisitante)
  req.flash("success_msg", "Visitante añadido exitosamente");
  res.redirect("/ingresar");
  // "/ingresar o /"" ->/ es la principal
};



