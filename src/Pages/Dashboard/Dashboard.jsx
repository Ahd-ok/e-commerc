import React, { useContext } from 'react'
import TopBar from '../../Components/Dashboard/Bars/TopBar'
import SideBar from '../../Components/Dashboard/Bars/SideBar'
import { Outlet } from 'react-router-dom'
import './dashboard.css'

import { WindowSize } from '../../Context/WindowContext'
import { Menu } from '../../Context/MenuContext'

export default function Dashboard() {

  const { windowsize } = useContext(WindowSize)
  const { isOpen } = useContext(Menu);

  return (
    <div className='landing position-relative'>
      <TopBar />
      <SideBar />
      <div className='bg-section' style={{ paddingLeft: windowsize > '767' ? isOpen ? '200px' : '70px' : '' }}>
        <Outlet />
      </div>
    </div >
  )
}
