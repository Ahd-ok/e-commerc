import { useEffect, useRef, useState } from "react"
import { Axios } from "../../../Api/axios"
import { CAT, Pro } from "../../../Api/Api"
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Dashboard/Spinner/Loading";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct() {

  //Use Ref
  const focus = useRef('');
  const selectImage = useRef('');
  const progress = useRef([]);
  const ids = useRef([]);
  //Use navigate
  const nav = useNavigate();

  //Handle Ref
  useEffect(() => {
    focus.current.focus();
  }, [])

  //Use State
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [images, setImages] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState('');
  const [categories, setCategories] = useState([]);

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

  //dummyForm
  const dummyForm = {
    category: null,
    title: 'dummy',
    description: 'dummy',
    price: 222,
    discount: 0,
    About: 'About',
    stock: 0
  }

  //Get All Categories from Back
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, [])

  //Handle Form Change
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${Pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err)
    }
  }

  // Form Change 
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (!sent) {
      handleSubmitForm();
    }
  }

  //Handle EditSubmit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`/${Pro}/edit/${id}`, form)
      nav('/dashboard/products', { replace: true })
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Handle Click on Upload button
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
      const res = await Axios.delete(`/product-img/${id}`); // حذف الصورة من الباك 
      setImages(prev => prev.filter(image => image != img));   // حذف الصورة من الفرونت 
      ids.current = ids.current.filter(i => i != id);  // حذف أيدي الصورة 
      j.current--; // تقليل حجم مصفوفة الأيديات  الي منحفظ فيها ايدي الصور
    } catch (err) {
      console.log(err)
    }
  }

  // Mapping
  //Show Categories option 
  const showCategories = categories.map((item, key) => (
    <option key={key} value={item.id}>{item.title}</option>
  ))

  const showImages = images.map((img, key) => (
    <div key={key} style={{ boxShadow: '0 0 5px rgb(0 0 0 / 0.2)' }} className="border rounded bg-white mb-4 w-100 p-3">
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
  ));

  //Back Btn
  function backBtn() {
    setLoadingBack(true);
    setTimeout(() => {
      nav('/products', { replace: true })
    }, 500)
  }

  return (
    <div className='bg-section p-2'>
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label className="text-white">Stock:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Stock..."
            name='stock'
            value={form.stock}
            onChange={handleFormChange}
            required
            disabled={!sent}
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
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Control
            hidden
            multiple
            type="file"
            onChange={handleImagesChange}
            ref={selectImage}
            disabled={!sent}
          />
        </Form.Group>
        <div className="p-3 mb-4 rounded" style={{
          backgroundColor: 'white',
          boxShadow: '0 0 5px rgb(0 0 0 / 0.2)'
        }}>
          <h2 className="fw-bold">Upload Image</h2>
          <p style={{ display: !sent ? 'block' : 'none', fontSize: '12px', color: 'red' }}>Select Categories To Active!</p>
          <div onClick={handleSelectImage} className="d-flex flex-column justify-content-center align-items-center mt-3 mb-2 p-4 rounded"
            style={{ border: !sent ? '2px dotted #777' : '2px dotted #0086fa', cursor: sent && 'pointer' }}
          >
            <h4 style={{ color: !sent ? 'gray' : 'black' }}>Select image here</h4>
            <p style={{ color: '#777' }}>File Supported :jpg ,png</p>
            <p className="btn btn-primary" style={{ filter: !sent ? 'grayscale(1)' : '', cursor: !sent && 'default' }}>Choose Image</p>
          </div>
        </div>
        {showImages}
        <div className="d-flex align-items-center justify-content-between">
          <button
            disabled={!sent}
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