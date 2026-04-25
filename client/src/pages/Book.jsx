import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRooms, createBooking } from '../services/api'

const initialForm = { name: '', phone: '', email: '', room: '', visitDate: '', message: '' }

export default function Book() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({ ...initialForm, room: searchParams.get('room') || '' })
  const [rooms, setRooms] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    getRooms().then((res) => setRooms(res.data)).catch(() => {})
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await createBooking({ ...form, type: 'inspection' })
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col">
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">VISIT US</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Book an Inspection</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Want to see the hostel before applying? Schedule a visit and we'll show you around.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-4 py-16 w-full">
        {status === 'success' ? (
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
            <h2 className="font-serif text-2xl font-bold text-[#1C2B4B]">Visit Scheduled!</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              We've received your visit request and will confirm the time via phone or WhatsApp within a few hours.
            </p>
            <button onClick={() => setStatus('idle')}
              className="mt-2 bg-[#B5202A] text-white px-8 py-3 text-xs tracking-widest rounded hover:bg-[#8B1520] transition-colors">
              BOOK ANOTHER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col gap-5">
            <h2 className="font-serif text-xl font-bold text-[#1C2B4B]">Your Details</h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">FULL NAME <span className="text-red-400">*</span></label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required
                placeholder="Your full name"
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">PHONE / WHATSAPP <span className="text-red-400">*</span></label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                placeholder="+977 98XXXXXXXX"
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">EMAIL</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com"
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">ROOM INTERESTED IN</label>
              <select name="room" value={form.room} onChange={handleChange}
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors bg-white">
                <option value="">No preference / General visit</option>
                {rooms.filter((r) => r.availableBeds > 0).map((r) => (
                  <option key={r._id} value={r._id}>
                    Room {r.roomNumber} · {r.name} — NPR {r.price.toLocaleString()}/month
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">PREFERRED VISIT DATE <span className="text-red-400">*</span></label>
              <input type="date" name="visitDate" value={form.visitDate} onChange={handleChange} required
                min={new Date().toISOString().split('T')[0]}
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-gray-500">MESSAGE (OPTIONAL)</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Any questions or specific things you'd like to see..."
                rows={3}
                className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors resize-none" />
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded">{error}</p>}

            <button type="submit" disabled={status === 'loading'}
              className="bg-[#B5202A] hover:bg-[#8B1520] text-white py-3 tracking-widest text-sm rounded transition-colors disabled:opacity-60 mt-2">
              {status === 'loading' ? 'SENDING...' : 'REQUEST VISIT'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              We'll confirm your visit within a few hours via phone or WhatsApp.
            </p>
          </form>
        )}
      </section>
    </div>
  )
}
