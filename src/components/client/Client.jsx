import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

const Client = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Client