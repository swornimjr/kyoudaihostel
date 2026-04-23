import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Amenities from './pages/Amenities'
import About from './pages/About'
import Location from './pages/Location'
import Book from './pages/Book'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/book" element={<Book />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
