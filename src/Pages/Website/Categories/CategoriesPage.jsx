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
      <div className='d-flex align-items-center justify-content-center p-2'>
        <img className='rounded-circle' width={'30px'} src={item.image} alt="" />
        <p className='m-0 px-2  cursor-pointer'>
          {shortName(item.title, 15)}
        </p>
      </div>
    </div>
  )
  return (
    <div className='p-4 d-flex flex-wrap align-items-stretch justify-content-center'>
      {loading ? <GetSkeleton length={12} height={'70px'} classes={'col-lg-2 col-md-4 col-12 m-2'} /> : showCategories}
    </div>
  )
}
