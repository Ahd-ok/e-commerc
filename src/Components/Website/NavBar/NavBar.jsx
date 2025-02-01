import { useContext, useEffect, useState } from 'react'
import { Container, Dropdown, Form, InputGroup, NavLink } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../Assets/logo.png'
import shopping from '../../../Assets/shopping.png'
import profile from '../../../Assets/profile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import { LOGOUT, USER } from '../../../Api/Api'
import { Axios } from '../../../Api/axios'
import './NavBar.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Cart } from '../../../Context/AddToCart'
import PlusMinusBtn from '../Btns/PlusMinusBtn'
import Cookie from 'cookie-universal'
import Loading from '../../Dashboard/Spinner/Loading'

export default function NavBar() {
  //Using Nav
  const nav = useNavigate();

  //UseState 
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get Token From Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  //Use Context 
  const { addCart } = useContext(Cart);

  //get user 
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => {
      setName(res.data.name);
      setRole(res.data.role)
    })
  }, [reload]);


  // Handle LogOut
  async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove('e-commerce');
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error)
    }

  }

  //go to login
  function goToLogin() {
    setSpinner(true)
    setTimeout(() => {
      nav('/login')
    }, 1000)
  }


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
    <>{spinner
      ? <Loading />
      :
      <div style={{ backgroundColor: 'transparent' }} className='position-absolute w-100 z-1'>
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
            </Modal.Footer>
          </Modal>
          <div className='d-flex flex-wrap justify-content-between align-items-center py-3 px-2'>
            <Link to={'/'} className='col-3' style={{ top: '5px' }} >
              <img height={'30px'} src={logo} alt="logo" />
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
              <div>
                {token
                  ? name === ''
                    ? <Loading btnStyle={true} />
                    : <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {name}
                      </Dropdown.Toggle>
                      < Dropdown.Menu >
                        {role === '1999' || role === '1995' ?
                          <Dropdown.Item as="button" >
                            <Link className='text-dark' to='/dashboard'>Dashboard</Link>
                          </Dropdown.Item> : ''}
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  :
                  <Link style={{ cursor: 'pinter' }} onClick={goToLogin}>
                    <img src={profile} alt="" width={'35px'} /></Link>
                }
              </div>

            </div>
          </div>

        </Container >
      </div >}
    </>

  )
}
