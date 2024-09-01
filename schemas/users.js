import Joi from 'joi';

export default {
	register: Joi.object({
		firstName: Joi.string().min(3).max(50).required(),
		lastName: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(3).max(50).required(),
	}),
	login: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),

	userUpdate: Joi.object({
		firstName: Joi.string().min(3).max(50).required(),
		lastName: Joi.string().min(3).max(50).required(),
	}),
};
