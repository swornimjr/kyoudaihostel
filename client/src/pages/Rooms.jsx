import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../services/api'
import room4 from '../assets/4-bedroom.png'
import room6 from '../assets/6-bedroom.png'
import room8 from '../assets/8-bedroom.png'

const roomImages = {
  'shared-2': room4,
  'shared-3': room6,
  'shared-4': room8,
}

const fallbackRooms = [
  {
    _id: '1',
    name: '2-Bed Room',
    roomNumber: '101',
    type: 'shared-2',
    price: 13000,
    description: 'Private and cozy 2-bed shared room. Ideal for those who prefer a quieter, more personal space.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 2,
    availableBeds: 0,
  },
  {
    _id: '2',
    name: '3-Bed Room',
    roomNumber: '205',
    type: 'shared-3',
    price: 12000,
    description: 'Comfortable 3-bed shared room with study desks and ample storage for each resident.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 3,
    availableBeds: 2,
  },
  {
    _id: '3',
    name: '4-Bed Room',
    roomNumber: '301',
    type: 'shared-4',
    price: 11000,
    description: 'Spacious big room with 4 beds. Perfect for groups of friends or those who enjoy a lively atmosphere.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 4,
    availableBeds: 0,
  },
]

const included = [
  'Breakfast, Lunch & Dinner',
  'Free Wi-Fi',
  'Water & Electricity',
  'Common Study Area',
  'Regular Cleaning',
]

export default function Rooms() {
  const [rooms, setRooms] = useState(fallbackRooms)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRooms()
      .then((res) => { if (res.data.length > 0) setRooms(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col">

      {/* Page header */}
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">ACCOMMODATION</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Our Rooms</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          All rooms include meals and Wi-Fi. Admission fee NPR 1,200/year. Laundry NPR 100/month.
        </p>
      </section>

      {/* What's included banner */}
      <section className="bg-[#B5202A] text-white py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {included.map((item) => (
            <span key={item} className="text-xs tracking-widest flex items-center gap-2">
              <span className="text-white/50">✦</span> {item}
            </span>
          ))}
        </div>
      </section>

      {/* Room cards */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading rooms...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(
              rooms.reduce((acc, room) => {
                if (!acc[room.type]) acc[room.type] = []
                acc[room.type].push(room)
                return acc
              }, {})
            ).map(([type, groupRooms]) => {
              const totalAvailable = groupRooms.reduce((s, r) => s + r.availableBeds, 0)
              const totalBeds = groupRooms.reduce((s, r) => s + r.totalBeds, 0)
              const firstAvailable = groupRooms.find((r) => r.availableBeds > 0)
              const sample = groupRooms[0]

              return (
                <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <img src={roomImages[type]} alt={sample.name} className="h-48 w-full object-cover" />

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs tracking-[0.3em] text-[#B5202A] mb-2">{groupRooms.length} ROOM{groupRooms.length > 1 ? 'S' : ''}</p>
                    <h3 className="font-serif text-xl font-bold text-[#1C2B4B] mb-3">{sample.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{sample.description}</p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {sample.amenities.map((a) => (
                        <span key={a} className="text-xs bg-[#F7F3EE] text-[#1C2B4B] px-2 py-1 rounded">{a}</span>
                      ))}
                    </div>

                    {/* Individual room breakdown */}
                    <div className="flex flex-col gap-2 mb-5 border-t border-gray-50 pt-4">
                      {groupRooms.sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)).map((room) => (
                        <div key={room._id} className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Room {room.roomNumber}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: room.totalBeds }).map((_, i) => (
                                <span key={i} className={`w-3 h-3 rounded-sm border ${
                                  i < room.availableBeds ? 'bg-white border-gray-300' : 'bg-[#1C2B4B] border-[#1C2B4B]'
                                }`} />
                              ))}
                            </div>
                            <span className={`text-xs font-medium ${
                              room.availableBeds === 0 ? 'text-red-400'
                              : room.availableBeds === room.totalBeds ? 'text-green-600'
                              : 'text-amber-500'
                            }`}>
                              {room.availableBeds === 0 ? 'Full' : `${room.availableBeds} vacant`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="mb-3">
                        <p className="text-[#C9962A] font-bold text-2xl">NPR {sample.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">per month · all inclusive</p>
                      </div>
                      {totalAvailable > 0 ? (
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/apply?room=${firstAvailable._id}`}
                            className="flex-1 text-center px-4 py-2 text-xs tracking-widest rounded bg-[#B5202A] text-white hover:bg-[#8B1520] transition-colors"
                          >
                            APPLY NOW
                          </Link>
                          <Link
                            to={`/book?room=${firstAvailable._id}`}
                            className="px-4 py-2 text-xs tracking-widest rounded border border-gray-300 text-gray-500 hover:border-[#1C2B4B] hover:text-[#1C2B4B] transition-colors"
                          >
                            INSPECT
                          </Link>
                        </div>
                      ) : (
                        <span className="block text-center px-4 py-2 text-xs tracking-widest rounded bg-gray-100 text-gray-400">
                          FULLY BOOKED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Fees & Admission */}
      <section className="max-w-6xl mx-auto px-4 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <p className="text-xs tracking-[0.3em] text-[#B5202A] mb-4">ADDITIONAL FEES</p>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">Monthly Laundry</span>
              <span className="text-sm font-semibold text-[#1C2B4B]">NPR 100 / month</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Admission Fee (1 Year)</span>
              <span className="text-sm font-semibold text-[#1C2B4B]">NPR 1,200</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <p className="text-xs tracking-[0.3em] text-[#B5202A] mb-4">REQUIRED DOCUMENTS FOR ADMISSION</p>
            <p className="text-xs text-gray-500 mb-3">At least 2 of the following:</p>
            <div className="flex flex-wrap gap-2">
              {['Citizenship', 'College ID', 'License', 'Passport'].map((doc) => (
                <span key={doc} className="text-xs bg-[#F7F3EE] text-[#1C2B4B] px-3 py-1.5 rounded">{doc}</span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">PP-size photo required for the admission form.</p>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="bg-[#1C2B4B] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-4">HAVE QUESTIONS?</p>
          <h2 className="font-serif text-2xl font-bold mb-4">Not sure which room to pick?</h2>
          <p className="text-gray-400 mb-8">
            WhatsApp us and we'll help you find the right fit based on your budget and study schedule.
          </p>
          <a
            href="https://wa.me/9779863035404"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 px-8 py-3 text-sm tracking-widest rounded transition-colors"
          >
            WHATSAPP US
          </a>
        </div>
      </section>

    </div>
  )
}
