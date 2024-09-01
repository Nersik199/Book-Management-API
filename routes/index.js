import { Router } from 'express';

import users from './users.js';
import book from './book.js';
import review from './review.js';
import comment from './comment.js';
import admin from './admin.js';

const router = Router();

router.get('/', (req, res) => {
	res.render('login');
});
router.use('/users', users);
router.use('/book', book);
router.use('/review', review);
router.use('/comment', comment);
router.use('/admin', admin);
export default router;
