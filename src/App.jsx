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

const App = () => {
  return (
    <>
    <Navbar/>
    {/* <Routes>
    <Route path='/' element={<Homepage />}/>

    </Routes> */}
    <div className='mt-16'>
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/admin' element={<Admin />}>
        <Route path='dashboard' element={<Dashboard />}/>
      </Route>
      <Route path='/client' element={<Client />}>
        <Route path='dashboard' element={<DashboardClient />}/>
        <Route path='product-listings' element={<ProductListing />}/>
        <Route path='product/:id' element={<ProductCard />}/>
      </Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/cart' element={<Cart />}/>
    </Routes>
    </div>
    <Footer />

    </>
  )
}

export default App
