import React, { useContext, useEffect, useState } from 'react'
import './bars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../../Context/MenuContext'
import { WindowSize } from '../../../Context/WindowContext'
import { Axios } from '../../../Api/axios'
import { LOGOUT, USER } from '../../../Api/Api'
import { links } from './NavLinks.js'
import bg from '../../../Assets/logo2.png'
import { faAddressCard, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Loading from '../Spinner/Loading.jsx'
import Cookie from 'cookie-universal'


export default function SideBar() {

  //use Cookies
  const cookie = Cookie();

  // Use Navigate
  const nav = useNavigate();

  //useState
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  //Change style with context when click on icon in topBar
  const { isOpen } = useContext(Menu);


  // change value when change window size 
  const { windowsize } = useContext(WindowSize);

  // Get Current User 
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => {
      setUser(res.data)
    })
  }, [])

  // Handle LogOut
  async function handleLogout() {
    setLoading(true);
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove('e-commerce')
      nav('/login', { replace: 'true' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='side-bar pt-4'
      style={{
        left: windowsize < '767' ? (isOpen ? 0 : '-100%') : 0,
        width: isOpen ? '200px' : 'fit-content',
        padding: isOpen ? '0px 8px' : '2px',
      }}>
      <Link to='/' className='mx-4' style={{ display: !isOpen ? 'none' : '' }}><img width={'140px'} src={bg} alt="" /></Link>
      <div style={{ height: 'calc(100vh - 80px)' }} className='mt-3 d-flex flex-column justify-content-between'>
        <div>
          {links.map((link, index) => (
            link.rules.includes(user.role) &&
            <NavLink key={index}
              to={link.path}
              className='d-flex justify-content-start align-items-center gap-2 side-bar-link'
              style={{
                padding: isOpen ? '10px 15px' : '10px',
              }}>
              <FontAwesomeIcon icon={link.faIcon} />
              <p
                className='m-0'
                style={{ display: isOpen ? 'block' : 'none' }}>
                {link.name}
              </p>
            </NavLink>
          ))}
        </div>
        <div>
          <Link
            to={`/dashboard/users/${user.id}`}
            style={{ cursor: 'pointer', color: '#155bac', border: '2px solid #155bac' }}
            className='link-a d-flex justify-content-center column-gap-2 align-items-center  rounded p-2 bg-white fw-bold'>
            <FontAwesomeIcon fontSize={'18px'} icon={faAddressCard} />
            <p style={{ display: !isOpen ? 'none' : '' }} className='m-0 text-uppercase'>{user.name}</p>
          </Link>
          <div onClick={handleLogout} style={{ cursor: 'pointer', border: '2px solid #ac2715' }} className='link-b d-flex justify-content-center column-gap-2 align-items-center rounded text-danger p-2 mt-2 fw-bold'>
            {loading ? <Loading btnStyle={true} /> : <FontAwesomeIcon fontSize={'16px'} icon={faDoorOpen} />}
            <p style={{ display: !isOpen ? 'none' : '' }} className='m-0 text-uppercase'>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}
