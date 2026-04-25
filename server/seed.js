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
    // 2-Bed Rooms (2 rooms)
    {
      name: '2-Bed Room',
      roomNumber: '101',
      type: 'shared-2',
      price: 13000,
      description: 'Private and cozy 2-bed shared room. Ideal for those who prefer a quieter, more personal space.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 2,
      availableBeds: 0,
    },
    {
      name: '2-Bed Room',
      roomNumber: '102',
      type: 'shared-2',
      price: 13000,
      description: 'Private and cozy 2-bed shared room. Ideal for those who prefer a quieter, more personal space.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 2,
      availableBeds: 0,
    },
    // 3-Bed Rooms (6 rooms — 5 fully booked, 1 with 2 beds available)
    {
      name: '3-Bed Room',
      roomNumber: '201',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 0,
    },
    {
      name: '3-Bed Room',
      roomNumber: '202',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 0,
    },
    {
      name: '3-Bed Room',
      roomNumber: '203',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 0,
    },
    {
      name: '3-Bed Room',
      roomNumber: '204',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 0,
    },
    {
      name: '3-Bed Room',
      roomNumber: '205',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 2,
    },
    {
      name: '3-Bed Room',
      roomNumber: '206',
      type: 'shared-3',
      price: 12000,
      description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 3,
      availableBeds: 0,
    },
    // 4-Bed Room (1 big room)
    {
      name: '4-Bed Room',
      roomNumber: '301',
      type: 'shared-4',
      price: 11000,
      description: 'Spacious big room with 4 beds. Perfect for groups of friends or those who enjoy a lively atmosphere.',
      amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
      totalBeds: 4,
      availableBeds: 0,
    },
  ])
  console.log('Rooms created')
  process.exit()
}

seed()
