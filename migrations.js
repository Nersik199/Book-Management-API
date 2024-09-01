import Users from './models/Users.js';
import Book from './models/Book.js';
import Review from './models/Review.js';
import Favorite from './models/Favorite.js';
import Comment from './models/Comment.js';

const models = [Users, Book, Review, Favorite, Comment];

(async () => {
	for (const model of models) {
		await model.sync({ alter: true });
		console.log(model.name, 'created table');
	}
})();
