import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import shortName from '../../../../helpers/shortName'
import './saleProduct.css'

import Stars from '../../../../helpers/Stars'
import { useNavigate } from 'react-router-dom'

export default function Product(props) {
  const nav = useNavigate()

  function goToProduct() {
    nav(`/Product/${props.id}`)
  }

  return (
    <div className={`col-lg-${props.col} col-md-6 col-12`}>
      <div className='m-1 rounded border bg-light p-3 d-flex flex-column justify-content-between h-100'>
        <div >
          <div className='mb-3'>
            <img className='rounded w-100' style={{ aspectRatio: '16/9', objectFit: 'cover' }} src={props.img} alt="" />
          </div>
          <h3 className='text-dark'>{shortName(props.title, 25)}</h3>
          <div className=' d-flex align-items-start justify-content-between'>
            <p className='text-secondary '>{shortName(props.description, 30)}</p>
            <p
              className='sale fw-bold d-flex align-items-center justify-content-center bg-primary text-light rounded-circle'>
              SALE
            </p>
          </div>
        </div>
        <div className='mt-2'>
          <div className='border-top pt-2'>
            {Stars(props.rate)}
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center gap-2'>
                <h5 className='m-0 text-primary'>{props.discount}$</h5>
                <h6 className='m-0 text-body-tertiary' style={{ textDecoration: 'line-through', color: 'lightgray' }}>{props.price}$</h6>
              </div>
              <FontAwesomeIcon cursor={'pointer'} onClick={goToProduct} className='border rounded p-1' color='#0b72d3' icon={faCartShopping} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
