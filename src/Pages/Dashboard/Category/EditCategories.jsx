import { useEffect, useState } from "react"
import { Axios } from "../../../Api/axios"
import { Cat } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function EditCategories() {

  //use State
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);
  //use navigate
  const nav = useNavigate();

  //Use State to show name and email
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  // Get user id from pathname
  const { id } = useParams();

  //get Category from back
  useEffect(() => {
    setLoadingSpin(true);
    Axios.get(`/${Cat}/${id}`).then((data) => {
      setTitle(data.data.title);
      setLoadingSpin(false);
    }).then(() => setDisabled(false)).catch(() => nav('dashboard/category/page/404', { replace: true }))
  }, [])

  //Back Btn
  function backBtn() {
    setLoadingBack(true);
    setTimeout(() => {
      nav('/dashboard/categories', { replace: true })
    }, 500)
  }

  //Form Change
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image)
      await Axios.post(`${Cat}/edit/${id}`, formData).catch(() => nav('/dashboard/users', { replace: true }))
      nav('/dashboard/categories', { replace: true })
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div className='w-100 p-2'>
      {loadingSpin && <Loading />}
      <h2 className="text-white">Update Category</h2>
      <Form
        onSubmit={handleSubmit}
        className="p-2">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-white">Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title..."
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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