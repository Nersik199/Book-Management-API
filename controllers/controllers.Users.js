import utils from '../utils/utils.js';
import Users from '../models/Users.js';

export default {
	async registration(req, res) {
		try {
			const { firstName, lastName, email, password, phone } = req.body;

			const mailExists = await Users.findOne({ where: { email } });

			if (mailExists) {
				res.status(409).json({ message: 'Email already exists' });
				return;
			}

			const user = await Users.create({
				firstName,
				lastName,
				email: email.toLowerCase(),
				phone,
				password: utils.hashPassword(password),
			});

			res.status(201).json({ message: 'User created successfully' });
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	},

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await Users.findOne({ where: { email } });

			if (!user || utils.hashPassword(password) !== user.password) {
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
			console.error('Error executing query:', error);
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

			const updatedData = {
				firstName,
				lastName,
				email: user.email,
				id,
			};

			await Users.update(updatedData, { where: { id } });

			res.status(200).json({
				status: 'User updated successfully',
			});
		} catch (error) {
			console.error('Error updating user profile:', error);
			res.status(500).json({
				message: 'Internal server error',
			});
		}
	},
};
