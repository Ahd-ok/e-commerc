import { useEffect, useRef, useState } from "react"
import { Axios } from "../../../Api/axios"
import { Cat } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function AddCategory() {

  //Use Ref
  const focus = useRef('');

  //Use State
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);

  //Use navigate
  const nav = useNavigate();

  //Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, [])

  //Form Change
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image)
    try {
      await Axios.post(`${Cat}/add`, formData)
        .catch(() => nav('/dashboard/cat/add', { replace: true }))
      nav('/dashboard/categories', { replace: true })
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
      nav('/dashboard', { replace: true })
    }, 500)
  }


  return (
    <div className='w-100 p-2'>
      <h2 className="text-white"> Add Category</h2>
      <Form
        onSubmit={handleSubmit}
        className="p-2">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-white">Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label className="text-white">Image:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
            required
          />
        </Form.Group>
        <div className="d-flex align-items-center justify-content-between">
          <button
            disabled={title.length < 1 ? true : false}
            className="btn btn-primary"
            type="submit"
          >
            save
            {loading ? (<Loading btnStyle={true} />) : (<>  <FontAwesomeIcon className="ms-2" icon={faFloppyDisk} /></>)}
          </button>
          <button className="btn btn-primary"
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