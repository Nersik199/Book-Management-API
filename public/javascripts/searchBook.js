const token = localStorage.getItem('token');

function searchBook() {
	const search = document.querySelector('#search');
	const resultsContainer = document.querySelector('#results');

	search.addEventListener('input', async e => {
		const value = e.target.value;
		resultsContainer.innerHTML = '';

		if (value) {
			try {
				const response = await axios.get(`/book/search?q=${value.trim()}`, {
					headers: {
						authorization: token,
					},
				});

				const books = response.data.books;

				books.forEach(book => {
					const resultItem = document.createElement('div');
					resultItem.className = 'result-item';
					resultItem.textContent = book.title;
					resultsContainer.appendChild(resultItem);
					resultItem.addEventListener('click', () => {
						openSearch(book.id);
					});
				});
			} catch (error) {
				console.log(error);
			}
		}
	});
}

async function openSearch(bookId) {
	const getSearchBook = document.querySelector('#get-search-book');
	const search = document.querySelector('#search');
	const resultItem = document.querySelector('#results');
	resultItem.innerHTML = '';
	search.value = '';

	try {
		const response = await axios.get(`/book/show/${bookId}`, {
			headers: {
				authorization: token,
			},
		});

		const books = response.data.book;
		const info = document.createElement('div');

		info.className = 'info';
		info.innerHTML = `

		<img src="${books.image}" class="book-cover" alt="Book Cover">
		<p>book title: ${books.title}</p>
		<p>author: ${books.author}</p>
		<p>category: ${books.category}</p>
		`;

		getSearchBook.appendChild(info);
		console.log(books);
	} catch (error) {
		console.log(error);
	}
}

searchBook();
