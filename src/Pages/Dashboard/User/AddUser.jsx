import { useEffect, useRef, useState } from "react"
import { Axios } from "../../../Api/axios"
import { USER } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function AddUser() {

  //Ref
  const focus = useRef('');

  //use navigate
  const nav = useNavigate();

  //use State
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [role, setRole] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  //Form Change
  function formChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  //Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, [])

  // Handle Form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/add`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: role
      }).catch(() => nav('/dashboard/user/add', { replace: true }))
      nav('/dashboard/users', { replace: true })
      //window.location.pathname = '/dashboard/users'
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //Back Btn
  function backBtn() {
    setLoadingBack(true);
    setTimeout(() => {
      nav('/dashboard/users', { replace: true })
    }, 500)
  }

  return (
    <div className='w-100 p-2'>
      <h2 className="text-white">Add User</h2>
      <Form
        onSubmit={handleSubmit}
        className="p-2">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-light">User Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name..."
            name='name'
            value={form.name}
            onChange={formChange}
            required
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="text-light">Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email..."
            name='email'
            value={form.email}
            onChange={formChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="text-light">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password..."
            name='password'
            value={form.password}
            onChange={formChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role">
          <Form.Label className="text-light">Roles:</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)} >
            <option disabled value=''>Select Role</option>
            <option value="1995">Admin</option>
            <option value="1996">Write</option>
            <option value="2001">User</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-between">
          <button
            disabled={form.name.length === 0 || form.email.length === 0 || form.password.length < 6 || role === '' ? true : false}
            className="btn btn-light"
            type="submit"
          >
            save
            {loading ? (<Loading btnStyle={true} />) : (<>  <FontAwesomeIcon className="ms-2" icon={faFloppyDisk} /></>)}
          </button>
          <button className="btn btn-light"
            onClick={backBtn}
            type="button"
          >
            Back
            {loadingBack ? (<Loading btnStyle={true} />) : (<>  <FontAwesomeIcon icon={faArrowRightToBracket} /></>)}
          </button>
        </div>
      </Form>
    </div >
  )
}