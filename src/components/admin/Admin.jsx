import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'

const Admin = () => {
  return (
    <>
    <AdminSidebar />
    <div className='ml-64'>
      
      <Outlet />
    </div>
    </>
  )
}

export default Admin
