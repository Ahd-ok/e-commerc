import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../Api/axios'
import { LatestSale } from '../../../../Api/Api'
import GetSkeleton from '../../Skeleton/GetSkeleton';
import SaleProduct from '../Sale Products/SaleProduct';


export default function ShowLatestProduct() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${LatestSale}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
  }, []);

  //Show Products
  const showProducts = products.map((products, index) =>
    <SaleProduct
      key={index}
      title={products.title}
      description={products.description}
      discount={products.discount}
      price={products.price}
      img={products.images[0].image}
      rate={products.rating}
      col={'6'}
      id={products.id}
    />)

  return (
    <div className='col-md-6 col-12'>
      <div style={{ border: '2px solid white' }} className=' d-flex align-items-stretch justify-content-end flex-wrap p-3 ms-md-3 rounded row-gap-3'>
        <h1 className='py-2 text-light fw-bold'>: أحدث المنتجات </h1>
        {
          loading
            ? <GetSkeleton length={1} height={'500px'} classes={'col-12'} />
            : showProducts
        }
      </div >
    </div>
  )
}
