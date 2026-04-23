import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getBookings, updateBookingStatus } from '../../services/api'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function Dashboard() {
  const { admin, logout } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await getBookings()
      setBookings(res.data)
    } catch {
      // token expired — log out
      logout()
    } finally {
      setLoading(false)
    }
  }

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      )
    } catch {
      alert('Failed to update status.')
    }
  }

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE]">

      {/* Admin navbar */}
      <div className="bg-[#1C2B4B] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-serif font-bold tracking-[0.2em]">KYOUDAI</p>
          <p className="text-[10px] tracking-widest text-[#C9962A]">ADMIN PANEL</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-400">{admin?.name || admin?.email}</span>
          <button
            onClick={logout}
            className="text-xs tracking-widest text-red-400 hover:text-red-300 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total', key: 'all', color: 'text-[#1C2B4B]' },
            { label: 'Pending', key: 'pending', color: 'text-yellow-600' },
            { label: 'Confirmed', key: 'confirmed', color: 'text-green-600' },
            { label: 'Cancelled', key: 'cancelled', color: 'text-red-500' },
          ].map(({ label, key, color }) => (
            <div key={key} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
              <p className={`text-3xl font-bold ${color}`}>{counts[key]}</p>
              <p className="text-xs tracking-widest text-gray-400 mt-1">{label.toUpperCase()}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs tracking-widest rounded transition-colors ${
                filter === f
                  ? 'bg-[#1C2B4B] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {f.toUpperCase()} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Bookings table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center text-gray-400 border border-gray-100">
            No {filter !== 'all' ? filter : ''} bookings yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap gap-4 justify-between items-start">

                  {/* Guest info */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-[#1C2B4B]">{booking.name}</h3>
                    <a href={`mailto:${booking.email}`} className="text-sm text-gray-500 hover:text-[#B5202A]">
                      {booking.email}
                    </a>
                    <a href={`tel:${booking.phone}`} className="text-sm text-gray-500 hover:text-[#B5202A]">
                      {booking.phone}
                    </a>
                  </div>

                  {/* Room + dates */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs tracking-widest text-gray-400">ROOM</p>
                    <p className="text-sm font-semibold text-[#1C2B4B]">
                      {booking.room?.name || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400">
                      NPR {booking.room?.price?.toLocaleString()}/mo
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs tracking-widest text-gray-400">DATES</p>
                    <p className="text-sm text-[#1C2B4B]">
                      {new Date(booking.checkIn).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      to {new Date(booking.checkOut).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Message */}
                  {booking.message && (
                    <div className="flex flex-col gap-1 max-w-xs">
                      <p className="text-xs tracking-widest text-gray-400">MESSAGE</p>
                      <p className="text-sm text-gray-500 italic">"{booking.message}"</p>
                    </div>
                  )}

                  {/* Status + actions */}
                  <div className="flex flex-col gap-3 items-end">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[booking.status]}`}>
                      {booking.status.toUpperCase()}
                    </span>
                    <div className="flex gap-2">
                      {booking.status !== 'confirmed' && (
                        <button
                          onClick={() => handleStatus(booking._id, 'confirmed')}
                          className="text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded tracking-widest transition-colors"
                        >
                          CONFIRM
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatus(booking._id, 'cancelled')}
                          className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded tracking-widest transition-colors"
                        >
                          CANCEL
                        </button>
                      )}
                      {booking.status !== 'pending' && (
                        <button
                          onClick={() => handleStatus(booking._id, 'pending')}
                          className="text-xs px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded tracking-widest transition-colors"
                        >
                          RESET
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-300">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
