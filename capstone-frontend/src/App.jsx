import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Admin from './pages/Admin'


const App = () => {
  return (
    <section className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Create your new routes in your application and place them below this comment */}
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancelled" element={<Cancel />} />
        <Route path="/admin" element={<Admin />} />
        {/* Create your new routes in your application and place them above this comment */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App