import axios from 'axios'
import React, { useEffect } from 'react'
import { baseURL, GOOGLE_CALL_BACK } from '../../../Api/Api'
import { useLocation } from 'react-router-dom'
import Cookie from 'cookie-universal'

export default function GoogleCallBack() {

  const cookie = Cookie();

  const location = useLocation();
  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        )
        cookie.set('e-commerce', res.data.access_token);
      } catch (err) {
        console.log(err)
      }
      window.location.pathname = '/'
    }
    googleCall();
  }, [])

  return <>
  </>
}
