import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  type: { type: String, enum: ['booking', 'inspection'], default: 'booking' },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkIn: { type: Date },
  checkOut: { type: Date },
  visitDate: { type: Date },
  message: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)
