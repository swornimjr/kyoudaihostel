import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/amenities', label: 'Amenities' },
  { to: '/about', label: 'About' },
  { to: '/location', label: 'Location' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { admin, logout } = useAuth()

  return (
    <nav className="bg-[#1C2B4B] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm tracking-widest">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-[#C9962A] transition-colors ${pathname === to ? 'text-[#C9962A]' : ''}`}
            >
              {label}
            </Link>
          ))}
          {admin && (
            <>
              <Link to="/admin" className="hover:text-[#C9962A] transition-colors">Dashboard</Link>
              <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors">Logout</button>
            </>
          )}
          <Link
            to="/book"
            className="bg-[#B5202A] hover:bg-[#8B1520] px-4 py-2 rounded text-sm tracking-widest transition-colors"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5" onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#152038] px-4 pb-4 flex flex-col gap-4 text-sm tracking-widest">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`hover:text-[#C9962A] transition-colors ${pathname === to ? 'text-[#C9962A]' : ''}`}>
              {label}
            </Link>
          ))}
          {admin && (
            <>
              <Link to="/admin" onClick={() => setOpen(false)} className="hover:text-[#C9962A]">Dashboard</Link>
              <button onClick={() => { logout(); setOpen(false) }} className="text-left text-red-400">Logout</button>
            </>
          )}
          <Link to="/book" onClick={() => setOpen(false)}
            className="bg-[#B5202A] text-center px-4 py-2 rounded tracking-widest">
            BOOK NOW
          </Link>
        </div>
      )}
    </nav>
  )
}
