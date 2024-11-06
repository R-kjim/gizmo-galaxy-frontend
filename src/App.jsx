import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import Dashboard from './components/admin/Dashboard'
import Admin from './components/admin/Admin'
import Client from './components/client/Client'
import DashboardClient from './components/client/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/admin' element={<Admin />}>
        <Route path='dashboard' element={<Dashboard />}/>
      </Route>
      <Route path='/client' element={<Client />}>
        <Route path='dashboard' element={<DashboardClient />}/>
      </Route>
    </Routes>
  )
}

export default App
