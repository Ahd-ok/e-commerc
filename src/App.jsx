import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/Website/HomePage/HomePage"
import Register from "./Pages/Auth/AuthOperations/Register"
import Login from "./Pages/Auth/AuthOperations/Login"
import './Pages/Auth/AuthOperations/auth.css'
import Users from "./Pages/Dashboard/User/Users"
import GoogleCallBack from "./Pages/Auth/AuthOperations/GoogleCallBack"
import Dashboard from "./Pages/Dashboard/Dashboard"
import RequireAuth from "./Pages/Auth/Protection/RequireAuth"
import EditUser from "./Pages/Dashboard/User/EditUser"
import AddUser from "./Pages/Dashboard/User/AddUser"
import Error404 from "./Pages/Auth/Errors/Error404"
import RequireBack from "./Pages/Auth/Protection/RequireBack"
import Categories from "./Pages/Dashboard/Category/Categories"
import AddCategory from "./Pages/Dashboard/Category/AddCategory"
import EditCategories from "./Pages/Dashboard/Category/EditCategories"
import Products from "./Pages/Dashboard/Product/Products"
import AddProduct from "./Pages/Dashboard/Product/AddProduct"
import EditProduct from "./Pages/Dashboard/Product/EditProduct"
import CategoriesPage from "./Pages/Website/Categories/CategoriesPage"
import WebSite from "./Pages/Website/HomePage/WebSite"
import SingleProduct from "./Pages/Website/SingleProduct/SingleProduct"

function App() {
  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route element={<WebSite />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path='/product/:id' element={<SingleProduct />} />
        </Route>
        {/* Auth */}
        {/* Protected from back */}
        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        </Route>
        <Route path="/*" element={<Error404 />} />

        {/* Protected Route */}
        <Route element={<RequireAuth allowedRole={['1995', '1999']} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Admin */}
            <Route element={<RequireAuth allowedRole={['1995']} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            {/* Category Manger */}
            <Route element={<RequireAuth allowedRole={['1995', '1999']} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<EditCategories />} />
              <Route path="category/add" element={<AddCategory />} />
            </Route>
            {/* Product Manger */}
            <Route element={<RequireAuth allowedRole={['1995', '1999']} />}>
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<EditProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div >
  )
}

export default App
