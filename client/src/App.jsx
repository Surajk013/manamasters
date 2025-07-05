import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
