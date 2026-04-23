import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/User.js'

dotenv.config()

const seed = async () => {
  await connectDB()
  await User.deleteMany({})
  await User.create({
    name: 'Admin',
    email: 'admin@kyoudaihostel.com',
    password: 'admin123',
  })
  console.log('Admin user created')
  console.log('Email: admin@kyoudaihostel.com')
  console.log('Password: admin123')
  process.exit()
}

seed()
