import { useContext, useEffect, useState } from 'react'
import { Container, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../Assets/logo.png'
import shopping from '../../../Assets/shopping.png'
import profile from '../../../Assets/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import { CAT } from '../../../Api/Api'
import { Axios } from '../../../Api/axios'
import shortName from '../../../helpers/shortName'
import './NavBar.css'
import GetSkeleton from '../Skeleton/GetSkeleton'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Cart } from '../../../Context/AddToCart'
import PlusMinusBtn from '../Btns/PlusMinusBtn'

export default function NavBar() {
  // //Use Navigate
  // const nav = useNavigate();

  // function handleCategory() {
  //   nav('/categories')
  // }

  //UseState 
  // const [Categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Use Context 
  const { addCart } = useContext(Cart);

  /*
  //Get last 5 Categories
  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data.slice(-5))).finally(() => setLoading(false));
  }, [])

  // render Categories 
  const showCategories = Categories.map((item, key) =>
    <div key={key} className='d-flex align-items-center category-bar px-2 py-3'>
      <img style={{ marginRight: '10px', borderRadius: '50%' }} width={'50px'} height={'50px'} src={item.image} alt="" />
      <p className='m-0 '>
        {shortName(item.title, 15)}
      </p>
    </div>
  )
    */

  // get Product From LocalStorage
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('product')) || [])
  }, [addCart, count]);

  //handle Delete Product Form Cart 
  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id != id);
    setProducts(filterProduct);
    localStorage.setItem('product', JSON.stringify(filterProduct));
  }

  //handle Change Count 
  const changeCount = (id, btnCount) => {

    const getItem = JSON.parse(localStorage.getItem('product')) || [];
    const findProduct = getItem.find((product) => product.id == id);
    findProduct.count = btnCount;
    localStorage.setItem('product', JSON.stringify(getItem));
  }

  // Render Product in Cart
  const showProduct = products.map((product, key) =>
    <div key={key} className='d-flex position-relative border-bottom p-2'>
      <div className='me-4'>
        <img height={'100px'} src={product.images[0].image} />
      </div>
      <div className='w-100'>
        <div>
          <h6>{product.title}</h6>
          <p>{product.description}</p>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center gap-2'>
            <h5 className='m-0 text-primary'>{product.discount}$</h5>
            <h6 className='m-0 text-body-tertiary' style={{ textDecoration: 'line-through', color: 'lightgray' }}>{product.price}$</h6>
          </div>
          <PlusMinusBtn
            id={product.id}
            stock={product.stock}
            count={product.count || 1}
            changeCount={changeCount}
            setCount={(data) => setCount(data)}
          />
        </div>
      </div>
      <div onClick={() => handleDelete(product.id)}
        style={{ width: '20px', height: '20px', cursor: 'pointer' }} className='position-absolute top-1 end-0 d-flex align-items-center justify-content-center bg-danger  text-white rounded-circle'
      >
        <FontAwesomeIcon icon={faX} />
      </div>
    </div>
  );



  return (
    <div className=' position-absolute w-100 z-1'>
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>{showProduct}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='d-flex flex-wrap justify-content-between align-items-center py-3 px-2'>
          <Link to={'/'} className='col-3 position-relative' style={{ top: '5px' }} >
            <img height={'45px'} src={logo} alt="logo" />
          </Link>
          <div className='col-12 col-md-4 col-xl-6 order-md-2 order-3 mt-md-0 mt-3 d-flex align-items-center col-5 '>
            <InputGroup>
              <Form.Control
                className='input-search rounded-0'
                type='search'
                placeholder="البحث عن المنتج"
              />
            </InputGroup>

            <p className='d-flex align-items-center btn btn-primary rounded-0 px-3 mb-0'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='me-2' />
              بحث
            </p>
          </div>
          <div className='col-2 d-flex align-items-center justify-content-end gap-4 order-1 order-md-3'>
            <div style={{ cursor: 'pointer' }} onClick={handleShow}>
              <img src={shopping} width={'25px'} alt='cart' />
            </div>
            <Link style={{ cursor: 'pinter' }} to={'/profile'}>
              <img src={profile} alt="" width={'35px'} />
            </Link>
          </div>
        </div>
        {/*  
        <div>
          <div className='mt-4 d-flex align-items-center justify-content-between text-white flex-wrap '>
            {loading ? <GetSkeleton length={5} height={'35px'} width={'150px'} classes={'col-lg-2 col-md-4 col-12'} /> :
              <div className='d-flex align-items-center justify-content-between w-100'>
                {showCategories}
                <p onClick={handleCategory} className='category-bar m-0 px-2 py-3'>
                  Show More
                </p>
              </div>}

          </div>
        </div>
        */}
      </Container >
    </div >
  )
}
