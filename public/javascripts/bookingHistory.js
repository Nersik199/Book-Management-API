const historyContainer = document.getElementById('bookingHistory')

async function fetchBookingHistory() {
	try {
		const response = await axios.get('/cinema/bookingHistory', {
			headers: {
				'x-token': localStorage.getItem('token'),
			},
		})
		const bookings = response.data.bookings

		bookings.forEach(booking => {
			const bookingElement = document.createElement('div')
			const bookingDate = new Date(booking.createdAt)
			const formattedDate = `${bookingDate.toLocaleDateString()} ${bookingDate.toLocaleTimeString()}`
			bookingElement.textContent = `
       ${booking.firstName} ${booking.lastName} booked seat
       ${booking.seat_row}/${booking.seat_number} on ${formattedDate}`
			historyContainer.append(bookingElement)
		})
	} catch (error) {
		if (error.response && error.response.status === 404) {
			const elementH2 = document.createElement('h2')
			elementH2.innerText = error.response.data.message
			historyContainer.append(elementH2)
		}
		console.error('Error fetching booking history:', error)
	}
}

fetchBookingHistory()
