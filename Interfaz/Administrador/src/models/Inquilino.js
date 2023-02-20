import mongoose from "mongoose";

const InquilinoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    curp: {
      type: String,
      required: true,
    },
    //domicilio
    piso: {
      type: Number,
      required: true,
    },
   
    departamento: {
      type: Number,
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
    /*
    facial:{
      type: Buffer,
      required: true,
    },
    
   /* datosbiometricos: {
      facial:{
        type: buffer,
        required: true,
      },
      /*
      voz:{
        type: audio,
        required: true,
      },
      huella:{
        type: nose,
        required: true
      } 
    },
    */
    //************* Datos biometricos *************** */
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inquilino", InquilinoSchema);