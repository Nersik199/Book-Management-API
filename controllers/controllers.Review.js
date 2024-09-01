import Review from '../models/Review.js';

export default {
	createReview: async (req, res) => {
		try {
			const { id: userId } = req.user;
			const { review, rating } = req.body;
			const { id: bookId } = req.params;

			const data = await Review.create({ review, rating, userId, bookId });
			res.status(201).json({ message: 'Review created successfully', data });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	showReview: async (req, res) => {
		try {
			const limit = 4;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const { id: bookId } = req.params;

			const reviews = await Review.findAll({
				where: { bookId },
				include: ['user'],
				limit,
				offset,
			});

			if (!reviews) {
				res.status(404).json({ message: 'Review not found' });
				return;
			}
			res.status(200).json({ message: 'Reviews found', reviews });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
};
