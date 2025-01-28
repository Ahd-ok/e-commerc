import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import shortName from '../../../../helpers/shortName'
import './saleProduct.css'
import { NavLink } from 'react-router-dom'
import Stars from '../../../../helpers/Stars'

export default function Product(props) {

  return (
    <NavLink to={`/Product/${props.id} `} className={`col-lg-${props.col} col-md-6 col-12 `}>
      <div className='m-1 rounded border bg-light p-3'>
        <div className='border-bottom'>
          <div className='mb-3 '>
            <img className='rounded' width={'100%'} src={props.img} alt="" />
          </div>
          <h3 className='text-dark'>{shortName(props.title, 15)}</h3>

          <div className=' d-flex align-items-start justify-content-between'>
            <p className='text-secondary'>{shortName(props.description, 20)}</p>
            <p
              className='sale fw-bold d-flex align-items-center justify-content-center bg-primary text-light rounded-circle'>
              SALE
            </p>
          </div>
        </div>
        <div className='mt-2'>
          <div>
            {Stars(props.rate)}
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center gap-2'>
                <h5 className='m-0 text-primary'>{props.discount}$</h5>
                <h6 className='m-0 text-body-tertiary' style={{ textDecoration: 'line-through', color: 'lightgray' }}>{props.price}$</h6>
              </div>
              <FontAwesomeIcon className='border rounded p-1' color='#0b72d3' icon={faCartShopping} />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
