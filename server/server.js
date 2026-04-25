import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'

dotenv.config()
connectDB()

fs.mkdirSync('uploads', { recursive: true })

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/', (req, res) => res.json({ message: 'Kyoudai Hostel API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
