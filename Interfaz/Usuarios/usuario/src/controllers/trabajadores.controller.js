import Trabajador from "../models/Trabajador.js";

export const renderTrabajadorForm = (req, res) => res.render("trabajadores/new-trabajador");

export const createNewTrabajador = async (req, res) => {
  const { nombre, curp, telefono, correo, cargo, domicilio } = req.body;
  const errors = []; 
  const rostro = req.file;
  /* comprobar el recibimiento de los datos */
  console.log('dody',req.body)
  console.log('body',nombre)
  console.log('file', req.file)
  console.log('rostro', rostro)
  if(!rostro) {
    errors.push({ text: "Por favor ingresa tus datos biométricos en especial de rostro" });
  }
  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del trabajador" });
  }
  if (!curp) {
    errors.push({ text: "Por favor escribe el curp" });
  }
  if (!telefono) {
    errors.push({ text: "Por favor escribe el número de teléfono" });
  }

  /* *******   Correo  ******* */
  var valido= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  ///.+\@.+\..+/
  var esvalido = valido.test(correo);
  if(esvalido==false){
   // [, ''] // <- Validación regexp para correo
    errors.push({text:"Error de correo, por favor ingrese un correo válido"})
  } 
  if (!cargo) {
    errors.push({ text: "Por favor escribe tu cargo" });
  }
  if (!domicilio) {
    errors.push({ text: "Por favor escribe tu domicilio" });
  }
  if (errors.length > 0)
    return res.render("trabajadores/new-trabajador", {
      errors,
      nombre,
      curp,
      telefono,
      correo,
      cargo,
      domicilio,
      rostro,
    });

  const newTrabajador = new Trabajador({ 
    nombre, 
    curp, 
    telefono, 
    correo, 
    cargo, 
    domicilio,
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
  //newTrabajador.user = req.user.id;
  await newTrabajador.save();
  console.log('usuariogaudado',newTrabajador)
  req.flash("success_msg", "Trabajador añadido exitosamente");
  res.redirect("/ingresar");
  // "/ingresar o /"" ->/ es la principal
};

