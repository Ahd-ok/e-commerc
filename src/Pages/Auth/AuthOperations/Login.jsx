import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../Api/Api";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import Cookie from 'cookie-universal'

export default function Login() {

  //Use Cookie
  const cookie = Cookie();

  // Use State To Use Spinner
  const [spinner, setSpinner] = useState(false);

  //Use State To Show Error
  const [error, setError] = useState('');

  //Use State 
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  //Ref
  const focus = useRef('');
  // Handle Focus
  useEffect(() => {
    focus.current.focus()
  }, []);

  //handle Form Change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Handle Submit Change
  async function onSubmitChange(e) {
    e.preventDefault();
    setSpinner(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      cookie.set('e-commerce', res.data.token);
      const role = res.data.user.role;
      const nav = role === '1995' ? 'users' : 'writer'
      setSpinner(false);
      window.location.pathname = `/dashboard/${nav}`;
    } catch (err) {

      if (err.response.status === 401) {
        setError('Email OR Password is Wrong!');
      } else {
        setError('Internal Server Error')
      }
      setSpinner(false)
    }
  }

  return (
    <div className="contain" >
      {spinner && <Loading />}
      <div className="form-container" style={{ height: '480px' }}>
        <h1>Login</h1>
        <form onSubmit={onSubmitChange} >
          <input
            id='email'
            type='email'
            placeholder='Email'
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
            ref={focus}
          />
          <input
            id='password'
            type='password'
            placeholder='Password'
            name="password"
            value={form.password}
            onChange={handleFormChange}
            required
          />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <div className="btn-google mt-3 btn btn-primary">
            <a href="http://127.0.0.1:8000/login-google">
              OR Register With Google
              <img src="/google.png" alt="" />
            </a>
          </div>
          {error != '' && <p className="error">{error}</p>}
          <Link
            to={'/register'} style={{ marginTop: '35px', textDecoration: 'none' }}>
            <span> if you  don't have an account you Can </span>Register.
          </Link>
        </form>
      </div>
    </div>
  );
}
