import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/User.js'
import Room from './models/Room.js'

dotenv.config()

const seed = async () => {
  await connectDB()

  // Admin user
  await User.deleteMany({})
  await User.create({
    name: 'Admin',
    email: 'admin@kyoudaihostel.com',
    password: 'admin123',
  })
  console.log('Admin user created')

  // Rooms
  await Room.deleteMany({})
  await Room.create([
    {
      name: '4-Bed Room',
      type: 'shared-4',
      price: 8000,
      description: 'Cozy 4-bed shared room with a study desk for each resident. Clean and well-ventilated.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 4,
      availableBeds: 4,
    },
    {
      name: '6-Bed Room',
      type: 'shared-6',
      price: 6500,
      description: 'Spacious 6-bed shared room. Great value for students on a budget who still want comfort.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 6,
      availableBeds: 6,
    },
    {
      name: '8-Bed Room',
      type: 'shared-8',
      price: 5500,
      description: 'Budget-friendly 8-bed room. Perfect for long stays and building friendships.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 8,
      availableBeds: 8,
    },
  ])
  console.log('Rooms created')
  process.exit()
}

seed()
