import React, { useContext, useState, useEffect } from 'react'
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Home from './page/Home';
import Cart from './page/Cart';
import Login from './components/Login.jsx';
import Footer from './components/Footer.jsx';
import Product from './page/Product';
import { StoreProvider } from './Context/Context';
import About from './page/About';
import { StoreContext } from './Context/Context';
import Man from './Pages/Man';
import AdminLayout from './components/Admin/AdminLayout';
import ProductsList from './components/Admin/Products/ProductsList';
import ProductForm from './components/Admin/Products/ProductForm';
import Checkout from './page/Checkout';
import Order from './components/Order';
import User from './components/Admin/User';
import ProductDetails from './page/ProductDetails';
const App = () => {
  const { token } = useContext(StoreContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [Loginpop, setLoginpop] = useState(false)

  const admin = localStorage.getItem("userId") === "67c624c401a956f0d06313ec";

  return (
    <StoreProvider>
      {Loginpop?<Login setLoginpop={setLoginpop}/>:<></>}
      <Navbar  setLoginpop={setLoginpop}/>
      <Routes>
        <Route path='/' element={<Home setLoginpop={setLoginpop}/>}/>
        
        {token ? <Route path='/Cart' element={<Cart/>}/> : null}
        {token ? <Route path='/Product/:id' element={<Product/>}/> : null}  
        <Route path='/About' element={<About/>}/>
        {token ? <Route path='/Checkout' element={<Checkout/>}/> : null}
        {token ? <Route path='/Orders' element={<Order/>}/> : null}
        <Route path='/Man' element={<Man/>}/>
        <Route path='/ProductDetails/:id' element={<ProductDetails setLoginpop={setLoginpop}/>}/>
        {admin ? (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductsList />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="users" element={<User />} />
          </Route>
        ) : null}
      </Routes>
   
    </StoreProvider>
  )
}

export default App