import Joi from 'joi';

export default {
	createReview: Joi.object({
		review: Joi.string().min(3).max(200).required(),
		rating: Joi.number().min(1).max(5).required(),
	}),
};
