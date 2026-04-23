import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../services/api'
import room4 from '../assets/4-bedroom.png'
import room6 from '../assets/6-bedroom.png'
import room8 from '../assets/8-bedroom.png'

const roomImages = {
  'shared-4': room4,
  'shared-6': room6,
  'shared-8': room8,
}

const fallbackRooms = [
  {
    _id: '1',
    name: '4-Bed Room',
    type: 'shared-4',
    price: 8000,
    description: 'Cozy 4-bed shared room with a study desk for each resident. Clean and well-ventilated.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 4,
    availableBeds: 2,
  },
  {
    _id: '2',
    name: '6-Bed Room',
    type: 'shared-6',
    price: 6500,
    description: 'Spacious 6-bed shared room. Great value for students on a budget who still want comfort.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 6,
    availableBeds: 3,
  },
  {
    _id: '3',
    name: '8-Bed Room',
    type: 'shared-8',
    price: 5500,
    description: 'Budget-friendly 8-bed room. Perfect for long stays and building friendships.',
    amenities: ['Study Desk', 'Wardrobe', 'Fan', 'Window'],
    totalBeds: 8,
    availableBeds: 4,
  },
]

const included = [
  'Breakfast, Lunch & Dinner',
  'Laundry Service',
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
          All rooms include meals, laundry, and Wi-Fi. No hidden charges.
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
            {rooms.map((room) => (
              <div key={room._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">

                <img src={roomImages[room.type]} alt={room.name} className="h-48 w-full object-cover" />

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs tracking-[0.3em] text-[#B5202A] mb-2">SHARED ROOM</p>
                  <h3 className="font-serif text-xl font-bold text-[#1C2B4B] mb-3">{room.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{room.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities.map((a) => (
                      <span key={a} className="text-xs bg-[#F7F3EE] text-[#1C2B4B] px-2 py-1 rounded">
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-2 h-2 rounded-full ${room.availableBeds > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-gray-500">
                      {room.availableBeds > 0 ? `${room.availableBeds} bed${room.availableBeds > 1 ? 's' : ''} available` : 'Fully booked'}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="text-[#C9962A] font-bold text-2xl">NPR {room.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">per month · all inclusive</p>
                    </div>
                    <Link
                      to={`/book?room=${room._id}`}
                      className={`px-4 py-2 text-xs tracking-widest rounded transition-colors ${
                        room.availableBeds > 0
                          ? 'bg-[#B5202A] text-white hover:bg-[#8B1520]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {room.availableBeds > 0 ? 'BOOK NOW' : 'FULL'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
