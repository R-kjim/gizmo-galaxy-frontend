import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './AdminSidebar'

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Admin
