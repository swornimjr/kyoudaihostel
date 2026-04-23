import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['shared-4', 'shared-6', 'shared-8'], required: true },
  price: { type: Number, required: true },
  description: { type: String },
  amenities: [String],
  images: [String],
  totalBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('Room', roomSchema)
