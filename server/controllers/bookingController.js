import Booking from '../models/Booking.js'
import sendEmail from '../utils/sendEmail.js'

export const createBooking = async (req, res) => {
  try {
    const data = { ...req.body }
    if (!data.room) delete data.room
    if (!data.checkIn) delete data.checkIn
    if (!data.checkOut) delete data.checkOut
    if (!data.visitDate) delete data.visitDate
    const booking = await Booking.create(data)
    const isInspection = req.body.type === 'inspection'
    const adminEmails = process.env.ADMIN_EMAILS || ''

    // Notify admins
    sendEmail({
      to: adminEmails,
      subject: isInspection
        ? `New Inspection Request — ${req.body.name}`
        : `New Booking Request — ${req.body.name}`,
      text: isInspection
        ? `A new inspection visit has been requested.\n\nName: ${req.body.name}\nPhone: ${req.body.phone}\nEmail: ${req.body.email || '—'}\nPreferred Visit Date: ${req.body.visitDate || '—'}\nMessage: ${req.body.message || '—'}\n\nLog in to the admin dashboard to confirm.`
        : `A new booking request has been submitted.\n\nName: ${req.body.name}\nPhone: ${req.body.phone}\nEmail: ${req.body.email || '—'}\nMessage: ${req.body.message || '—'}\n\nLog in to the admin dashboard to confirm.`,
    }).catch((err) => console.error('Admin email failed:', err))

    // Confirm to visitor/student if email provided
    if (req.body.email) {
      sendEmail({
        to: req.body.email,
        subject: isInspection
          ? 'Inspection Request Received — Kyoudai Boy\'s Hostel'
          : 'Booking Request Received — Kyoudai Hostel',
        text: isInspection
          ? `Dear ${req.body.name},\n\nThank you for your interest in Kyoudai Boy's Hostel, Kirtipur.\n\nWe have received your inspection request for ${req.body.visitDate || 'your preferred date'} and will confirm the visit time via phone or WhatsApp within a few hours.\n\nRegards,\nKyoudai Boy's Hostel\nKirtipur, Kathmandu`
          : `Hi ${req.body.name}, we received your booking request. We will confirm shortly. — Kyoudai Hostel, Kirtipur`,
      }).catch((err) => console.error('Visitor email failed:', err))
    }

    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('room', 'name type price').sort('-createdAt')
  res.json(bookings)
}

export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
}

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
  res.json(booking)
}
