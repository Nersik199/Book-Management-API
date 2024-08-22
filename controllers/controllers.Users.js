import usersModel from '../models/db.Users.js'
import utils from '../utils/utils.js'

export default {
	async registration(req, res) {
		try {
			const { firstName, lastName, email, password, phone } = req.body

			const mailExists = await usersModel.findByEmail(email)

			if (mailExists) {
				res.status(409).json({ message: 'Email already exists' })
				return
			}

			const user = await usersModel.createUser({
				firstName,
				lastName,
				email,
				phone,
				password: utils.hashPassword(password),
			})
			delete user.password
			res.status(201).json({ message: 'User created successfully' })
		} catch (e) {
			res.status(500).json({ message: e.message })
		}
	},

	async login(req, res) {
		try {
			const { email, password } = req.body

			const user = await usersModel.findByEmail(email)

			if (!user || utils.hashPassword(password) !== user.password) {
				res.status(401).json({ message: 'Invalid email or password' })
				return
			}

			const token = utils.createToken(user.email, user.id)

			res.status(200).json({ message: 'Login successful', token })
		} catch (error) {
			console.error('Error executing query:', error)
			res
				.status(500)
				.json({ message: 'Internal server error', error: error.message })
		}
	},
	async getUsers(req, res) {
		try {
			const data = await usersModel.getUsers()
			if (!data) {
				res.status(404).json({ message: 'Users not found' })
				return
			}

			res.status(200).json({
				usersList: data,
			})
		} catch (error) {
			console.error('Error executing query', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	},

	async getUserProfile(req, res) {
		try {
			const { email, id } = req.user

			if (!email) {
				res.status(400).json({ message: 'Email not found in token' })
				return
			}

			const user = await usersModel.findByPk(id)

			if (!user) {
				res.status(404).json({ message: 'User not found' })
				return
			}
			res.status(200).json({ user })
		} catch (e) {
			console.error('Error fetching user profile:', e)
			res.status(500).json({ message: e.message, status: 500 })
		}
	},
	async userUpdate(req, res) {
		try {
			const { id } = req.user
			const { firstName, lastName } = req.body

			const user = await usersModel.findByPk(id)

			if (!user) {
				res.status(404).json({
					message: 'User not found',
				})
				return
			}

			const updatedData = {
				firstName,
				lastName,
				email: user.email,
				id,
			}

			await usersModel.updateUser(updatedData)

			res.status(200).json({
				status: 'User updated successfully',
			})
		} catch (error) {
			console.error('Error updating user profile:', error)
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	},
	async deleteUser(req, res) {
		try {
			const { id } = req.params

			if (!id) {
				res.status(400).json({ message: 'User ID is required' })
				return
			}

			const result = await usersModel.deleteUser(id)

			if (result.affectedRows === 0) {
				res.status(404).json({ message: 'User not found' })
				return
			}

			res.status(200).json({ message: 'User deleted successfully' })
		} catch (error) {
			res.status(500).json({ message: error.message, status: 500 })
		}
	},
}
