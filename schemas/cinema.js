import Joi from 'joi'

export default {
	createReservation: Joi.object({
		firstName: Joi.string().min(3).max(50).required(),
		lastName: Joi.string().min(3).max(50).required(),
		phone: Joi.string()
			.pattern(/^\+\d{7,14}$/)
			.required(),
		seatNumber: Joi.number().required(),
		seatRow: Joi.number().required(),
	}),
}
