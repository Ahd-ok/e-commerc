import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import ImageGallery from "react-image-gallery";
import { useParams } from 'react-router-dom';
import { Axios } from '../../../Api/axios';
import { CART, Pro } from '../../../Api/Api';
import Stars from '../../../helpers/Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import GetSkeleton from '../../../Components/Website/Skeleton/GetSkeleton';
import { Cart } from '../../../Context/AddToCart';
import PlusMinusBtn from '../../../Components/Website/Btns/PlusMinusBtn';
import Loading from '../../../Components/Dashboard/Spinner/Loading';


export default function SingleProduct() {
  //Use State
  const [productImage, setProductImage] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [count, setCount] = useState(1);
  const { id } = useParams();
  //UseContext 
  const { setAddCart } = useContext(Cart);

  useEffect(() => {
    Axios.get(`${Pro}/${id}`).then((res) =>
    (setProductImage(res.data[0].images.map((img) => {
      return {
        original: img.image, thumbnail: img.image, originalHeight: 250,
        originalWidth: 250,
      }
    })),
      setProduct(res.data[0])
    )).finally(() => setLoading(false))
  }, []);

  const checkStock = async () => {
    try {
      setSpinner(true);
      const getItems = JSON.parse(localStorage.getItem('product')) || [];
      const productCount = product?.count;
      console.log(product)
      await Axios.post(`${CART}/check`, {
        product_id: id,
        count: count + (productCount ? productCount : 0)
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setSpinner(false);
    }
  }

  //Handle Shopping
  const handleShopping = async () => {
    const check = await checkStock();
    console.log(check)
    if (check) {
      const getItems = JSON.parse(localStorage.getItem('product')) || [];
      const productExist = getItems.findIndex((pro) => pro.id == id);
      if (productExist != -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }
      localStorage.setItem('product', JSON.stringify(getItems));
      setAddCart((prev) => !prev)
    }
  }

  return (
    <div>
      <Container style={{ height: '100vh' }} className='py-5'>
        {loading ?
          <div className='d-flex w-100 justify-content-center gap-3 py-5'>
            <div className='col-7'>
              <GetSkeleton length={1} height='25px' />
              <br />
              <GetSkeleton length={1} height='200px' />
              <div className='w-100 mt-3 d-flex justify-content-between ' >
                <div className='col-3'>
                  <GetSkeleton length={1} height='30px' />
                </div>
                <div className='col-3'>
                  <GetSkeleton length={1} height='30px' />
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 col-12'>
              <GetSkeleton length={1} height='250px' />
              <div className='d-flex justify-content-center mt-1 w-100'>
                <GetSkeleton length={3} height='70px' width={'80px'} />
              </div>
            </div>
          </div>
          :
          <div >
            <div style={{ backgroundColor: 'rgb(255 255 255 / 0.7)' }}
              className='d-flex align-items-start justify-content-center column-gap-5 flex-wrap p-4 rounded'>
              <div className='col-lg-7 col-md-6 col-12 text-end py-5 '>
                <h1 className='mb-3'>{product.title}</h1>
                <h5 className='mb-5 text-secondary'>{product.description}</h5>
                <h3 className='border-bottom pb-5'>{product.About}</h3>
                <div>
                  {product.stock <= 5 && <p className='text-danger'>There is only {product.stock} left</p>}
                  {Stars(product.rating)}
                  <div className='d-flex flip-horizontal align-items-center justify-content-between ms-3 '>
                    <div className='d-flex align-items-center justify-content-center column-gap-3'>
                      <div onClick={handleShopping}>
                        {spinner
                          ? <Loading btnStyle={true} />
                          : <FontAwesomeIcon className='border btn btn-primary text-white rounded p-2' color='#0b72d3' icon={faCartShopping} />}

                      </div>
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <h5 className='m-0 text-primary'>{product.discount}$</h5>
                      <h6 className='m-0 text-body-tertiary' style={{ textDecoration: 'line-through', color: 'lightgray' }}>{product.price}$</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-12'>
                <ImageGallery items={productImage} />
              </div>
            </div>
          </div>
        }
      </Container>
    </div >
  )
}
