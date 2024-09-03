import Book from '../models/Book.js';
import Review from '../models/Review.js';
import Favorite from '../models/Favorite.js';

import { Op, Sequelize } from 'sequelize';
export default {
	createBook: async (req, res) => {
		try {
			const { id: userId } = req.user;
			const { title, author, category } = req.body;
			const book = await Book.create({ title, author, category, userId });
			res.status(201).json({ message: 'Book created successfully', book });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	getBook: async (req, res) => {
		try {
			const limit = 5;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const books = await Book.findAll({ include: ['user'], limit, offset });

			if (!books) {
				res.status(404).json({ message: 'Books not found' });
				return;
			}
			res.status(200).json({ books });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	getTopRated: async (req, res) => {
		try {
			const { page = 1, limit = 5 } = req.query;
			const offset = Math.floor((page - 1) * limit);

			const books = await Review.findAll({
				attributes: [
					[Sequelize.fn('AVG', Sequelize.col('rating')), 'bookRating'],
				],
				include: [
					{
						model: Book,
						attributes: ['id', 'title', 'author', 'category'],
					},
				],
				group: ['bookId'],
				order: [[Sequelize.literal('bookRating'), 'DESC']],
				limit,
				offset,
			});

			if (!books) {
				res.status(404).json({ message: 'Books not found' });
				return;
			}

			res.status(200).json({ message: 'Top Rated Books', books });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},

	getAuthorCount: async (req, res) => {
		try {
			const { page = 1, limit = 5 } = req.query;
			const offset = Math.floor((page - 1) * limit);

			const authors = await Book.findAll({
				attributes: [
					'author',
					[Sequelize.fn('COUNT', Sequelize.col('userId')), 'bookCount'],
				],

				group: ['author'],
				order: [[Sequelize.literal('bookCount'), 'DESC']],
				limit,
				offset,
			});
			if (!authors) {
				res.status(404).json({ message: 'Authors not found' });
				return;
			}

			res.status(200).json({ message: 'Top Authors', authors });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	createFavorite: async (req, res) => {
		try {
			const { id: userId } = req.user;
			const { id: bookId } = req.params;

			const data = await Favorite.create({ userId, bookId });

			res.status(201).json({ message: 'Favorite created successfully', data });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	getFavorite: async (req, res) => {
		try {
			const limit = 5;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const { id: userId } = req.user;

			const favorites = await Favorite.findAll({
				where: { userId },
				include: ['book'],
				limit,
				offset,
			});

			if (!favorites) {
				res.status(404).json({ message: 'Favorites not found' });
				return;
			}
			res.status(200).json({ favorites });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	deleteFavorite: async (req, res) => {
		try {
			const { id: userId } = req.user;
			const { id: bookId } = req.params;
			console.log(bookId);

			const result = await Favorite.destroy({ where: { userId, bookId } });
			if (!result) {
				res.status(404).json({ message: 'Favorite not found' });
				return;
			}
			res.status(200).json({ message: 'Favorite deleted successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	bookSearch: async (req, res) => {
		try {
			const { q } = req.query;
			const books = await Book.findAll({
				where: {
					[Op.or]: [
						{
							title: {
								[Op.like]: `%${q}%`,
							},
						},
						{
							author: {
								[Op.like]: `%${q}%`,
							},
						},
						{
							category: {
								[Op.like]: `%${q}%`,
							},
						},
					],
				},
			});
			res.status(200).json({ books });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
	showBook: async (req, res) => {
		try {
			const { id } = req.params;
			const book = await Book.findOne({ where: { id } });
			res.status(200).json({ book });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	},
};
