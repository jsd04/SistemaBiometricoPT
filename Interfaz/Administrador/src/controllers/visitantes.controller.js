import Visitante from "../models/Visitante.js";

export const renderVisitanteForm = (req, res) => res.render("visitantes/new-visitante");

export const createNewVisitante = async (req, res) => {
  const { nombre, curp, telefono, correo, nombreInquilino, parentesco  } = req.body;
  const errors = [];
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
    });

  const newVisitante = new Visitante({ nombre, curp, telefono, correo, nombreInquilino, parentesco });
  newVisitante.user = req.user.id;
  await newVisitante.save();
  req.flash("success_msg", "Visitante añadido exitosamente");
  res.redirect("/visitantes");
};

export const renderVisitantes = async (req, res) => {
  const visitantes = await Visitante.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("visitantes/all-visitantes", { visitantes });
};

export const renderVisitantesInicial = async (req, res) => {
  res.render("visitantes/visitantes_inicial");
}

export const searchVisitantes = async (req, res) => {
  //console.log('query -> ',req.query)
  if(req.query.buscar){
    console.log("buscar ", req.query.buscar)
    const visitantesFound = await Visitante.find({nombre:{ $regex: req.query.buscar, $options:"$i"}})
    /* ***************** regex y options **************
      Usa $ regex operador como una expresión regular para encontrar patrones en una cadena.
      Para distinguir entre mayúsculas y minúsculas, las expresiones regulares utilizan 
      $ opción y el parámetro con un valor de $ i */

    //const visitantesFound = await Visitante.find({nombre:{ $eq: req.query.buscar}})
    .sort({ date: "desc" })
    .lean();
    console.log('El Visitante que coincidio es :   ', visitantesFound)
    res.render("visitantes/search-visitantes",{ visitantesFound })
  }
  else{
    console.log("no hay parametro")
    res.render("visitantes/search-visitantes")
  }
}

export const renderEditForm = async (req, res) => {
  const visitante = await Visitante.findById(req.params.id).lean();
  /*if (visitante.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/visitantes");
  }*/
  res.render("visitantes/edit-visitante", { visitante });
};

export const updateVisitante = async (req, res) => {
  const { nombre, curp, telefono, correo, nombreInquilino, parentesco } = req.body;
  await Visitante.findByIdAndUpdate(req.params.id, { nombre, curp, telefono, correo, nombreInquilino, parentesco });
  req.flash("success_msg", "Visitante actualizado exitosamente");
  res.redirect("/visitantes");
};

export const deleteVisitante= async (req, res) => {
  await Visitante.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Visitante eliminado  exitosamente");
  res.redirect("/visitantes");
};