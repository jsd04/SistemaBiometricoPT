import mongoose from "mongoose";

const VisitanteSchema = new mongoose.Schema(
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
    //datos del inquilino a vsitar
    nombreInquilino: {
      type: String,
      required: true,
    },
    parentesco: {
      type: String,
      required: true,
    },
    
    ///
    
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Visitante", VisitanteSchema);