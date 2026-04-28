import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-image.png'
import kirtipurPhoto from '../assets/kirtipur-photo.png'

const highlights = [
  { icon: '🍱', title: 'Meals Included', desc: 'Breakfast, lunch and dinner prepared fresh daily.' },
  { icon: '👕', title: 'Laundry Service', desc: 'Regular laundry so you can focus on your studies.' },
  { icon: '📶', title: 'Free Wi-Fi', desc: 'Fast internet throughout the hostel.' },
  { icon: '🏛️', title: 'Historic Location', desc: 'Located in Kirtipur, one of Kathmandu\'s oldest cities.' },
  { icon: '🤝', title: 'Community', desc: 'Live with fellow students who share your goals.' },
  { icon: '🔒', title: 'Safe & Secure', desc: 'Secure premises so you can study in peace.' },
]

const rooms = [
  { type: '2-Bed Room', price: 'NPR 13,000', desc: 'Private and cozy 2-bed shared room. Ideal for those who prefer a quieter space.' },
  { type: '3-Bed Room', price: 'NPR 12,000', desc: 'Comfortable 3-bed shared room with study desks and ample storage.' },
  { type: '4-Bed Room', price: 'NPR 11,000', desc: 'Spacious big room with 4 beds. Perfect for a lively atmosphere.' },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Kyoudai Boy's Hostel — Affordable Student Hostel in Kirtipur, Kathmandu</title>
        <meta name="description" content="Affordable student hostel in Kirtipur, Kathmandu. Shared rooms from NPR 11,000/month with four meals daily, Wi-Fi, laundry, and a study-friendly community near Tribhuvan University." />
        <link rel="canonical" href="https://kyoudaihostel.com/" />
      </Helmet>

      {/* Hero */}
      <section className="text-white min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-[#1C2B4B]/50" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          <p className="text-xs tracking-[0.4em] text-[#C9962A]">KIRTIPUR · KATHMANDU, NEPAL</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-[0.15em]">KYOUDAI</h1>
          <p className="text-base tracking-[0.3em] text-[#C9962A] drop-shadow-lg">兄弟 · HOSTEL</p>
          <p className="text-gray-300 text-lg leading-relaxed mt-2">
            A home away from home for students in Kathmandu.<br />
            Focus on what you came for — we handle the rest.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap justify-center">
            <Link to="/apply"
              className="bg-[#B5202A] hover:bg-[#8B1520] px-8 py-3 tracking-widest text-sm transition-colors rounded">
              APPLY NOW
            </Link>
            <Link to="/book"
              className="border border-white/30 hover:border-white px-8 py-3 tracking-widest text-sm transition-colors rounded">
              BOOK INSPECTION
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-0.5 h-8 bg-white/20" />
          <p className="text-xs tracking-widest text-white/30">SCROLL</p>
        </div>
      </section>

      {/* Tagline strip */}
      <section className="bg-[#B5202A] text-white py-4 text-center">
        <p className="text-xs tracking-[0.4em]">MEALS · LAUNDRY · WI-FI · COMMUNITY · KIRTIPUR</p>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-[#B5202A] mb-3">WHY KYOUDAI</p>
          <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Everything You Need</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            We take care of daily needs so you can stay focused on your studies and goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {highlights.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-semibold text-[#1C2B4B] mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms preview */}
      <section className="bg-[#1C2B4B] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">ACCOMMODATION</p>
            <h2 className="font-serif text-3xl font-bold">Our Rooms</h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              Shared rooms designed for students — clean, comfortable, and affordable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map(({ type, price, desc }) => (
              <div key={type} className="border border-white/10 rounded-lg p-6 hover:border-[#C9962A] transition-colors">
                <p className="text-xs tracking-[0.3em] text-[#C9962A] mb-3">SHARED ROOM</p>
                <h3 className="font-serif text-xl font-bold mb-2">{type}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <p className="text-[#C9962A] font-bold text-lg">{price}<span className="text-gray-500 text-sm font-normal"> /month</span></p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/rooms"
              className="border border-[#C9962A] text-[#C9962A] hover:bg-[#C9962A] hover:text-white px-8 py-3 tracking-widest text-sm transition-colors rounded">
              SEE ALL ROOMS
            </Link>
          </div>
        </div>
      </section>

      {/* About Kirtipur */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src={kirtipurPhoto} alt="Kirtipur, Kathmandu" className="rounded-lg h-64 w-full object-cover" />
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.4em] text-[#B5202A]">OUR LOCATION</p>
            <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Kirtipur, Kathmandu</h2>
            <p className="text-gray-500 leading-relaxed">
              Kirtipur is one of the oldest cities in the Kathmandu Valley — a hilltop town rich with
              Newari culture, ancient temples, and a calm atmosphere perfect for students.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Just minutes from Tribhuvan University and easily connected to the rest of Kathmandu,
              it's the ideal base for your studies.
            </p>
            <Link to="/location" className="text-[#B5202A] text-sm tracking-widest hover:underline mt-2">
              GET DIRECTIONS →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#B5202A] text-white py-16 text-center px-4">
        <p className="text-xs tracking-[0.4em] mb-4 text-white/70">READY TO JOIN?</p>
        <h2 className="font-serif text-3xl font-bold mb-4">Secure Your Spot Today</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Limited beds available. Apply now or schedule an inspection visit first — no online payment required.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/apply"
            className="bg-white text-[#B5202A] hover:bg-[#F7F3EE] px-10 py-3 tracking-widest text-sm font-semibold transition-colors rounded">
            APPLY NOW
          </Link>
          <Link to="/book"
            className="border border-white/50 hover:border-white px-10 py-3 tracking-widest text-sm transition-colors rounded">
            BOOK INSPECTION
          </Link>
        </div>
      </section>

    </div>
  )
}
