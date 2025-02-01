import { useEffect, useState } from 'react'
import { Pro, PRO } from '../../../Api/Api'
import { Axios } from '../../../Api/axios';
import { Link } from 'react-router-dom';
import TableShow from '../../../Components/Dashboard/Bars/TableShow';

export default function Products() {
  //use State 
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //Get All Products from Back
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page])
  //Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`/${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err)
    }
  }

  // Header data for Table 
  const header = [
    {
      key: 'images',
      name: 'Images'
    },
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'description',
      name: 'description'
    },
    {
      key: 'price',
      name: 'Price'
    },
    {
      key: 'rating',
      name: 'Rating'
    },
    {
      key: 'stock',
      name: 'stock'
    },
    {
      key: 'created_at',
      name: 'Created at'
    },
    {
      key: 'updated_at',
      name: 'Updated at'
    },

  ]

  return (
    <div className='bg-section p-2'>
      <div className='d-flex align-items-center justify-content-between'>
        <h1 className="text-white">Products Page</h1>
        <Link to={'/dashboard/product/add'} className='btn btn-light p-2'>
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        deleteItem={handleDelete}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
        loading={loading}
        searchApi={Pro}
      />
    </div>
  )
}
