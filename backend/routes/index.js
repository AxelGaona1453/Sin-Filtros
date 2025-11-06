import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { postRoutes } from "./post.routes.js";

// Router principal
export const routes = Router();

// Rutas auth
routes.use(authRoutes);
routes.use(postRoutes);
