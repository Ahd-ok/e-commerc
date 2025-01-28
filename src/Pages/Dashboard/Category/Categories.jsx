import { useEffect, useState } from 'react'
import { Cat, CAT } from '../../../Api/Api'
import { Axios } from '../../../Api/axios';
import { Link } from 'react-router-dom';
import TableShow from '../../../Components/Dashboard/Bars/TableShow';


export default function Categories() {
  //use State 
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //Get All Categories from Back
  useEffect(() => {
    setLoading(true)
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err)).finally(() => {
        setLoading(false);
      });
  }, [limit, page]);

  //Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`/${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err)
    }
  }

  // Header data for Table 
  const header = [
    {
      key: 'image',
      name: 'Image'
    },
    {
      key: 'title',
      name: 'Title'
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
    <div className='w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between mb-2'>
        <h1 className="text-light">Categories Page</h1>
        <Link to={'/dashboard/category/add'} className='btn btn-light p-2'>
          Add Categories
        </Link>
      </div>
      <TableShow
        header={header}
        data={categories}
        deleteItem={handleDelete}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
        loading={loading}
        searchApi={Cat}
      />
    </div>
  )
}
