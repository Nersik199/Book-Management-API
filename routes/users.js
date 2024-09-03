import { Router } from 'express';

import controllers from '../controllers/controllers.Users.js';

import checkToken from '../middleware/checkToken.js';
import validate from '../middleware/validate.js';

import userSchema from '../schemas/users.js';

const router = Router();

//views
router.get('/registration', (req, res) => {
	res.render('registration');
});
router.get('/login', (req, res) => {
	res.render('login');
});
router.get('/profile', (req, res) => {
	res.render('profile');
});
router.get('/profile/data', (req, res) => {
	res.render('usersList');
});
router.get('/update/user/profile', (req, res) => {
	res.render('UpdateUserProfile');
});

//Api
router.post(
	'/registration',
	validate(userSchema.register, 'body'),
	controllers.registration
);
router.post('/login', validate(userSchema.login, 'body'), controllers.login);
router.get('/user/profile', checkToken, controllers.userProfile);
router.get('/:userId/review-summary', checkToken, controllers.userRatingsBook);
router.get('/most-active', checkToken, controllers.mostActiveUsers);
router.put(
	'/update/user/profile',
	checkToken,
	validate(userSchema.userUpdate, 'body'),
	controllers.userUpdate
);

export default router;
