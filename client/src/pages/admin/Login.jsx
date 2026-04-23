import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { adminLogin } from '../../services/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await adminLogin(form)
      login(res.data)
      navigate('/admin')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1C2B4B] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-10 flex flex-col gap-6">

        {/* Logo */}
        <div className="text-center">
          <p className="font-serif text-2xl font-bold tracking-[0.2em] text-[#1C2B4B]">KYOUDAI</p>
          <p className="text-xs tracking-[0.3em] text-[#C9962A]">兄弟 · HOSTEL</p>
          <p className="text-xs tracking-widest text-gray-400 mt-3">ADMIN PANEL</p>
        </div>

        <div className="w-12 h-0.5 bg-[#C9962A] mx-auto" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest text-gray-500">EMAIL</label>
            <input
              type="email" name="email" value={form.email} onChange={handleChange} required
              placeholder="admin@kyoudaihostel.com"
              className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest text-gray-500">PASSWORD</label>
            <input
              type="password" name="password" value={form.password} onChange={handleChange} required
              placeholder="••••••••"
              className="border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C2B4B] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1C2B4B] hover:bg-[#152038] text-white py-3 tracking-widest text-sm rounded transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  )
}
