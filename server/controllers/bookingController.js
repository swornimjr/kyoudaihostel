import Booking from '../models/Booking.js'
import sendEmail from '../utils/sendEmail.js'

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body)
    sendEmail({
      to: req.body.email,
      subject: 'Booking Request Received — Kyoudai Hostel',
      text: `Hi ${req.body.name}, we received your booking request. We will confirm shortly. — Kyoudai Hostel, Kirtipur`,
    }).catch(() => {})
    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
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
