import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidations = [
    body("username")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("El nombre de usuario debe ser alfanumérico")
        .custom(async (username) => {
            const usernameExists = await UserModel.findOne({ username: username });
            if (usernameExists) {
                throw new Error("El nombre de usuario ya está en uso");
            }
        }),
    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email debe ser válido")
        .custom(async (email) => {
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                throw new Error("El email ya está en uso");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "g")
        .withMessage(
            "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"
        ),
    body("profile.firstname")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    body("profile.lastname")
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
    body("profile.profile_picture")
        .optional()
        .isURL()
        .withMessage("La URL del avatar debe ser válida"),
    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("La biografía no debe exceder los 500 caracteres"),

];