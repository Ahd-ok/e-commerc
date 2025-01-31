import React, { useEffect, useState } from 'react'
import { Axios } from '../../../Api/axios';
import { CAT } from '../../../Api/Api';
import GetSkeleton from '../Skeleton/GetSkeleton';
import { useNavigate } from 'react-router-dom';
import shortName from '../../../helpers/shortName';
import './showCategories.css'

export default function ShowCategories() {
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  //Use Navigate
  const nav = useNavigate();

  function handleCategory() {
    nav('/categories')
  }

  //Get last 5 Categories
  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data.slice(-5))).finally(() => setLoading(false));
  }, [])

  // render Categories 
  const showCategories = Categories.map((item, key) =>
    <div key={key} className='d-flex align-items-center category-bar px-2 py-3'>
      <img style={{ marginRight: '10px', borderRadius: '50%' }} width={'50px'} height={'50px'} src={item.image} alt="" />
      <p className='m-0 fw-bold'>
        {shortName(item.title, 15)}
      </p>
    </div>
  )
  return (

    <div className='container d-flex col-12 align-items-center justify-content-between flex-wrap'>
      {
        loading ?
          <GetSkeleton length={5} height={'50px'} width={'150px'} classes={'col-lg-2 col-md-4 col-6 py-2'} /> :
          <>
            {showCategories}
            <p onClick={handleCategory} className='category-bar m-0 px-2 py-3 fw-bold'>
              Show More...
            </p>
          </>
      }
    </div>
  )
}
