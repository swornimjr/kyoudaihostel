import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && await user.matchPassword(password)) {
      res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: err.message })
  }
}
