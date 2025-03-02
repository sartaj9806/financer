import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Print from './components/Print';
import CustomerProfile from './components/CustomerProfile';
import AddNewCustomer from './components/AddNewCustomer';
import CustomerEmiEntry from './components/CustomerEmiEntry';
import Admin from './AdminPage/Admin';
import AdminLoginPage from './AdminPage/AdminLoginPage';


const App = () => {
  // const token = localStorage.getItem('jwt')
  const location = useLocation();

  const showNavbar = location.pathname !== '/print';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/print" element={<Print />} />
        <Route path="/add" element={<AddNewCustomer />} />
        <Route path="/entry" element={<CustomerEmiEntry />} />
        <Route path="/client/:id" element={<CustomerProfile />} />

        {/* Admin Routes */}

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/login' element={<AdminLoginPage />} />


      </Routes>
      <Toaster />
    </>
  )
}

export default App