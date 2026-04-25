import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getBookings, updateBookingStatus, getRooms, updateRoom, getApplications, updateApplicationStatus } from '../../services/api'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const apiBase = (import.meta.env.VITE_API_URL || 'https://kyoudai-hostel-api.onrender.com/api').replace('/api', '')

export default function Dashboard() {
  const { admin, logout } = useAuth()
  const [tab, setTab] = useState('bookings')

  // Bookings state
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  // Rooms state
  const [rooms, setRooms] = useState([])
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [updatingRoom, setUpdatingRoom] = useState(null)

  // Applications state
  const [applications, setApplications] = useState([])
  const [appsLoading, setAppsLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
    fetchRooms()
    fetchApplications()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await getBookings()
      setBookings(res.data)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const fetchRooms = async () => {
    try {
      const res = await getRooms()
      setRooms(res.data.sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)))
    } catch {
    } finally {
      setRoomsLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await getApplications()
      setApplications(res.data)
    } catch {
    } finally {
      setAppsLoading(false)
    }
  }

  const printApplication = (app) => {
    const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://kyoudai-hostel-api.onrender.com'
    const photoUrl = app.ppPhoto ? `${apiBase}/${app.ppPhoto}` : null
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>Application - ${app.nameEnglish}</title>
    <style>
      body { font-family: Arial, sans-serif; font-size: 12px; margin: 20px; color: #000; }
      h1 { text-align: center; font-size: 16px; margin: 0; }
      h2 { text-align: center; font-size: 13px; margin: 2px 0 8px; font-weight: normal; }
      .badge { display: block; text-align: center; background: #B5202A; color: white; font-size: 13px; font-weight: bold; padding: 4px 0; margin: 8px 0; }
      .header-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
      .photo-box { width: 80px; height: 100px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #666; overflow: hidden; }
      .photo-box img { width: 100%; height: 100%; object-fit: cover; }
      .section-title { background: #1C2B4B; color: white; text-align: center; padding: 3px; font-size: 11px; font-weight: bold; margin: 10px 0 6px; }
      .row { display: flex; gap: 8px; margin-bottom: 5px; }
      .field { flex: 1; }
      .label { font-size: 10px; color: #555; }
      .value { border-bottom: 1px solid #000; min-height: 16px; padding: 1px 2px; font-size: 12px; }
      .declaration { font-size: 10px; margin: 10px 0; border: 1px solid #ccc; padding: 6px; }
      .official { background: #f5f0e0; border: 1px solid #ccc; padding: 8px; margin-top: 10px; }
      .official-title { text-align: center; font-weight: bold; font-size: 11px; color: #B5202A; margin-bottom: 6px; }
      .sig { margin-top: 20px; text-align: right; font-size: 11px; }
      @media print { body { margin: 10px; } }
    </style></head><body>
    <div class="header-row">
      <div><strong>Form No.</strong> ${app.formNo || '___________'}</div>
      <div style="text-align:center;flex:1">
        <h1>Kyoudai Boy's Hostel</h1>
        <h2>Kritipur, Town Planning</h2>
        <div class="badge">Student Application Form</div>
      </div>
      <div class="photo-box">${photoUrl ? `<img src="${photoUrl}" />` : 'PP Photo'}</div>
    </div>
    <div style="margin-bottom:8px;font-size:11px;">
      <strong>Date:</strong> ${new Date(app.createdAt).toLocaleDateString()}
      &nbsp;&nbsp; I, <strong>${app.nameEnglish}</strong>, being interested to live in the hostel have submitted this application along with other necessary documents.
    </div>
    <div class="section-title">STUDENT'S PROFILE</div>
    <div class="row">
      <div class="field"><div class="label">Student's Name (IN CAPITAL)</div><div class="value">${app.nameEnglish}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Student's Name (IN NEPALI)</div><div class="value">${app.nameNepali || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Date of Birth</div><div class="value">${app.dateOfBirth}</div></div>
      <div class="field"><div class="label">Contact No.</div><div class="value">${app.contactNo}</div></div>
      <div class="field"><div class="label">E-mail</div><div class="value">${app.email || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">District</div><div class="value">${app.district}</div></div>
      <div class="field"><div class="label">Metro/Sub-Metro/Rural/Municipality</div><div class="value">${app.municipality}</div></div>
    </div>
    <div class="row">
      <div class="field" style="max-width:80px"><div class="label">Ward No.</div><div class="value">${app.wardNo}</div></div>
      <div class="field"><div class="label">Street Name/Tole/Chowk</div><div class="value">${app.streetToleChowk || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Citizenship No. / Date of Issue / Place</div><div class="value">${[app.citizenshipNo, app.citizenshipIssueDate, app.citizenshipIssuePlace].filter(Boolean).join(' / ')}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Name of Educational Institute</div><div class="value">${app.educationalInstitute}</div></div>
      <div class="field" style="max-width:120px"><div class="label">Class Time</div><div class="value">${app.classTime || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Level of Study</div><div class="value">${app.levelOfStudy}</div></div>
      <div class="field"><div class="label">Time duration to stay in hostel</div><div class="value">${app.stayDuration}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Blood Group</div><div class="value">${app.bloodGroup || ''}</div></div>
      <div class="field"><div class="label">Food Preference</div><div class="value">${app.foodPreference}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Mention any disease (if any)</div><div class="value">${app.anyDisease || ''}</div></div>
    </div>
    <div class="section-title">GUARDIAN'S PROFILE</div>
    <div class="row">
      <div class="field"><div class="label">Father's Name</div><div class="value">${app.fatherName}</div></div>
      <div class="field"><div class="label">Contact No.</div><div class="value">${app.fatherContact}</div></div>
      <div class="field"><div class="label">Occupation</div><div class="value">${app.fatherOccupation || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Mother's Name</div><div class="value">${app.motherName || ''}</div></div>
      <div class="field"><div class="label">Contact No.</div><div class="value">${app.motherContact || ''}</div></div>
      <div class="field"><div class="label">Occupation</div><div class="value">${app.motherOccupation || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Spouse Name</div><div class="value">${app.spouseName || ''}</div></div>
      <div class="field"><div class="label">Contact No.</div><div class="value">${app.spouseContact || ''}</div></div>
      <div class="field"><div class="label">Occupation</div><div class="value">${app.spouseOccupation || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Name of Local Guardian</div><div class="value">${app.localGuardianName || ''}</div></div>
      <div class="field"><div class="label">Address</div><div class="value">${app.localGuardianAddress || ''}</div></div>
    </div>
    <div class="row">
      <div class="field"><div class="label">Contact No.</div><div class="value">${app.localGuardianContact || ''}</div></div>
      <div class="field"><div class="label">Occupation</div><div class="value">${app.localGuardianOccupation || ''}</div></div>
      <div class="field"><div class="label">Relation</div><div class="value">${app.localGuardianRelation || ''}</div></div>
    </div>
    <div class="declaration">
      I hereby declare that I am fully satisfied with the terms and conditions of the hostel. I agree every rule and regulation of the hostel and would like to get admission. I promise that will not violate any rules. If found, I accept any action taken by the hostel management. Therefore, I would like to request the hostel management to allow me to get admission.
    </div>
    <div class="sig">Student's Signature: ______________________</div>
    <div class="official">
      <div class="official-title">For Official Purpose Only</div>
      <div class="row">
        <div class="field"><div class="label">Booking Date</div><div class="value">${app.admittingDate || ''}</div></div>
        <div class="field"><div class="label">Room No.</div><div class="value">${app.roomAssigned?.roomNumber || app.roomPreference?.roomNumber || ''}</div></div>
        <div class="field"><div class="label">Approved by</div><div class="value">${app.approvedBy || ''}</div></div>
      </div>
      <div class="row">
        <div class="field"><div class="label">Monthly Fee</div><div class="value">${app.monthlyFee ? 'NPR ' + app.monthlyFee.toLocaleString() : ''}</div></div>
        <div class="field"><div class="label">Admitting Date</div><div class="value">${app.admittingDate || ''}</div></div>
        <div class="field"><div class="label">Signature</div><div class="value"></div></div>
      </div>
    </div>
    <script>window.onload = () => { window.print() }</script>
    </body></html>`)
    w.document.close()
  }

  const handleAppStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, { status })
      setApplications((prev) => prev.map((a) => a._id === id ? { ...a, status } : a))
    } catch {
      alert('Failed to update application.')
    }
  }

  const handleAvailability = async (room, delta) => {
    const next = Math.min(room.totalBeds, Math.max(0, room.availableBeds + delta))
    if (next === room.availableBeds) return
    setUpdatingRoom(room._id)
    try {
      const res = await updateRoom(room._id, { availableBeds: next })
      setRooms((prev) => prev.map((r) => r._id === room._id ? { ...r, availableBeds: res.data.availableBeds } : r))
    } catch {
      alert('Failed to update room.')
    } finally {
      setUpdatingRoom(null)
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

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          {['bookings', 'applications', 'rooms'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-xs tracking-widest rounded transition-colors ${
                tab === t ? 'bg-[#1C2B4B] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Applications panel */}
        {tab === 'applications' && (
          <div className="flex flex-col gap-4">
            {appsLoading ? (
              <div className="text-center py-20 text-gray-400">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-lg p-16 text-center text-gray-400 border border-gray-100">No applications yet.</div>
            ) : applications.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap gap-6 justify-between items-start">

                  {/* Student info */}
                  <div className="flex gap-3 min-w-[160px]">
                    {app.ppPhoto ? (
                      <a href={`${apiBase}/${app.ppPhoto}`} target="_blank" rel="noopener noreferrer">
                        <img src={`${apiBase}/${app.ppPhoto}`} alt="PP"
                          className="w-14 h-16 object-cover rounded border border-gray-200 flex-shrink-0 hover:opacity-80 transition-opacity" />
                      </a>
                    ) : (
                      <div className="w-14 h-16 rounded border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs flex-shrink-0">
                        No photo
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="text-xs tracking-widest text-gray-400">STUDENT</p>
                      <h3 className="font-semibold text-[#1C2B4B]">{app.nameEnglish}</h3>
                      <p className="text-xs text-gray-500">{app.contactNo}</p>
                      {app.email && <p className="text-xs text-gray-500">{app.email}</p>}
                      <p className="text-xs text-gray-400">{app.levelOfStudy} · {app.educationalInstitute}</p>
                    </div>
                  </div>

                  {/* Guardian */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs tracking-widest text-gray-400">GUARDIAN</p>
                    <p className="text-sm text-[#1C2B4B]">{app.fatherName}</p>
                    <p className="text-xs text-gray-500">{app.fatherContact}</p>
                  </div>

                  {/* Room & stay */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs tracking-widest text-gray-400">PREFERENCE</p>
                    <p className="text-sm text-[#1C2B4B]">
                      {app.roomPreference ? `Room ${app.roomPreference.roomNumber}` : 'No preference'}
                    </p>
                    <p className="text-xs text-gray-400">{app.stayDuration}</p>
                    {app.moveInDate && (
                      <p className="text-xs text-[#1C2B4B] font-medium">Move-in: {new Date(app.moveInDate).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    )}
                    <p className="text-xs text-gray-400">{app.foodPreference}</p>
                  </div>

                  {/* Documents & visit */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs tracking-widest text-gray-400">DOCUMENTS</p>
                    <p className="text-xs text-gray-600 mb-1">{app.identityDocs.join(', ') || '—'}</p>
                    {app.idDocFiles?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {app.idDocFiles.map((file, i) => {
                          const isImage = /\.(jpg|jpeg|png)$/i.test(file)
                          const url = `${apiBase}/${file}`
                          return isImage ? (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                              <img src={url} alt={`ID ${i + 1}`}
                                className="w-12 h-12 object-cover rounded border border-gray-200 hover:opacity-80 transition-opacity" />
                            </a>
                          ) : (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-[#1C2B4B] underline bg-gray-50 px-2 py-1 rounded border border-gray-200 hover:bg-gray-100">
                              Doc {i + 1}
                            </a>
                          )
                        })}
                      </div>
                    )}
                    {app.wantsToVisit && (
                      <p className="text-xs text-amber-600 mt-1">
                        Visit requested{app.preferredVisitDate ? `: ${new Date(app.preferredVisitDate).toLocaleDateString()}` : ''}
                      </p>
                    )}
                  </div>

                  {/* Status + actions */}
                  <div className="flex flex-col gap-3 items-end">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-400 tracking-widest">FORM NO.</label>
                      <input
                        type="text"
                        defaultValue={app.formNo || ''}
                        placeholder="e.g. 11922"
                        onBlur={(e) => {
                          const val = e.target.value.trim()
                          if (val !== (app.formNo || '')) {
                            updateApplicationStatus(app._id, { formNo: val })
                              .then(() => setApplications((prev) => prev.map((a) => a._id === app._id ? { ...a, formNo: val } : a)))
                              .catch(() => alert('Failed to save form number.'))
                          }
                        }}
                        className="border border-gray-200 rounded px-2 py-1 text-xs w-24 focus:outline-none focus:border-[#1C2B4B] transition-colors"
                      />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800'
                      : app.status === 'rejected' ? 'bg-red-100 text-red-500'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {app.status !== 'approved' && (
                        <button onClick={() => handleAppStatus(app._id, 'approved')}
                          className="text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded tracking-widest transition-colors">
                          APPROVE
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button onClick={() => handleAppStatus(app._id, 'rejected')}
                          className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded tracking-widest transition-colors">
                          REJECT
                        </button>
                      )}
                      {app.status !== 'pending' && (
                        <button onClick={() => handleAppStatus(app._id, 'pending')}
                          className="text-xs px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded tracking-widest transition-colors">
                          RESET
                        </button>
                      )}
                      <button onClick={() => printApplication(app)}
                        className="text-xs px-3 py-1.5 bg-[#1C2B4B] hover:bg-[#152038] text-white rounded tracking-widest transition-colors">
                        PRINT
                      </button>
                    </div>
                    <p className="text-xs text-gray-300">{new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rooms panel */}
        {tab === 'rooms' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-xs tracking-widest text-gray-400">ROOM AVAILABILITY</p>
            </div>
            {roomsLoading ? (
              <div className="text-center py-16 text-gray-400">Loading rooms...</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {rooms.map((room) => {
                  const isFull = room.availableBeds === 0
                  const isAvailable = room.availableBeds === room.totalBeds
                  return (
                    <div key={room._id} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isFull ? 'bg-red-500' : isAvailable ? 'bg-green-500' : 'bg-amber-400'
                        }`} />
                        <div>
                          <p className="text-sm font-semibold text-[#1C2B4B]">Room {room.roomNumber}</p>
                          <p className="text-xs text-gray-400">{room.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-24 text-right">
                          {room.availableBeds} of {room.totalBeds} available
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAvailability(room, -1)}
                            disabled={room.availableBeds === 0 || updatingRoom === room._id}
                            className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-[#1C2B4B]">
                            {updatingRoom === room._id ? '…' : room.availableBeds}
                          </span>
                          <button
                            onClick={() => handleAvailability(room, +1)}
                            disabled={room.availableBeds === room.totalBeds || updatingRoom === room._id}
                            className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Bookings panel */}
        {tab === 'bookings' && <>

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

                  {/* Type + room / visit date */}
                  <div className="flex flex-col gap-1">
                    {booking.type === 'inspection' ? (
                      <>
                        <p className="text-xs tracking-widest text-amber-600">INSPECTION REQUEST</p>
                        <p className="text-sm text-[#1C2B4B]">
                          {booking.visitDate
                            ? new Date(booking.visitDate).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'Date not set'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs tracking-widest text-gray-400">ROOM</p>
                        <p className="text-sm font-semibold text-[#1C2B4B]">{booking.room?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-400">NPR {booking.room?.price?.toLocaleString()}/mo</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {booking.checkIn && new Date(booking.checkIn).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {booking.checkOut && ` → ${new Date(booking.checkOut).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                        </p>
                      </>
                    )}
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
        </> }

      </div>
    </div>
  )
}
