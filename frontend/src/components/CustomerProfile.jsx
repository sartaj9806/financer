import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomerProfileUpdate from './CustomerProfileUpdate';

const CustomerProfile = () => {

  axios.defaults.withCredentials = true;

  const { id } = useParams();
  const [customerAllEmis, setCustomerAllEmis] = useState([]);
  const [editIndex, setEditIndex] = useState(false)
  const [emiUpdateInputValue, setEmiUpdateInputValue] = useState(0)
  const [emiEntryInputValue, setEmiEntryInputValue] = useState('')
  const [emiEntryDateValue, setEmiEntryDateValue] = useState('')
  const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(false)

  const emiUpdateInputRef = useRef();

  const { backendUrl, getSingleCustomer, singleCustomer, setSingleCustomer, handleIsLogin } = useContext(AppContext);

  const navigate = useNavigate()


  useEffect(() => {
    getSingleCustomer(id);
  }, [id]);


  useEffect(() => {
    if (singleCustomer.loanRepayment) {
      setCustomerAllEmis(singleCustomer.loanRepayment);
    }
  }, [singleCustomer]);

  useEffect(() => {
    if (editIndex !== null && emiUpdateInputRef.current) {
      emiUpdateInputRef.current.focus();
    }
  }, [editIndex]);


  const opendate = new Date(singleCustomer.openDate);
  const openformattedDate = opendate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replaceAll('/', '-');

  const closedate = new Date(singleCustomer.closeDate);
  const closeformattedDate = closedate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replaceAll('/', '-');



  const showEmiUpdateInput = async (index, emi) => {
    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    setEditIndex(index)
    setEmiUpdateInputValue(emi)
  }

  const handleEmiUpdate = async (index) => {

    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    try {
      const { data } = await axios.put(backendUrl + `/customer/customer-emi-update/${id}`, {
        index, newAmount: emiUpdateInputValue
      })

      if (data.success) {
        toast.success(data.message)
        setSingleCustomer(data.customer)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setEditIndex(false)
  }

  const handleEMIDelete = async (index) => {

    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    try {

      const { data } = await axios.delete(backendUrl + `/customer/customer-emi-delete/${id}`, {
        index
      })

      if (data.success) {
        toast.success(data.message)
        setSingleCustomer(data.customer)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleAddSingleEmiEntry = async () => {

    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    try {
      const { data } = await axios.put(backendUrl + `/customer/add-single-customer-emi/${id}`, {
        EMIReceived: emiEntryInputValue,
        Date: emiEntryDateValue
      })

      if (data.success) {
        toast.success(data.message)
        setSingleCustomer(data.customer)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleCustomerProfileEdit = async () => {

    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    setIsShowUpdateProfile(!isShowUpdateProfile)
  }

  const handleCustomerProfileDelete = async () => {

    const isLogin = await handleIsLogin();

    if (!isLogin) {
      return
    }

    const deleteInput = prompt('Enter Delete for deletion')
    if (deleteInput !== 'Delete') {
      toast.error(`You entered wrong ${deleteInput}`)
      return
    }


    try {

      const { data } = await axios.delete(backendUrl + `/customer/delete-customer-profile/${id}`)

      if (data.success) {
        toast.success(data.message)
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <div className='container mx-auto mt-20 md:mt-48'>


      <div className=' p-2 flex gap-4 justify-between  flex-col md:flex-row bg-blue-300 border ' >


        {isShowUpdateProfile ? <CustomerProfileUpdate /> :
          <div className='w-full md:1/2 border-r'>
            <h2 className='text-2xl font-bold text-center'>Customer Loan Profile</h2>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Name:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.name}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Phone:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.phone}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Address:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.address}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Open Date:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{openformattedDate}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Close Date:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{closeformattedDate}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Account No:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.accountNo}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Loan Amount:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.loanAmount}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>EMI Amount:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.EMIAmount}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>With Interest:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.withInterest}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Balance:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.balance}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Should Receive:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.shouldReceive}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Received:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.received}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>Pending Due:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.pendingBalance}</p>
            </div>

            <div className='flex gap-4 items-center '>
              <p className='text-lg font-normal'>EMI Count:</p>
              <p className='rounded-md px-2 py-1 text-lg font-semibold'>{singleCustomer.EMICount}</p>
            </div>

            <div className='text-right'>
              <button className='bg-blue-600 text-white font-medium rounded-full px-4 py-1 hover:bg-white hover:text-black cursor-pointer' onClick={handleCustomerProfileEdit}>Edit</button>

              <button className='bg-blue-600 text-white font-medium rounded-full px-4 py-1 hover:bg-white hover:text-black cursor-pointer ml-4' onClick={handleCustomerProfileDelete}>Delete</button>
            </div>
          </div>}




        <div className='w-full md:1/2'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Loan Details</h2>
          <ul className='h-[50vh] overflow-y-scroll w-full scrollbar-custom'>
            {
              customerAllEmis.map((emi, index) => {

                const emiDate = new Date(emi.Date);
                const emiFormattedDate = emiDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replaceAll('/', '-');

                return (
                  <li key={index} className='flex gap-2 mt-1 w-full'>
                    <p className='w-8'>{index + 1}</p>
                    <p className='w-28 '>{emiFormattedDate}  </p>
                    {
                      editIndex === index ?
                        <input className='w-20 text-center bg-white px-1 border' type="Number" ref={emiUpdateInputRef} value={emiUpdateInputValue}
                          onChange={(e) => setEmiUpdateInputValue(e.target.value)} />
                        :
                        <p className='w-20 '>{emi.EMIReceived} </p>
                    }
                    {
                      editIndex === index ?
                        <button className='hover:bg-white cursor-pointer px-2 rounded-md' onClick={() => handleEmiUpdate(index)} >
                          Save
                        </button>
                        :
                        <button className='hover:bg-white cursor-pointer px-2 rounded-md' onClick={() => showEmiUpdateInput(index, emi.EMIReceived)} >
                          Edit
                        </button>
                    }

                    <button className='hover:bg-white cursor-pointer px-2 rounded-md' onClick={() => handleEMIDelete(index)}>Delete</button>

                  </li>
                )
              })
            }

          </ul>

          <div className='bg-blue-300 flex gap-4 mt-4 justify-end'>
            <input className='border w-20 bg-white px-1' type="Number" value={emiEntryInputValue} onChange={(e) => setEmiEntryInputValue(e.target.value)} />
            <input className='border bg-white text-black' type="date" value={emiEntryDateValue} onChange={(e) => setEmiEntryDateValue(e.target.value)} />

            <button className='bg-blue-600 text-white font-medium rounded-full px-4 py-1 hover:bg-white hover:text-black cursor-pointer' onClick={handleAddSingleEmiEntry}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
