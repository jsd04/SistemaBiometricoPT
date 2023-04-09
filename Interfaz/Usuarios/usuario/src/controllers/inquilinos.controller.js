import Inquilino from "../models/Inquilino.js";

export const renderInquilinoForm = (req, res) => res.render("inquilinos/new-inquilino");

export const createNewInquilino = async (req, res) => {
  const { nombre, curp, piso, departamento, telefono, correo } = req.body;
  const errors = [];
  /* comprobar el recibimiento de los datos */
  console.log('dody',req.body)
  console.log('body',nombre)
  const rostro = req.file;
  console.log('file', req.file)
  console.log('rostro', rostro)

  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del inquilino" });
  }
  if(!rostro) {
    errors.push({ text: "Por favor ingresa tus datos biométricos en especial de rostro" });
  }
  if (!curp) {
    errors.push({ text: "Por favor escribe el curp" });
  }
  if (!piso) {
    errors.push({ text: "Por favor escribe el número de piso" });
  }
  if (!departamento) {
    errors.push({ text: "Por favor escribe el número de departamento" });
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
  if (errors.length > 0)
    return res.render("inquilinos/new-inquilino", {
      errors,
      nombre,
      curp,
      piso,
      departamento,
      telefono,
      correo,
      rostro,
    });

  const newInquilino = new Inquilino({ 
    nombre, 
    curp, 
    piso, 
    departamento, 
    telefono, 
    correo,
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
  // newInquilino.user = req.user.id;
  await newInquilino.save();
  console.log('usuariogaudado',newInquilino)
  req.flash("success_msg", "Inquilino añadido exitosamente");
  res.redirect("/ingresar");
  // "/ingresar o /"" ->/ es la principal
};