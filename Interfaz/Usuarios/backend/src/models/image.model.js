import mongoose from "mongoose";

// Se crea el esquema del usuario administrador y los datos que contendra este usuario.
const ImageSchema = new mongoose.Schema(
  {
   
    filename:{ type:String },
    path:{ type:String },
    originalname:{ type:String },
    date:{ type: Date, default: Date.now},
    size:{  type: Number},
    rostro:{ data: Buffer, contentType: String },
     /* Buffer son datos binariosy en mongodb las imagenes se guardan en datos binarios
        y en el buffer datos pregunta por el tipo de contenido lo cual es una cadena
      */
    // type: Buffer, required: false
  },
  
);


export default mongoose.model("Image", ImageSchema);