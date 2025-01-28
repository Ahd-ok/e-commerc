import axios from "axios";
import { baseURL } from './Api.jsx'
import Cookie from 'cookie-universal'

const cookie = Cookie();
const token = cookie.get('e-commerce');

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    baseURL,
    Authorization: `Bearer ${token}`
  }
})