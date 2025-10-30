// Importaciones
import express from "express";
import "dotenv/config"
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index.js";

// Configuraciones
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Rutas
app.use("/sin-filtros", routes);

//Conexion a la base de datos
app.listen(PORT, async () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    await connectDB();
});