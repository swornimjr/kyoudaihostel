import express from 'express'
import { createBooking, getBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/', protect, getBookings)
router.put('/:id', protect, updateBookingStatus)
router.delete('/:id', protect, deleteBooking)

export default router
