import { Router } from 'express'
import users from './users.js'
import cinema from './cinema.js'

const router = Router()

router.get('/', (req, res) => {
	res.render('login')
})
router.use('/users', users)
router.use('/cinema', cinema)

export default router
