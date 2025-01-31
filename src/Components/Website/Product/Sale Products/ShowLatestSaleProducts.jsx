import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../Api/axios'
import { latest } from '../../../../Api/Api'
import { Container } from 'react-bootstrap';
import GetSkeleton from '../../Skeleton/GetSkeleton';
import SaleProduct from './SaleProduct'
import './saleProduct.css'

export default function ShowLatestSaleProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${latest}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
  }, []);

  //Show Products
  const showProducts = products.map((products, index) =>
    <SaleProduct key={index}
      title={products.title}
      description={products.description}
      discount={products.discount}
      price={products.price}
      img={products.images[0].image}
      rate={products.rating}
      col={'3'}
      id={products.id}
    />)

  return (
    <div className='bg-section'>
      <Container>
        <h1 style={{ margin: '0' }} className='text-light text-end'>: أحدث التخفيضات</h1>
        <div className='d-flex align-items-stretch justify-content-center flex-wrap row-gap-1'>
          {
            loading
              ? <GetSkeleton length={4} height={'400px'} classes={'col-lg-3 col-md-4 col-12'} />
              : showProducts
          }
        </div>
      </Container >
    </div >
  )
}
