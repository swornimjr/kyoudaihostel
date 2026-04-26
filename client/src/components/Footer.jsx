import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1C2B4B] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xl font-bold tracking-[0.2em] font-serif">KYOUDAI</p>
            <p className="text-[10px] tracking-[0.3em] text-[#C9962A]">兄弟 · HOSTEL</p>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            A home away from home for students in Kirtipur, Kathmandu.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.3em] text-[#C9962A] mb-2">QUICK LINKS</p>
          {[
            { to: '/rooms', label: 'Rooms' },
            { to: '/amenities', label: 'Amenities' },
            { to: '/about', label: 'About Us' },
            { to: '/location', label: 'Location' },
            { to: '/book', label: 'Book Now' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-sm text-gray-400 hover:text-[#C9962A] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.3em] text-[#C9962A] mb-2">CONTACT</p>
          <p className="text-sm text-gray-400">M7FJ+3J3, Kirtipur 44600, Nepal</p>
          <a href="tel:+9779863035404" className="text-sm text-gray-400 hover:text-[#C9962A] transition-colors">
            +977 986-3035404
          </a>
          <a href="mailto:kyoudaihostel@gmail.com" className="text-sm text-gray-400 hover:text-[#C9962A] transition-colors">
            kyoudaihostel@gmail.com
          </a>
          <a
            href="https://wa.me/9779863035404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-400 hover:text-green-300 transition-colors mt-1"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500 tracking-widest">
        © {new Date().getFullYear()} KYOUDAI HOSTEL · KIRTIPUR, NEPAL
      </div>
    </footer>
  )
}
