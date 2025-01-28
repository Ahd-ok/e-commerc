import React from 'react'
import TopBar from '../../Components/Dashboard/Bars/TopBar'
import SideBar from '../../Components/Dashboard/Bars/SideBar'
import { Outlet } from 'react-router-dom'
import './dashboard.css'

export default function Dashboard() {
  return (
    <div className='bg-section'>
      <TopBar />
      <div className='d-flex gap-1' >
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}
