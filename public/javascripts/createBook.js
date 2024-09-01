const form = document.querySelector('.create-book');
const token = localStorage.getItem('token');
form.addEventListener('submit', async e => {
	e.preventDefault();

	if (!token) {
		alert('Please login first');
		location.href = '/users/login';
		return;
	}

	const data = {
		title: document.querySelector('#title').value,
		author: document.querySelector('#author').value,
		category: document.querySelector('#category').value,
	};

	console.log(data);
	if (data.title === '' || data.author === '') {
		alert('Please enter title and author');
		return;
	}
	try {
		const response = await axios.post('/book/create', data, {
			headers: {
				authorization: token,
			},
		});
		alert('book created successfully!');
	} catch (error) {
		const fields = error.response.data.fields;
		console.log(error.response.data.fields);

		if (fields) {
			Object.keys(fields).forEach(key => {
				const messages = fields[key];
				const errorSpan = document.querySelector(`#${key}-error`);
				if (errorSpan) {
					errorSpan.textContent = messages;
					errorSpan.style.color = 'red';
					setInterval(() => {
						errorSpan.textContent = '';
					}, 5000);
				}
			});
		}
	}
});
