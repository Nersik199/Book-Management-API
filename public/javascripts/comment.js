const modal = document.querySelector('.modal');

function createComment() {
	const token = localStorage.getItem('token');

	modal.addEventListener('click', async e => {
		if (e.target.classList.contains('review-submit')) {
			const reviewContainer = e.target.closest('.content_rating');
			const id = reviewContainer.querySelector('.reviewId').value;
			const comment = reviewContainer.querySelector('.comment').value;

			if (!comment) {
				alert('Comment is required');
				return;
			}
			if (!token) {
				alert('Please login first');
				location.href = '/users/login';
				return;
			}
			try {
				const response = await axios.post(
					`/comment/review/${id}`,
					{ comment },
					{
						headers: {
							authorization: token,
						},
					}
				);

				console.log(response.data);
			} catch (error) {
				console.error('Error posting comment:', error);
			}
		}
	});
}

async function showComment() {
	modal.addEventListener('click', async e => {
		if (e.target.classList.contains('btn_comments')) {
			const reviewContainer = e.target.closest('.content_rating');
			const id = reviewContainer.querySelector('.reviewId').value;
			const showCommentsContainer =
				reviewContainer.querySelector('.show_comments');

			try {
				const response = await axios.get(`/comment/show/${id}`, {
					headers: {
						authorization: token,
					},
				});
				const comments = response.data.comments;
				console.log(comments);

				showCommentsContainer.innerHTML = '';
				showCommentsContainer.style.backgroundColor = '#333';
				showCommentsContainer.style.padding = '10px';
				showCommentsContainer.style.marginTop = '10px';
				comments.forEach(comment => {
					const commentContainer = document.createElement('div');
					commentContainer.classList = 'comment-box';
					commentContainer.innerHTML = `
					
					<p> ${comment.user.firstName} ${comment.user.lastName}</p>
					<span>date: ${new Date(comment.createdAt).toLocaleDateString()}</span>
					<p>comment: ${comment.comment}</p>
					`;

					showCommentsContainer.appendChild(commentContainer);
				});
			} catch (error) {
				console.error('Error fetching comments:', error);
			}
		}
	});
}
showComment();
createComment();
