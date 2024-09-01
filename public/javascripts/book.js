const url = '/book/show/books';
const token = localStorage.getItem('token');
const section = document.querySelector('#books');
async function getBooks() {
	try {
		const response = await axios.get(url, {
			headers: {
				authorization: token,
			},
		});
		const books = response.data.books;
		if (books.length === 0) {
			section.innerHTML = 'No books found';
			return;
		}
		console.log(books);

		books.forEach(async book => {
			const containerBook = document.createElement('div');
			containerBook.className = 'book';
			containerBook.innerHTML = `
		        <h3> ${book.title}</h3>
		        <p> author: ${book.author}</p>
						<p>category: ${book.category}</p>
		        <p>${book.user.firstName} ${book.user.lastName}</p>
		        <p>${new Date(book.createdAt).toLocaleDateString()}</p>
						<div class="reviews-btn">
						<a href="#" class="favorite">
							<lord-icon
							src="https://cdn.lordicon.com/jjoolpwc.json"
							trigger="hover"
							stroke="bold"

							style="width:34px;height:34px;margin-right:10px">
							</lord-icon>
						</a>
						
							<button class="btn button-10">Reviews</button>
							<button class="show_reviews button-10">show reviews</button>
						</div>
		        `;
			section.append(containerBook);

			const btn = containerBook.querySelector('.btn');
			btn.addEventListener('click', async () => {
				await modalShow(book.id);
			});

			const showBtn = containerBook.querySelector('.show_reviews');
			showBtn.addEventListener('click', async () => {
				await showReviews(book.id);
			});

			const favoriteBtn = containerBook.querySelector('.favorite');
			favoriteBtn.addEventListener('click', async () => {
				await crateFavorite(book.id);
			});
		});
	} catch (error) {
		console.error(error);
	}
}

async function modalShow(id) {
	const modal = document.querySelector('.modal');
	const bookId = id;
	modal.innerHTML = `
					<span class="close">&times;</span>
					<h2>Reviews</h2>
					<div id="reviews">
						<textarea name="review" id="review" ></textarea>
						<span id="error-review"></span>
						<div id="rating">
							<form >
						<fieldset>
							<span class="star-cb-group">
								<input
									type="radio"
									id="rating-5"
									name="rating"
									value="5"
								/><label for="rating-5">5</label>
								<input
									type="radio"
									id="rating-4"
									name="rating"
									value="4"
									
								/><label for="rating-4">4</label>
								<input
									type="radio"
									id="rating-3"
									name="rating"
                  checked="checked"
									value="3"
								/><label for="rating-3">3</label>
								<input
									type="radio"
									id="rating-2"
									name="rating"
									value="2"
								/><label for="rating-2">2</label>
								<input
									type="radio"
									id="rating-1"
									name="rating"
									value="1"
								/><label for="rating-1">1</label>
								<input
									type="radio"
									id="rating-0"
									name="rating"
									value="0"
									class="star-cb-clear"
								/><label for="rating-0">0</label>
							</span>
						</fieldset>
							
					</form>
					</div>
						<button class="button-10" id="submit">Submit</button>
					</div>
			`;
	section.append(modal);
	createReview(bookId);
	const close = document.querySelector('.close');
	close.addEventListener('click', () => {
		modal.style.display = 'none';
	});
	modal.style.display = 'block';
}

async function createReview(id) {
	const submit = document.querySelector('#submit');
	const ratingContainer = document.querySelector('#rating');

	let rating = null;

	const radioButtons = ratingContainer.querySelectorAll('[type="radio"]');

	radioButtons.forEach(radio => {
		radio.addEventListener('click', e => {
			rating = e.target.value;
		});
	});

	submit.addEventListener('click', async () => {
		try {
			const reviewText = document.querySelector('#review').value;

			if (!reviewText) {
				alert('Review is required');
				return;
			}

			const response = await axios.post(
				`/review/${id}`,
				{
					review: reviewText,
					rating: rating || 3,
				},
				{
					headers: {
						authorization: token,
					},
				}
			);
			alert('review created successfully');
		} catch (e) {
			const error = e.response.data.fields;
			console.log(error);

			if (error) {
				const errorContainer = document.querySelector('#error-review');
				console.log(error.review);
				errorContainer.innerHTML = `<p>${error.review}</p>`;
				errorContainer.style.color = 'red';

				setInterval(() => {
					errorContainer.innerHTML = '';
				}, 9000);

				return;
			}
			console.log(error.response.data.fields);
		}
	});
}

async function showReviews(id) {
	const modal = document.querySelector('.modal');
	const span = document.createElement('span');
	try {
		const response = await axios.get(`/review/${id}`, {
			headers: {
				authorization: token,
			},
		});

		const reviews = response.data.reviews;

		span.innerHTML = `	<span class="close">&times;</span>`;

		if (reviews.length === 0) {
			alert('No reviews found');
			return;
		}

		modal.innerHTML = '';

		reviews.forEach(review => {
			const reviewContainer = document.createElement('div');
			reviewContainer.classList = 'content_rating';
			reviewContainer.innerHTML = `
			<p> ${review.user.firstName} ${review.user.lastName}</p>
			<span>date: ${new Date(review.createdAt).toLocaleDateString()}</span>
						<p>review: ${review.review}</p>
						<p>rating: ${review.rating}</p>
						<div class="comment-container">
								<input type="text" placeholder="add comment" class="comment" >
								<input type="hidden" class="reviewId" value="${review.id}">
								<input type="submit" class="review-submit button-10" >
						</div>
						<button class="btn_comments button-10">show comments</button>
						<div class="show_comments"></div>
					`;
			modal.prepend(span);
			modal.append(reviewContainer);
		});

		modal.style.display = 'block';
		modal.style.top = '100px';
		modal.style.zIndex = '1000';
		modal.style.width = '400px';
		modal.style.height = 'auto';

		const close = document.querySelector('.close');
		close.addEventListener('click', () => {
			modal.style.display = 'none';
		});

		console.log(reviews);
	} catch (error) {
		console.error('Error fetching reviews:', error);
	}
}

async function crateFavorite(id) {
	try {
		const response = await axios.post(
			`/book/${id}/favorite`,
			{
				id,
			},
			{
				headers: {
					authorization: token,
				},
			}
		);
		console.log(response.data);
	} catch (error) {
		console.log(error);
		const response = error.response;
		if (response.status === 500) {
			alert('you have already chosen this book');
		}
	}
}

getBooks();
