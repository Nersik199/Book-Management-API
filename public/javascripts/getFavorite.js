const token = localStorage.getItem('token');
const section = document.querySelector('.favorite-books');
async function getFavorites() {
	try {
		const response = await axios.get('/book/show/favorites', {
			headers: {
				authorization: token,
			},
		});

		const favorites = response.data.favorites;
		if (favorites.length === 0) {
			section.innerHTML = '<p>No favorites found</p>';
			return;
		}
		console.log(favorites);

		favorites.forEach(async favorite => {
			const containerBook = document.createElement('div');
			containerBook.className = 'book';
			containerBook.innerHTML = `
		        <p>${favorite.book.title}</p>
		        <p>${favorite.book.author}</p>
		        <p>${new Date(favorite.book.createdAt).toLocaleDateString()}</p>
						<div class="reviews-btn">
						<a href="#" class="favorite">
							<lord-icon
							  src="https://cdn.lordicon.com/jjoolpwc.json"
                trigger="hover"
                state="hover-cross"
							  style="width:34px;height:34px;margin-right:10px">
							</lord-icon>
						</a>
						</div>
		        `;
			section.append(containerBook);

			const favoriteBtn = containerBook.querySelector('.favorite');
			favoriteBtn.addEventListener('click', () => {
				delateFavoriteBook(favorite.book.id);
			});
		});
	} catch (error) {
		console.log(error);
	}
}

async function delateFavoriteBook(id) {
	try {
		const response = await axios.delete(
			`/book/${id}/favorite`,
			{
				headers: {
					authorization: token,
				},
			},
			{
				id,
			}
		);
		location.reload();
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
}

getFavorites();
