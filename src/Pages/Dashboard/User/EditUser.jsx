import { useEffect, useState } from "react"
import { Axios } from "../../../Api/axios"
import { USER } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function EditUser() {

  //use State
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);

  //use navigate
  const nav = useNavigate();

  //Use State to show name and email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Get user id from pathname
  const { id } = useParams();

  //get user from back
  useEffect(() => {
    setLoadingSpin(true);
    Axios.get(`/${USER}/${id}`).then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setLoadingSpin(false);
    }).then(() => setDisabled(false)).catch(() => nav('dashboard/user/page/404', { replace: true }))
  }, [])

  //Back Btn
  function backBtn() {
    setLoadingBack(true);
    setTimeout(() => {
      nav('/dashboard/users', { replace: true })
    }, 500)
  }

  //Form Change
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role
      }
      ).catch(() => nav('/dashboard/users', { replace: true }))
      nav('/dashboard/users', { replace: true })
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <div className='w-100 p-2'>
      {loadingSpin && <Loading />}
      <h2 className="text-light">Update User</h2>
      <Form
        onSubmit={handleSubmit}
        className="p-2">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-light">User Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name..."
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="text-light">Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email..."
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button className="btn btn-light "
            type="submit"
            disabled={disabled}
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

      </Form >
    </div >
  )
}