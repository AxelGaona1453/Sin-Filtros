import { Router } from "express";
import { register } from "../controllers/auth.controllers.js";
import { applyValidations } from "../middlewares/validator.js";
import { registerValidations } from "../middlewares/validations/auth.validations.js";

export const authRoutes = Router();
authRoutes.post("/auth/register", registerValidations, applyValidations, register)