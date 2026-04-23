import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://kyoudai-hostel-api.onrender.com/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getRooms = () => api.get('/rooms')
export const getRoomById = (id) => api.get(`/rooms/${id}`)
export const createBooking = (data) => api.post('/bookings', data)
export const getBookings = () => api.get('/bookings')
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status })
export const adminLogin = (data) => api.post('/auth/login', data)

export default api
