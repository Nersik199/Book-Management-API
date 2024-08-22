import db from '../clients/db.mysql.js'

export default {
	async getReservedSeats() {
		const [rows] = await db.query(
			'SELECT seat_row, seat_number FROM reservations'
		)
		return rows
	},

	async getBookingHistory() {
		const [rows] = await db.query(
			'SELECT * FROM reservations ORDER BY createdAt DESC'
		)
		return rows
	},

	async createReservation({
		user_id,
		seatRow,
		seatNumber,
		firstName,
		lastName,
		phone,
	}) {
		const [rows] = await db.query(
			`INSERT INTO reservations (user_id, seat_row, seat_number, firstName, lastName, phone)
			VALUES (?, ?, ?, ?, ?, ?)`,
			[user_id, seatRow, seatNumber, firstName, lastName, phone]
		)
		return rows
	},
}
