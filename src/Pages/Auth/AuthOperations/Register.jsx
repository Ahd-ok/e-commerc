import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../../Api/Api";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import Cookie from 'cookie-universal'

export default function Register() {

  //Use Cookie
  const cookie = Cookie();

  //Ref
  const focus = useRef('');

  // Use State To Use Spinner
  const [spinner, setSpinner] = useState(false);

  //Use State To Show Error
  const [error, setError] = useState('');

  //Use Form State 
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  //Handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, [])

  //Handle Submit Change
  async function onSubmitChange(e) {
    e.preventDefault();
    setSpinner(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      cookie.set('e-commerce', res.data.token);
      setSpinner(false);
      window.location.pathname = '/dashboard'
    } catch (err) {
      if (err.response.status === 422) {
        setError('Email Already Taken!');
      } else {
        setError('Internal Server Error')
      }
      setSpinner(false);
    }
  }

  return (
    <div className="contain" >
      {spinner && <Loading />}
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={onSubmitChange}>
          <div className="form-group">
            <input
              id='name'
              type='text'
              placeholder='Username'
              name='name'
              value={form.name}
              onChange={handleFormChange}
              required
              ref={focus}
            />
            <label htmlFor="name">Username:</label>
          </div>
          <div className="form-group">
            <input
              id='email'
              type='email'
              placeholder='Email'
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="email">Email:</label>
            {error != '' && <p className="error"> {error}</p>}
          </div>
          <div className="form-group">
            <input
              id='password'
              type='password'
              placeholder='Password'
              name="password"
              value={form.password}
              onChange={handleFormChange}
              minLength={6}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
          <button type="submit" className="btn btn-primary" >
            Register
          </button>
          <div className="btn-google btn btn-primary mt-3">
            <a href={`http://127.0.0.1:8000/login-google`}>
              OR Register With Google
              <img src="/google.png" alt="" />
            </a>
          </div>
          <Link to={'/login'} style={{ textAlign: 'center', marginTop: '35px', textDecoration: 'none' }}>
            <span> if You have an account you Can </span>Login.
          </Link>
        </form>
      </div >
    </div >
  );
}
