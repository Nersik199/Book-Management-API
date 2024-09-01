import Joi from 'joi';

export default {
	createBook: Joi.object({
		title: Joi.string().min(3).max(200).required(),
		author: Joi.string().min(3).max(200).required(),
		category: Joi.string().required(),
	}),
};
