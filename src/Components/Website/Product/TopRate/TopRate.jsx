import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import Stars from '../../../../helpers/Stars'

export default function TopRate(props) {

  return (

    <NavLink to={`/product/${props.id}`} className='border-bottom bg-white py-2 mb-2 gap-3 d-flex w-100'>
      <div >
        <img className='rounded' height='150px' src={props.img} alt="" />
      </div>
      <div className='d-flex flex-column w-100'>
        <div>
          <h3 className='text-dark'>{props.title}</h3>
          <p className='text-secondary'>{props.description}</p>
        </div>
        <div className='w-100'>
          {Stars(props.rate)}
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center gap-2'>
              <h5 className='m-0 text-primary'>{props.discount}$</h5>
              <h6 className='m-0 text-body-tertiary' style={{ textDecoration: 'line-through', color: 'lightgray' }}>{props.price}$</h6>
            </div>
            <div>
              <FontAwesomeIcon className='border rounded p-1' color='#0b72d3' icon={faCartShopping} />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
