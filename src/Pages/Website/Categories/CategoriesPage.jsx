import React, { useEffect, useState } from 'react'
import { CAT } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import shortName from '../../../helpers/shortName';
import GetSkeleton from '../../../Components/Website/Skeleton/GetSkeleton';

export default function CategoriesPage() {
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get last 5 Categories
  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data)).finally(() => setLoading(false))
  }, [])

  // render Categories 
  const showCategories = Categories.map((item, key) =>
    <div key={key} className='border col-lg-2 col-md-4 col-12 rounded bg-transparent text-light m-2'>
      <div className='d-flex align-items-center p-3'>
        <img className='rounded-circle' width={'50px'} height={'50px'} src={item.image} alt="" />
        <p style={{ margin: '0' }} className='ms-3 px-2  cursor-pointer'>
          {shortName(item.title, 15)}
        </p>
      </div>
    </div>
  )
  return (
    <div className='landing pt-5'>
      <div className='p-4 d-flex flex-wrap align-items-stretch justify-content-center pt-5'>
        {loading ? <GetSkeleton length={12} height={'70px'} classes={'col-lg-2 col-md-4 col-12 m-2'} /> : showCategories}
      </div>
    </div>
  )
}
