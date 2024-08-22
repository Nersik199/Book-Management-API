import db from '../clients/db.mysql.js'

export default {
	findByPk: async id => {
		const [rows] = await db.query(
			`
          SELECT *
          FROM users
          WHERE id = ?
          LIMIT 1;
      `,
			[id]
		)

		return rows.length > 0 ? rows[0] : null
	},
	findByEmail: async email => {
		const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [
			email,
		])
		return rows.length > 0 ? rows[0] : null
	},

	createUser: async ({ firstName, lastName, email, password }) => {
		const [rows] = await db.query(
			`INSERT INTO users (firstName,lastName, email, password) VALUES (?, ?, ?, ? )`,
			[firstName, lastName, email, password]
		)

		return rows
	},

	getUsers: async () => {
		const [rows] = await db.query(`SELECT * FROM users`)
		return rows
	},
	updateUser: async data => {
		const [rows] = await db.query(
			`UPDATE users SET firstName = ?, lastName = ? WHERE id = ?`,
			[data.firstName, data.lastName, data.id]
		)
		return rows
	},
	deleteUser: async id => {
		const [rows] = await db.query(`DELETE FROM users WHERE id = ?`, [id])
		return rows
	},
}
