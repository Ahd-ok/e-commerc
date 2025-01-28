import React from 'react'
import './Landing.css'
import landing from '../../../Assets/landing.png'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className='landing py-5 bg-section'>
      <div className='container d-flex justify-content-between align-items-start'>
        <div className="col-md-6 d-sm-none d-md-block">
          <img width={'100%'} src={landing} alt="landing" />
        </div>
        <div className="text col-12 col-md-5 text-md-end text-center mt-2 order-sm-2 order-1">
          <h1 className='text-white m-0'>Astro</h1>
          <p className='text-warning m-0'>تصميمك هو البداية، والباقي علينا! اطلب طباعة منتجاتك بكل سهولة عبرالإنترنت</p>
          <Link to='/shop' className='btn btn-light mt-4'>إبدء الأن</Link>
        </div>
      </div>
    </div>
  )
}
