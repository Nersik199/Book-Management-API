const form = document.querySelector('#login-form')

form.addEventListener('submit', async event => {
	event.preventDefault()

	const data = {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value,
	}
	const error = document.querySelectorAll('.error')
	error.forEach(span => {
		span.textContent = ''
	})

	try {
		const response = await axios.post('/users/login', data)
		const token = response.data.token

		if (token) {
			localStorage.setItem('token', token)
			location.href = '/users/profile'
		} else {
			console.log('Login failed, no token received.')
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const spanElement = document.createElement('p')
			spanElement.innerText = error.response.data.message
			form.append(spanElement)
		} else {
			console.error('Error without response:', error.message)
		}
	}
})
