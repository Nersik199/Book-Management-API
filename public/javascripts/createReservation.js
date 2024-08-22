const bookingForm = document.querySelector('.form-container')

bookingForm.addEventListener('submit', async event => {
	event.preventDefault()
	const data = {
		seatRow: document.querySelector('#selectedSeatRow').value,
		seatNumber: document.querySelector('#selectedSeatNumber').value,
		firstName: document.querySelector('#firstName').value,
		lastName: document.querySelector('#lastName').value,
		phone: document.querySelector('#phone').value,
	}
	if (!token) {
		alert('No token found. Please login first.')
		location.href = '/users/login'
		return
	}
	try {
		await axios.post('/cinema/reservation', data, {
			headers: {
				'x-token': localStorage.getItem('token'),
			},
		})
		alert('Reservation successful!')
		bookingModal.classList.remove('active')
		modalOverlay.classList.remove('active')
		location.reload()
		bookingForm.reset()
		document
			.querySelectorAll('.seat.selected')
			.forEach(s => s.classList.remove('selected'))
	} catch (e) {
		const fields = e.response.data.fields
		if (fields) {
			Object.keys(fields).forEach(key => {
				const messages = fields[key]

				const errorSpan = document.querySelector(`#${key}-error`)
				if (errorSpan) {
					errorSpan.textContent = messages
				}
			})
			console.error('Error making reservation:', e)
		}
	}
})
