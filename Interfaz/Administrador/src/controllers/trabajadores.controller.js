import Trabajador from "../models/Trabajador.js";

export const renderTrabajadorForm = (req, res) => res.render("trabajadores/new-trabajador");

export const createNewTrabajador = async (req, res) => {
  const { nombre, curp, telefono, correo, cargo, domicilio } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del trabajador" });
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
    });

  const newTrabajador = new Trabajador({ nombre, curp, telefono, correo, cargo, domicilio });
  newTrabajador.user = req.user.id;
  await newTrabajador.save();
  req.flash("success_msg", "Trabajador añadido exitosamente");
  res.redirect("/trabajadores");
};

export const renderTrabajadores = async (req, res) => {
  const trabajadores = await Trabajador.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("trabajadores/all-trabajadores", { trabajadores });
};

export const renderTrabajadoresInicial = async (req, res) => {
  res.render("trabajadores/trabajadores_inicial");
}

export const searchTrabajadores = async (req, res) => {
  //console.log('query -> ',req.query)
  if(req.query.buscar){
    console.log("buscar ", req.query.buscar)
    const trabajadoresFound = await Trabajador.find({nombre:{ $regex: req.query.buscar, $options:"$i"}})
    /* ***************** regex y options **************
      Usa $ regex operador como una expresión regular para encontrar patrones en una cadena.
      Para distinguir entre mayúsculas y minúsculas, las expresiones regulares utilizan 
      $ opción y el parámetro con un valor de $ i */

    //const trabajadoresFound = await Trabajador.find({nombre:{ $eq: req.query.buscar}})
    .sort({ date: "desc" })
    .lean();
    console.log('El Trabajador que coincidio es :   ', trabajadoresFound)
    res.render("trabajadores/search-trabajadores",{ trabajadoresFound })
  }
  else{
    console.log("no hay parametro")
    res.render("trabajadores/search-trabajadores")
  }
}

export const renderEditForm = async (req, res) => {
  const trabajador = await Trabajador.findById(req.params.id).lean();
  /*if (trabajador.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/trabajadores");
  }*/
  res.render("trabajadores/edit-trabajador", { trabajador });
};

export const updateTrabajador = async (req, res) => {
  const { nombre, curp, telefono, correo, cargo, domicilio  } = req.body;
  await Trabajador.findByIdAndUpdate(req.params.id, { nombre, curp, telefono, correo, cargo, domicilio });
  req.flash("success_msg", "Trabajador actualizado exitosamente");
  res.redirect("/trabajadores");
};

export const deleteTrabajador= async (req, res) => {
  await Trabajador.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Trabajador eliminado  exitosamente");
  res.redirect("/trabajadores");
};