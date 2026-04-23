import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRooms, createBooking } from '../services/api'

const fallbackRooms = [
  { _id: '1', name: '4-Bed Room', price: 8000, availableBeds: 2 },
  { _id: '2', name: '6-Bed Room', price: 6500, availableBeds: 3 },
  { _id: '3', name: '8-Bed Room', price: 5500, availableBeds: 4 },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  room: '',
  checkIn: '',
  checkOut: '',
  message: '',
}

export default function Book() {
  const [searchParams] = useSearchParams()
  const [rooms, setRooms] = useState(fallbackRooms)
  const [form, setForm] = useState({ ...initialForm, room: searchParams.get('room') || '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  useEffect(() => {
    getRooms()
      .then((res) => { if (res.data.length > 0) setRooms(res.data) })
      .catch(() => {})
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await createBooking(form)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const selectedRoom = rooms.find((r) => r._id === form.room)

  return (
    <div className="flex flex-col">

      {/* Page header */}
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">SECURE YOUR SPOT</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Book a Bed</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Fill in the form below and we'll confirm your booking within 24 hours.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100 text-center flex flex-col items-center gap-4">
                <div className="text-5xl">✅</div>
                <h2 className="font-serif text-2xl font-bold text-[#1C2B4B]">Booking Request Sent!</h2>
                <p className="text-gray-500 leading-relaxed max-w-sm">
                  We've received your request and will confirm via email or phone within 24 hours.
                  Thank you for choosing Kyoudai Hostel.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 bg-[#B5202A] text-white px-8 py-3 text-sm tracking-widest rounded hover:bg-[#8B1520] transition-colors"
                >
                  MAKE ANOTHER BOOKING
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
                <h2 className="font-serif text-xl font-bold text-[#1C2B4B] mb-2">Your Details</h2>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest text-gray-500">FULL NAME *</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your full name"
                    className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest text-gray-500">EMAIL ADDRESS *</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="your@email.com"
                    className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest text-gray-500">PHONE / WHATSAPP *</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+977 98XXXXXXXX"
                    className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
                  />
                </div>

                {/* Room */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest text-gray-500">SELECT ROOM *</label>
                  <select
                    name="room" value={form.room} onChange={handleChange} required
                    className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors bg-white"
                  >
                    <option value="">Choose a room...</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id} disabled={room.availableBeds === 0}>
                        {room.name} — NPR {room.price.toLocaleString()}/month
                        {room.availableBeds === 0 ? ' (Full)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest text-gray-500">CHECK-IN DATE *</label>
                    <input
                      type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required
                      min={new Date().toISOString().split('T')[0]}
                      className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest text-gray-500">CHECK-OUT DATE *</label>
                    <input
                      type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required
                      min={form.checkIn || new Date().toISOString().split('T')[0]}
                      className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest text-gray-500">MESSAGE (OPTIONAL)</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Any questions or special requests..."
                    rows={3}
                    className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#B5202A] hover:bg-[#8B1520] text-white py-3 tracking-widest text-sm rounded transition-colors disabled:opacity-60 mt-2"
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND BOOKING REQUEST'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We'll confirm your booking within 24 hours via email or phone.
                </p>
              </form>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="flex flex-col gap-4">

            {/* Selected room summary */}
            {selectedRoom && (
              <div className="bg-[#1C2B4B] text-white rounded-lg p-6">
                <p className="text-xs tracking-widest text-[#C9962A] mb-3">SELECTED ROOM</p>
                <h3 className="font-serif text-lg font-bold mb-1">{selectedRoom.name}</h3>
                <p className="text-2xl font-bold text-[#C9962A] mt-3">
                  NPR {selectedRoom.price.toLocaleString()}
                  <span className="text-sm text-gray-400 font-normal"> /month</span>
                </p>
              </div>
            )}

            {/* What's included */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <p className="text-xs tracking-widest text-[#B5202A] mb-4">ALL ROOMS INCLUDE</p>
              {[
                '🍱 Breakfast, Lunch & Dinner',
                '👕 Laundry Service',
                '📶 Free Wi-Fi',
                '💡 Water & Electricity',
                '📚 Common Study Area',
                '🧹 Regular Cleaning',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9779863035404"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 text-center text-sm tracking-widest transition-colors"
            >
              PREFER WHATSAPP? →
            </a>
          </div>

        </div>
      </section>

    </div>
  )
}
