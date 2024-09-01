import Book from '../models/Book.js';
import Review from '../models/Review.js';
import Users from '../models/Users.js';

export default {
	getBooks: async (req, res) => {
		try {
			const limit = 5;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const review = await Review.findAll({
				include: [{ model: Users }, { model: Book }],
				limit,
				offset,
			});

			if (review.length === 0) {
				res.status(404).json({ message: 'No books found' });
				return;
			}

			res.status(200).json({ review });
		} catch (error) {
			console.log(error);
		}
	},

	async getUsers(req, res) {
		try {
			const limit = 5;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const data = await Users.findAll({
				raw: true,
				limit,
				offset,
			});

			if (!data) {
				res.status(404).json({ message: 'Users not found' });
				return;
			}

			res.status(200).json({
				usersList: data,
			});
		} catch (error) {
			console.error('Error executing query', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
	deleteReview: async (req, res) => {
		try {
			const { id } = req.params;
			await Review.destroy({ where: { id } });
			res.status(200).json({ message: 'Review deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},

	async deleteUsers(req, res) {
		try {
			const { id } = req.params;

			if (!id) {
				res.status(400).json({ message: 'Users ID is required' });
				return;
			}

			const result = await Users.destroy({ where: { id }, raw: true });

			if (!result) {
				res.status(404).json({ message: 'Users not found' });
				return;
			}

			res.status(200).json({ message: 'Users deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: error.message, status: 500 });
		}
	},
};
