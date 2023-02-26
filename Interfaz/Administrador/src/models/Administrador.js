import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Se crea el esquema del usuario administrador y los datos que contendra este usuario.
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true},
    email: { type: String, required: false, unique: true, trim: true },
    telefono: { type: String, trim: true, required: false},
    domicilio: { type: String, trim: true, required: false},
    password: { type: String, required: true },
    date:{ type: Date, default: Date.now},
    rostro:{ type: Buffer, required: false},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//Metodo para encriptar la contraseña
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //genera el hash
  const hash = bcrypt.hash(password, salt); //se cifra la contraseña
  return hash;
};
//Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Administrador", UserSchema);
