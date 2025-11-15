import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { postRoutes } from "./post.routes.js";
import { aiRoutes } from "./ai.routes.js";
import { notificationsRoutes } from "./notifications.routes.js";

// Router principal
export const routes = Router();

// Rutas Auth
routes.use(authRoutes);
// Rutas Post
routes.use(postRoutes);
// Rutas IA
routes.use(aiRoutes);
// Rutas Notificaciones
routes.use(notificationsRoutes)
