import { Router } from 'express'

import controllers from '../controllers/controllers.Users.js'

import checkToken from '../middleware/checkToken.js'
import validate from '../middleware/validate.js'

import userSchema from '../schemas/users.js'

const router = Router()

//views
router.get('/registration', (req, res) => {
	res.render('registration')
})
router.get('/login', (req, res) => {
	res.render('login')
})
router.get('/profile', (req, res) => {
	res.render('profile')
})
router.get('/profile/data', (req, res) => {
	res.render('usersList')
})
router.get('/updateUserProfile', (req, res) => {
	res.render('showUpdateUserProfile')
})

//Api

router.post(
	'/registration',
	validate(userSchema.register, 'body'),
	controllers.registration
)
router.post('/login', validate(userSchema.login, 'body'), controllers.login)
router.get('/getUsersList', checkToken, controllers.getUsers)
router.get('/getUserProfile', checkToken, controllers.getUserProfile)
router.put(
	'/updateUserProfile',
	checkToken,
	validate(userSchema.userUpdate, 'body'),
	controllers.userUpdate
)
router.delete('/deleteUser/:id', checkToken, controllers.deleteUser)
export default router
