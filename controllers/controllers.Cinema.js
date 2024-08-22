import modelCinema from '../models/db.Cinema.js'

export default {
	async getReservedSeats(req, res) {
		try {
			const reservedSeats = await modelCinema.getReservedSeats()
			res.json({ reservedSeats })
		} catch (error) {
			console.error('Error fetching reserved seats:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	},
	async getBookingHistory(req, res) {
		try {
			const data = await modelCinema.getBookingHistory()
			if (!data || data.length === 0) {
				return res.status(404).json({ message: 'No booking history found' })
			}
			res.json({ bookings: data })
		} catch (error) {
			console.error('Error fetching booking history:', error)
			res.status(500).json({ error: 'Failed to fetch booking history' })
		}
	},
	async createReservation(req, res) {
		try {
			const { seatRow, seatNumber, firstName, lastName, phone } = req.body
			const { id } = req.user

			await modelCinema.createReservation({
				user_id: id,
				seatRow,
				seatNumber,
				firstName,
				lastName,
				phone,
			})

			res.status(201).json({ message: 'Reservation created successfully' })
		} catch (e) {
			console.error(e)
			res.status(500).json({ message: 'Internal server error' })
		}
	},
}
