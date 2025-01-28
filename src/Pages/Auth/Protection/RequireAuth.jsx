import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Dashboard/Spinner/Loading'
import { USER } from '../../../Api/Api'
import { Axios } from '../../../Api/axios'
import Error403 from '../Errors/Error403'

export default function RequireAuth({ allowedRole }) {

  //USe Navigate
  const nav = useNavigate()

  // Get Token From Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  //check if token storage before in backend or its fake
  const [user, setUser] = useState('');
  useEffect(() => {
    Axios.get(`/${USER}`).then(
      (data) => setUser(data.data))
      .catch(() => nav('/login', { replace: true }));

  }, []);

  return token ?
    (user === '' ?
      (<Loading />)
      : allowedRole.includes(user.role) ? (<Outlet />) : (<Error403 role={user.role} />)
    ) : (
      <Navigate to='/login' replace={true} />
    )
}
