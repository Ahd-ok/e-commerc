import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../Api/axios'
import { topRated } from '../../../../Api/Api'
import GetSkeleton from '../../Skeleton/GetSkeleton';
import TopRate from './TopRate';

export default function ShowTopRate() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${topRated}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
  }, []);

  //Show Products
  const showProducts = products.map((products, index) =>
    <TopRate
      key={index}
      title={products.title}
      description={products.description}
      discount={products.discount}
      price={products.price}
      img={products.images[0].image}
      rate={products.rating}
      id={products.id}
    />)

  return (
    <div className='col-md-6 col-12 rounded bg-white d-flex flex-column align-items-end flex-wrap p-3 mb-3'>
      <h1 className='text-dark py-2 fw-bold'>: الأعلى تقيماً </h1>
      <div className='d-flex flex-wrap flex-column w-100'>
        {
          loading
            ? <GetSkeleton length={1} height={'400px'} width={'100%'} />
            : showProducts
        }
      </div>
    </div>
  )
}
