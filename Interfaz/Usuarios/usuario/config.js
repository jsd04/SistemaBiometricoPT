import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI //|| "mongodb+srv://jessicasd:JESSICAsd@cluster0.jqyov.mongodb.net/SistemaUsuario";


