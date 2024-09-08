import { Router } from 'express';

import controllers from '../controllers/controllers.Book.js';

import checkToken from '../middleware/checkToken.js';
import validate from '../middleware/validate.js';
import checkFile from '../middleware/checkFile.js';

import schemaBook from '../schemas/book.js';

const router = Router();

//views
router.get('/create', (req, res) => {
	res.render('createBook');
});
router.get('/get/favorites', (req, res) => {
	res.render('getFavorite');
});
router.get('/search/books', (req, res) => {
	res.render('searchBook');
});

router.post(
	'/create',
	checkFile('public/images/books').single('image'),
	validate(schemaBook.createBook, 'body'),
	checkToken,
	controllers.createBook
);
router.get('/show/books', checkToken, controllers.getBook);
router.get('/search', checkToken, controllers.bookSearch);
router.get('/show/:id', checkToken, controllers.showBook);

router.get('/top-rated', checkToken, controllers.getTopRated);
router.get('/authors/book-count', checkToken, controllers.getAuthorCount);

router.put(
	'/update/:id',
	checkFile('public/images/books').single('image'),
	validate(schemaBook.updateBook, 'body'),
	checkToken,
	controllers.updateBook
);
router.delete('/delete/:id', checkToken, controllers.deleteBook);

router.get('/favorites', checkToken, controllers.getFavorite);
router.post('/:id/favorite', checkToken, controllers.createFavorite);
router.delete('/:id/favorite', checkToken, controllers.deleteFavorite);
export default router;
