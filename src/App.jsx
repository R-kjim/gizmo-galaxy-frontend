// src/App.js
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Dashboard from './components/admin/Dashboard'
import Admin from './components/admin/Admin'
import Client from './components/client/Client'
import DashboardClient from './components/client/Dashboard'
import ProductListing from './components/client/ProductListing'
import ProductCard from './components/client/ProductCard'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/client/Cart'
import Footer from './components/Homepage/Footer'
import AnalyticsDashboard from './components/admin/AnalyticsDashboard'

const App = () => {
  return (
    <>
      <Navbar />
      <div className='mt-16 min-h-screen'>
        <Routes>
          {/* Main Homepage Route */}
          <Route path='/' element={<Homepage />} />

          {/* Admin Section */}
          <Route path='/admin' element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='analytics' element={<AnalyticsDashboard />} /> {/* Analytics Dashboard Route */}
          </Route>

          {/* Client Section */}
          <Route path='/client' element={<Client />}>
            <Route path='dashboard' element={<DashboardClient />} />
            <Route path='product-listings' element={<ProductListing />} />
            <Route path='product/:id' element={<ProductCard />} />
          </Route>

          {/* Authentication Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Shopping Cart */}
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
