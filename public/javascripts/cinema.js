const seatsContainer = document.querySelector('#seats-container')
const bookingModal = document.querySelector('#bookingModal')
const modalOverlay = document.querySelector('#modalOverlay')
const closeModalButton = document.querySelector('#closeModal')
const token = localStorage.getItem('token')

async function fetchReservedSeats() {
	try {
		const response = await axios.get('/cinema/reservedSeats', {
			headers: {
				'x-token': token,
			},
		})
		return response.data.reservedSeats
	} catch (error) {
		console.error('Error fetching reserved seats:', error)
		return []
	}
}

async function createSeats() {
	const seatData = []
	const reservedSeats = await fetchReservedSeats()

	for (let row = 1; row <= 5; row++) {
		for (let seatNumber = 1; seatNumber <= 5; seatNumber++) {
			const isOccupied = reservedSeats.some(
				reserved =>
					reserved.seat_row === row && reserved.seat_number === seatNumber
			)
			seatData.push({
				seat_row: row,
				seat_number: seatNumber,
				id: `${row}-${seatNumber}`,
				occupied: isOccupied,
			})
		}
	}

	seatData.forEach(seat => {
		const seatElement = document.createElement('div')
		seatElement.className = 'seat'
		seatElement.textContent = `Row ${seat.seat_row}, Seat ${seat.seat_number}`
		seatElement.dataset.seatRow = seat.seat_row
		seatElement.dataset.seatNumber = seat.seat_number

		if (seat.occupied) {
			seatElement.classList.add('occupied')
		}

		seatElement.addEventListener('click', () => {
			if (seat.occupied) {
				alert('This seat is already taken.')
				return
			}
			const data = document.querySelectorAll('.seat')
			data.forEach(s => s.classList.remove('selected'))
			seatElement.classList.add('selected')
			selectedSeat = seatElement

			document.getElementById('selectedSeatRow').value =
				seatElement.dataset.seatRow
			document.getElementById('selectedSeatNumber').value =
				seatElement.dataset.seatNumber

			bookingModal.classList.add('active')
			modalOverlay.classList.add('active')
		})

		seatsContainer.appendChild(seatElement)
	})

	return seatData
}

createSeats()

closeModalButton.addEventListener('click', () => {
	bookingModal.classList.remove('active')
	modalOverlay.classList.remove('active')
})
