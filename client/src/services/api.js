import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://kyoudai-hostel-api.onrender.com/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getRooms = () => api.get('/rooms')
export const getRoomById = (id) => api.get(`/rooms/${id}`)
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data)
export const createBooking = (data) => api.post('/bookings', data)
export const getBookings = () => api.get('/bookings')
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status })
export const deleteBooking = (id) => api.delete(`/bookings/${id}`)
export const adminLogin = (data) => api.post('/auth/login', data)
export const createApplication = (data) => api.post('/applications', data)
export const getApplications = () => api.get('/applications')
export const updateApplicationStatus = (id, data) => api.put(`/applications/${id}`, data)
export const deleteApplication = (id) => api.delete(`/applications/${id}`)

export default api
