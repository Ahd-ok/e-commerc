import React from 'react'
import './Landing.css'
import landing from '../../../Assets/1.png'
import { Link } from 'react-router-dom'
export default function Landing() {
  return (
    <div className='landing'>
      <div className='container landing-contain d-flex justify-content-between align-items-center'>
        <div className="col-md-6 d-sm-none d-md-block">
          <img width={'90%'} src={landing} alt="landing" />
        </div>
        <div className="text col-12 col-md-5 text-md-end text-center mt-2 order-sm-2 order-1 py-5">
          <h1 className='text-white m-0'>Astro</h1>
          <p className='text-warning m-0'>احصل على أحدث قطع الكمبيوتر الأصلية بأفضل الأسعار، من المعالجات إلى كروت الشاشة! تسوق الآن واستمتع بالعروض الحصرية!
          </p>
          <Link to='/shop' className='btn btn-light mt-4'>إبدء الأن</Link>
        </div>
      </div>
    </div>
  )
}
