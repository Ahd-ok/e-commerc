import { useEffect, useRef, useState } from "react"
import { Axios } from "../../../Api/axios"
import { CAT, Pro } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct() {

  //Use Ref
  const focus = useRef('');
  const selectImage = useRef('');
  const progress = useRef([]);
  const ids = useRef([]);
  //Use navigate
  const nav = useNavigate();
  //Use Params
  const { id } = useParams();
  //Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, [])

  //Use State
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [disable, setDisable] = useState(true);
  const [categories, setCategories] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  //form
  const [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
    stock: ''
  })


  //Get Product By Id
  useEffect(() => {
    Axios.get(`/${Pro}/${id}`)
      .then((data) => {
        setForm(data.data[0])
        setImagesFromServer(data.data[0].images)
      })
      .then(() => setDisable(false));
  }, []);
  //Get All Categories from Back by id
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  //Handle EditSubmit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      for (let i = 0; i < idDelete.length; i++) {
        await Axios.delete(`/product-img/${idDelete[i]}`);
      }
      await Axios.post(`${Pro}/edit/${id}`, form)
      nav('/dashboard/products', { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Form Change 
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Show select file on click at upload button
  function handleSelectImage() {
    selectImage.current.click();
  }

  // Handle image Change
  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFile = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFile.length; i++) {
      j.current++;
      data.append('image', imagesAsFile[i]);
      data.append('product_id', id)
      try {
        const res = await Axios.post('/product-img/add', data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 20 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute('percent', `${percent}%`);
            }
          }
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Handle Delete Image
  async function handleDeleteImage(key, img) {
    const id = ids.current[key];
    try {
      await Axios.delete(`/product-img/${id}`); // حذف الصورة من الباك 
      setImages(prev => prev.filter(image => image != img));   // حذف الصورة من الفرونت 
      ids.current = ids.current.filter(i => i != id);  // حذف أيدي الصورة 
      j.current--; // تقليل حجم مصفوفة الأيديات  الي منحفظ فيها ايدي الصور
    } catch (err) {
      console.log(err)
    }
  }
  async function deleteButton(id) {
    setImagesFromServer((prev) => prev.filter((images) => images.id != id));
    setIdDelete((prev) => { return [...prev, id] });
  }

  //Back Btn
  function backBtn() {
    setLoadingBack(true);
    setTimeout(() => {
      nav('/dashboard', { replace: true })
    }, 500)
  }

  // Mapping
  //Show Categories option 
  const showCategories = categories.map((item, key) => (
    <option key={key} value={item.id}>{item.title}</option>
  ))

  const showImagesFromServer = imagesFromServer.map((img, key) => (
    <div key={key} className="position-relative border p-2"
    >
      <img width={'200px'} src={img.image} />
      <p onClick={() => deleteButton(img.id)}
        style={{ top: '5px', right: '5px', padding: '2px 6px', fontSize: '12px' }}
        className="btn btn-danger position-absolute">
        X
      </p>
    </div>
  ));

  const showImages = images.map((img, key) => (
    <div key={key} style={{ boxShadow: '0 0 5px rgb(0 0 0 / 0.2)' }} className="border mb-2 w-100 p-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2 mb-2align-items-start">
          <img width={'140px'} src={URL.createObjectURL(img)} />
          <div>
            <p className="mb-1">{img.name}</p>
            <p> {img.size / 1024 < 900
              ? `${(img.size / 1024).toFixed(2)} KB`
              : `${(img.size / (1024 * 1024)).toFixed(2)} MB`}
            </p>
          </div>
        </div>
        <div>
          <p onClick={() => handleDeleteImage(key, img)} className="btn btn-danger">Delete</p>
        </div>
      </div>
      <div
        className="custom-progress"
      >
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"></span>
      </div>
    </div >
  ))


  return (
    <div className='w-100 p-2'>
      <h2 className="text-white">Add Product</h2>
      <Form

        onSubmit={HandleEdit}
        className="p-2">
        <Form.Group className="mb-3" controlId="categories">
          <Form.Label className="text-white">Categories:</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleFormChange}
            required
            ref={focus}
          >
            <option disabled>Select Category</option>
            {showCategories}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="text-white">Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title..."
            name="title"
            value={form.title}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label className="text-white">Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description..."
            name="description"
            value={form.description}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label className="text-white">Price:</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Price..."
            value={form.price}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label className="text-white">Discount:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Discount..."
            name='discount'
            value={form.discount}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label className="text-white">About:</Form.Label>
          <Form.Control
            type="text"
            placeholder="About..."
            name="About"
            value={form.About}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="text-white">Stock:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Stock..."
            name="stock"
            value={form.stock}
            onChange={handleFormChange}
            required
            disabled={disable}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Control
            hidden
            multiple
            type="file"
            onChange={handleImagesChange}
            ref={selectImage}
            disabled={disable}
          />
        </Form.Group>
        <div className="p-3 mb-4 rounded" style={{
          boxShadow: '0 0 5px rgb(0 0 0 / 0.2)'
        }}>
          <h2 className="fw-bold text-white">Upload Image</h2>
          <div onClick={handleSelectImage} className="d-flex flex-column justify-content-center align-items-center mt-3 mb-2 p-4 rounded"
            style={{ border: disable ? '2px dotted #777' : '2px dotted white', cursor: disable && 'pointer' }}
          >
            <h4 style={{ color: disable ? 'gray' : 'white' }}>Select image here</h4>
            <p style={{ color: '#ddd' }}>File Supported :jpg ,png</p>
            <p className="btn btn-light" style={{ filter: disable ? 'grayscale(1)' : '', cursor: disable && 'default' }}>Choose Image</p>
          </div>
        </div>
        <div className="d-flex m-3 flex-wrap gap-2">
          {showImagesFromServer}
        </div>

        {showImages}
        <div className="d-flex align-items-center justify-content-between">
          <button
            disabled={disable}
            className="btn btn-light"
            type="submit"
          >
            save
            {loading
              ? (<Loading btnStyle={true} />)
              : (<>  <FontAwesomeIcon className="ms-2" icon={faFloppyDisk} /></>)
            }
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