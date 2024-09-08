import { Sequelize } from 'sequelize';

import utils from '../utils/utils.js';
import Users from '../models/Users.js';
import Review from '../models/Review.js';
import Book from '../models/Book.js';

export default {
	async registration(req, res) {
		try {
			const { firstName, lastName, email, password } = req.body;

			const mailExists = await Users.findOne({ where: { email } });

			const image = await utils.processFilePath(req.file);

			if (mailExists) {
				res.status(409).json({ message: 'Email already exists' });
				return;
			}

			const user = await Users.create({
				firstName,
				lastName,
				email: email.toLowerCase(),
				password: password,
				avatar: image,
			});

			res.status(201).json({ message: 'User created successfully', user });
		} catch (e) {
			console.log(e);

			res.status(500).json({ message: e.message });
		}
	},

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await Users.findOne({ where: { email } });

			if (
				!user ||
				Users.hashPassword(password) !== user.getDataValue('password')
			) {
				res.status(401).json({ message: 'Invalid email or password' });
				return;
			}

			const payload = {
				id: user.id,
				email: user.email,
			};

			const token = utils.createToken(payload);

			if (user.type === 'admin') {
				res
					.status(200)
					.json({ message: 'Login successful', token, isAdmin: true });
				return;
			}

			res
				.status(200)
				.json({ message: 'Login successful', token, isAdmin: false });
		} catch (error) {
			console.log(error);

			res
				.status(500)
				.json({ message: 'Internal server error', error: error.message });
		}
	},

	async userProfile(req, res) {
		try {
			const { email, id } = req.user;

			if (!email) {
				res.status(400).json({ message: 'Email not found in token' });
				return;
			}

			const user = await Users.findByPk(id);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(200).json({ user });
		} catch (e) {
			console.error('Error fetching user profile:', e);
			res.status(500).json({ message: e.message, status: 500 });
		}
	},
	async userUpdate(req, res) {
		try {
			const { id } = req.user;
			const { firstName, lastName } = req.body;

			const user = await Users.findByPk(id);

			if (!user) {
				res.status(404).json({
					message: 'User not found',
				});
				return;
			}
			const image = await utils.updateFileImage(req.file, user.avatar);

			await Users.update(
				{
					firstName,
					lastName,
					email: user.email,
					id,
					avatar: image,
				},
				{ where: { id } }
			);

			res.status(200).json({
				message: 'User updated successfully',
			});
		} catch (error) {
			console.error('Error updating user profile:', error);
			res.status(500).json({
				message: 'Internal server error',
			});
		}
	},
	async userRatingsBook(req, res) {
		try {
			const { page = 1, limit = 5 } = req.query;
			const offset = Math.floor((page - 1) * limit);

			const { userId } = req.params;

			const user = await Users.findByPk(userId);

			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}

			const userReviews = await Review.findAll({
				attributes: [
					[Sequelize.fn('AVG', Sequelize.col('rating')), 'userRating'],
				],
				include: [
					{
						model: Users,
						attributes: ['id', 'firstName', 'lastName'],
					},
					{
						model: Book,
						attributes: ['id', 'title', 'author', 'category'],
					},
				],
				group: ['bookId'],
				order: [[Sequelize.literal('userRating'), 'DESC']],
				where: { userId },
				limit,
				offset,
			});

			res.status(200).json({
				message: 'Reviews fetched successfully',
				summary: userReviews,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},

	async mostActiveUsers(req, res) {
		try {
			const { page = 1, limit = 5 } = req.query;
			const offset = Math.floor((page - 1) * limit);

			const mostActive = await Review.findAll({
				attributes: [
					[Sequelize.fn('COUNT', Sequelize.col('userId')), 'reviews'],
					[Sequelize.fn('AVG', Sequelize.col('rating')), 'rating'],
				],
				include: [
					{
						model: Users,
						attributes: ['id', 'firstName', 'lastName'],
					},
				],
				group: ['userId'],
				order: [[Sequelize.literal('reviews'), 'DESC']],
				limit,
				offset,
			});

			if (!mostActive) {
				res.status(404).json({ message: 'No reviews found' });
				return;
			}

			res.status(200).json({
				message: 'Reviews fetched successfully',
				mostActive,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
};
