import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })
import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import sendEmail from './utils/sendEmail.js'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/api/test-email', async (req, res) => {
  const to = req.query.to || process.env.ADMIN_EMAILS
  try {
    await sendEmail({ to, subject: 'Kyoudai Hostel — Email Test', text: 'Test email from production server.' })
    res.json({ success: true, sent_to: to })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

app.get('/', (req, res) => res.json({ message: 'Kyoudai Hostel API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
