import { matchedData } from 'express-validator';
import { hashPassword } from '../helpers/bcrypt.helper.js';
import { UserModel } from '../models/user.model.js';

export const register = async (req, res) => {
	try {
		const data = matchedData(req);

		const hashedPassword = await hashPassword(data.password);

		const user = await UserModel.create({
			username: data.username,
			email: data.email,
			password: hashedPassword,
			profile: data.profile,
		});

		res.status(201).json({
			ok: true,
			msg: 'Usuario creado con exito',
			user,
		});
	} catch (err) {
		res.status(500).json({
			ok: false,
			msg: 'Error interno del servidor',
			err,
		});
	}
};
