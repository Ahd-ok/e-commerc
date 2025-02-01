import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Menu } from '../../../Context/MenuContext'
export default function TopBar() {

  //Use Context To change value when click on icon
  const menu = useContext(Menu);

  return (
    <div className='top-bar'>
      <div className='container d-flex align-items-center justify-content-end'>
        <FontAwesomeIcon color='white' onClick={() => menu.setOpen(prev => !prev)}
          cursor={'pointer'}
          icon={faBars} />
      </div>
    </div>
  )
}
