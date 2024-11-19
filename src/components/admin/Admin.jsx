import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import Footer from '../Homepage/Footer'

const Admin = () => {
  return (
    <div>
      <AdminSidebar />
      <div className='ml-64'>
      <div className=' min-h-screen'>
      <Outlet />
      </div>
      <Footer />
    </div>

    </div>
  )
}

export default Admin
