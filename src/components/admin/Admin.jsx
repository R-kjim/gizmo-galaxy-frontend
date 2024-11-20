import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'

const Admin = () => {
  return (
    <>
    <AdminNavbar />
    <AdminSidebar />
    <div className='ml-64'>
      
      <Outlet />
    </div>
    </>
  )
}

export default Admin
