import { faMagnifyingGlass, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PaginatedItems from '../Pagination/Pagination';
import { Axios } from '../../../Api/axios';
import TransformDate from '../../../helpers/TransformDate';


export default function TableShow(props) {
  //UseState
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [date, setDate] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //Get Current User
  const currentUser = props.currentUser || {
    name: ''
  };
  //filter data by date
  const filterDataByDate = props.data.filter((item) => TransformDate(item.created_at) === date)
  //filter data by search and date
  const filterSearchByDate = filteredData.filter((item) => TransformDate(item.created_at) === date);

  const showData =
    date.length !== 0 ?
      search.length > 0 ? filterSearchByDate : filterDataByDate
      :
      search.length > 0 ? filteredData : props.data;

  //Get Search Data From Backend
  async function getSearchData() {
    try {
      const res = await Axios.post(`/${props.searchApi}/search?title=${search}`);
      //filter data from with search only
      setFilteredData(res.data)
    } catch (error) {
      console.log(error)
    }
    finally {
      setSearching(false);
    }
  }
  //Delay get Search 
  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearching(false);
    }, 500)

    return () => clearTimeout(delay);
  }, [search, props.data]);

  //handle Table Header
  const headerShow = props.header.map((headerItem, index) =>
    <th key={index}>{headerItem.name}</th>);

  //Handle Table data
  const dataShow = showData.map((dataItem, index) =>
    <tr key={index}>
      <td>{dataItem.id}</td>
      {props.header.map((headerItem, key) => (
        <td key={key}>
          {
            headerItem.key === 'images' ? dataItem[headerItem.key].map((img, key) =>
              <img key={key} style={{ margin: '10px' }} width='60px' src={img.image} />)
              : headerItem.key === 'image' ? <img width='60px' src={dataItem[headerItem.key]} />
                : dataItem[headerItem.key] === '1995' ? 'Admin'
                  : dataItem[headerItem.key] === '1996' ? 'Writer'
                    : dataItem[headerItem.key] === '1999' ? 'Product Manger'
                      : dataItem[headerItem.key] === '2001' ? 'User'
                        : dataItem[headerItem.key] === currentUser.name ? `${dataItem[headerItem.key]} (You)`
                          : headerItem.key === 'created_at' || headerItem.key === 'updated_at' ?
                            TransformDate(dataItem[headerItem.key])
                            : dataItem[headerItem.key]
          }
        </td>))}
      <td>
        <div className='d-flex'>
          <Link to={`${dataItem.id}`} >
            <FontAwesomeIcon cursor={'pointer'} style={{ marginRight: '20px' }} icon={faPenToSquare} />
          </Link>
          {
            dataItem.name != currentUser.name &&
            <div style={{ display: 'inline-block' }} >
              <FontAwesomeIcon onClick={() => props.deleteItem(dataItem.id)} cursor={'pointer'} style={{ color: 'red' }} icon={faTrashCan} />
            </div>
          }
        </div>
      </td>
    </tr>);
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div className='col-3 mb-2'>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-sm"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
            <Form.Control
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSearching(true);
              }}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </div>
        <div className='col-4 mb-2'>
          <InputGroup size="sm">
            <Form.Control
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </InputGroup>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {props.loading ? <tr>
            <td colSpan={12} className='text-center'>Loading...</td>
          </tr> : searching ?
            <tr>
              <td colSpan={12} className='text-center'>Searching...</td>
            </tr>
            : !searching & search.length > 0 & filteredData.length === 0 ?
              <tr>
                <td colSpan={12} className='text-center'>No data!</td>
              </tr>
              :
              dataShow
          }
        </tbody>
      </Table>
      <div className='d-flex align-items-center justify-content-end flex-wrap pe-3'>
        <div className='col-1'>
          <Form.Select onChange={(e) => props.setLimit(e.target.value)} aria-label="Default select example">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems limit={props.limit} data={props.data} setPage={props.setPage} total={props.total} />
      </div>

    </div>
  )
}
