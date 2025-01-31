import React from 'react'
import Landing from '../../../Components/Website/Landing/Landing'
import ShowLatestSaleProducts from '../../../Components/Website/Product/Sale Products/ShowLatestSaleProducts'
import ShowTopRate from '../../../Components/Website/Product/TopRate/ShowTopRate'
import { Container } from 'react-bootstrap'
import ShowLatestProduct from '../../../Components/Website/Product/latestProduct/ShowLatestProduct'
import ImageSlider from '../../../Components/Website/imageSlider/imageSlider'
import ShowCategories from '../../../Components/Website/ShowCategories/ShowCategories'


export default function HomePage() {

  return (
    <>
      <Landing />
      <ImageSlider />
      <ShowCategories />
      <ShowLatestSaleProducts />
      <div className='bg-section'>
        <Container>
          <div className='d-flex align-items-start flex-wrap pt-5'>
            < ShowTopRate />
            <ShowLatestProduct />
          </div>
        </Container>
      </div >
    </>
  )
}
