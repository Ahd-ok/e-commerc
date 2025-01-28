import { useEffect, useState } from 'react'
import { USER, USERS } from '../../../Api/Api'
import { Axios } from '../../../Api/axios';
import { Link } from 'react-router-dom';
import TableShow from '../../../Components/Dashboard/Bars/TableShow';
export default function Users() {

  //use State 
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // Get Current User 
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setCurrentUser(res.data))
  }, [])

  //Get All Uses from Back
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      }).finally(() => setLoading(false));
  }, [limit, page])

  //Handle Delete

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id != id));
    } catch (err) {
      console.log(err)
    }
  }

  // Header data for Table 
  const header = [
    {
      key: 'name',
      name: 'User Name'
    },
    {
      key: 'email',
      name: 'Email'
    },
    {
      key: 'role',
      name: 'Role'
    },
    {
      key: 'created_at',
      name: 'Created'
    },
    {
      key: 'updated_at',
      name: 'Last Login'
    },
  ]

  return (
    <div className='w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between'>
        <h1 className='text-white'>User Page</h1>
        <Link to={'/dashboard/user/add'} className='btn btn-light p-2'>
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        deleteItem={handleDelete}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        total={total}
        loading={loading}
        searchApi={USER}
      />
    </div>
  )
}
