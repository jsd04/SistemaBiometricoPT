import Inquilino from "../models/Inquilino.js";

export const renderContacts = (req, res) => {
    res.send('inquilino add')
  };
export const renderInquilinoForm = (req, res) => res.render("inquilinos/new-inquilino");

export const createNewInquilino = async (req, res) => {
  const { nombre, curp, piso, departamento, telefono, correo } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Por favor escribe el nombre del inquilino" });
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
  if (errors.length > 0)
    return res.render("inquilinos/new-inquilino", {
      errors,
      nombre,
      curp,
      piso,
      departamento,
      telefono,
      correo,
    });

  const newInquilino = new Inquilino({ nombre, curp, piso, departamento, telefono, correo});
  newInquilino.user = req.user.id;
  await newInquilino.save();
  req.flash("success_msg", "Inquilino añadido exitosamente");
  res.redirect("/inquilinos");
};

export const renderInquilinos = async (req, res) => {
  const inquilinos = await Inquilino.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("inquilinos/all-inquilinos", { inquilinos });
};

export const renderEditForm = async (req, res) => {
  const inquilino = await Inquilino.findById(req.params.id).lean();
  if (inquilino.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/inquilinos");
  }
  res.render("inquilinos/edit-inquilino", { inquilino });
};

export const updateInquilino = async (req, res) => {
  const { nombre, curp, piso, departamento, telefono, correo } = req.body;
  await Inquilino.findByIdAndUpdate(req.params.id, { nombre, curp, piso, departamento, telefono, correo});
  req.flash("success_msg", "Inquilino actualizado exitosamente");
  res.redirect("/inquilinos");
};

export const deleteInquilino= async (req, res) => {
  await Inquilino.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Inquilino eliminado  exitosamente");
  res.redirect("/inquilinos");
};