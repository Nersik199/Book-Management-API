import { Router } from 'express';

import checkToken from '../middleware/checkToken.js';
import controllers from '../controllers/controllers.Review.js';

import validate from '../middleware/validate.js';
import schemaReview from '../schemas/review.js';
const router = Router();

router.get('/show', (req, res) => {
	res.render('showReviews');
});

router.post(
	'/:id',
	validate(schemaReview.createReview, 'body'),
	checkToken,
	controllers.createReview
);
router.get('/:id', checkToken, controllers.showReview);

export default router;
