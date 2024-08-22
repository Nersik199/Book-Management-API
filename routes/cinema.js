import { Router } from 'express'

import controllers from '../controllers/controllers.Cinema.js'
import checkToken from '../middleware/checkToken.js'
import validate from '../middleware/validate.js'
import cinemaSchema from '../schemas/cinema.js'

const router = Router()

router.get('/showReservation', (req, res) => {
	res.render('showReservation')
})

router.get('/reservedSeats', checkToken, controllers.getReservedSeats)
router.get('/bookingHistory', controllers.getBookingHistory)

router.post(
	'/reservation',
	validate(cinemaSchema.createReservation, 'body'),
	checkToken,
	controllers.createReservation
)

export default router
