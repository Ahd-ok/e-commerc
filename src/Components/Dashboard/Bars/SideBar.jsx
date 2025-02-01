import React, { useContext, useEffect, useState } from 'react'
import './bars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from '../../../Context/MenuContext'
import { WindowSize } from '../../../Context/WindowContext'
import { Axios } from '../../../Api/axios'
import { USER } from '../../../Api/Api'
import { links } from './NavLinks.js'
import bg from '../../../Assets/logo2.png'

export default function SideBar() {

  //Change style with context when click on icon in topBar
  const openContext = useContext(Menu);
  const open = openContext.isOpen;

  // change value when change window size 
  const windowContext = useContext(WindowSize);
  const window = windowContext.windowsize

  const [user, setUser] = useState([]);
  // Get Current User 
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setUser(res.data))
  }, [])

  return (
    <div className='side-bar pt-4'
      style={{
        left: window < '767' ? (open ? 0 : '-100%') : 0,
        width: open ? '200px' : 'fit-content',
        padding: open ? '0px 8px' : '2px',
      }}>
      <Link to='/' className='mx-4' style={{ display: !open ? 'none' : '' }}><img width={'140px'} src={bg} alt="" /></Link>
      <div className='mt-3'>
        {links.map((link, index) => (
          link.rules.includes(user.role) &&
          <NavLink key={index}
            to={link.path}
            className='d-flex align-items-center gap-2 side-bar-link'
            style={{
              padding: open ? '10px 15px' : '10px',
              // color: window < '767' ? 'black' : 'white'
            }}>
            <FontAwesomeIcon icon={link.faIcon} />
            <p
              className='m-0'
              style={{ display: open ? 'block' : 'none' }}>
              {link.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
