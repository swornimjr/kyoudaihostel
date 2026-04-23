import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)
