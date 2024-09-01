import Comment from '../models/Comment.js';

export default {
	createComment: async (req, res) => {
		try {
			const { comment } = req.body;
			const { id: userId } = req.user;
			const { id: reviewId } = req.params;

			const newComment = await Comment.create({
				comment,
				userId,
				reviewId,
			});
			res
				.status(201)
				.json({ newComment, message: 'Comment created successfully' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error.message });
		}
	},

	getComments: async (req, res) => {
		try {
			const { id: reviewId } = req.params;
			const limit = 5;
			const { page = 1 } = req.query;
			const offset = (page - 1) * limit;
			const comments = await Comment.findAll({
				where: { reviewId },
				include: ['user'],
				limit,
				offset,
			});
			console.log(comments);

			res.status(200).json({ comments });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error.message });
		}
	},
};
