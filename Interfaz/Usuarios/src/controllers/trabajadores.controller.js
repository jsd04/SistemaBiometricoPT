import Trabajador from "../models/Trabajador.js";

export const renderContacts = (req, res) => {
    res.send('trabajador add')
  };
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

export const renderEditForm = async (req, res) => {
  const trabajador = await Trabajador.findById(req.params.id).lean();
  if (trabajador.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/trabajadores");
  }
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