import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { Menu } from '../../../Context/MenuContext'
import { Dropdown } from 'react-bootstrap';
import { Axios } from '../../../Api/axios';
import { LOGOUT, USER } from '../../../Api/Api';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import Loading from '../Spinner/Loading';
import bg from '../../../Assets/logo.png'

export default function TopBar() {

  //Use Cookie
  const cookie = Cookie();

  // Use Navigate
  const nav = useNavigate();

  // Use State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false)
  // Get Current User 
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => {
      setName(res.data.name)
      setRole(res.data.role)
    })
  }, [])

  // Handle LogOut
  // function handleLogout() {

  //   setTimeout(() => {
  //     getLogOut();
  //   }, 1000)
  // }

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

  //Use Context To change value when click on icon
  const menu = useContext(Menu);
  return (
    <>
      {loading && <Loading />}
      <div className='top-bar d-flex align-items-center justify-content-between'>
        <div
          className='d-flex align-items-center gap-5'>
          <Link to='/' className='mx-4'><img width={'90px'} src={bg} alt="" /></Link>
          <FontAwesomeIcon color='white' onClick={() => menu.setOpen(prev => !prev)}
            cursor={'pointer'}
            icon={faBars} />
        </div>

        <div className='d-flex align-items-center gap-3'>
          {role === '1995' || role === '1999' ? <>
            <Link className='text-white' to='/'>
              Home Page
            </Link>
            <Link className='text-white' to='/dashboard'>
              DashBoard
            </Link>
          </> : ''}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  )
}
