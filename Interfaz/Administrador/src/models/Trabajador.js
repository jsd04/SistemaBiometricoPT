import mongoose from "mongoose";

const TrabajadorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    curp: {
      type: String,
      required: true,
    },
    telefono: {
      type:Number,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    //domicilio del  trabajador
    domicilio: {
      type: String,
      required: true,
    },
    //admi
    /*user: {
      type: String,
      required: true,
    },*/
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trabajador", TrabajadorSchema);