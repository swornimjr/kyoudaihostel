import Booking from '../models/Booking.js'
import sendEmail from '../utils/sendEmail.js'

export const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body)
  await sendEmail({
    to: req.body.email,
    subject: 'Booking Request Received — Kyoudai Hostel',
    text: `Hi ${req.body.name}, we received your booking request. We will confirm shortly. — Kyoudai Hostel, Kirtipur`,
  })
  res.status(201).json(booking)
}

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('room', 'name type price').sort('-createdAt')
  res.json(bookings)
}

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
  res.json(booking)
}
