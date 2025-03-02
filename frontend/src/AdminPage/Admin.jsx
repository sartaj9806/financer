import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../Context/AdminContex'
import toast from 'react-hot-toast';
import axios from 'axios';

const Admin = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoginAdmin, backendUrl } = useContext(AdminContext)

  useEffect(() => {
    isLoginAdmin();
  }, [])

  const handleCreatFinancer = async (e) => {
    e.preventDefault();
    console.log("hllo")
    console.log(name, password, email)

    try {

    const {data} = await axios.post(backendUrl + '/financer/register', {
        name, email, password
      })

      console.log(data)

      if(data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='px-10 mt-24 bg-red-300 flex justify-between' >

      <aside className='border-r w-md p-4'>
        <div className='text-right mb-4'>
          <button className='bg-blue-600 px-3 py-1 text-white font-medium text-lg rounded-full'>Add</button>
        </div>

        <div className='flex flex-col gap-4'>


          {/* User card */}
          <div className='border bg-blue-300 px-4 py-2'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='flex-1'>Sartaj Alam</h2>
              <div>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
              </div>
            </div>

            <form>

              <div className='flex gap-2 border'>
                <div>Name</div>
                <input type="text" />
              </div>

            </form>

          </div>

          <div className='flex justify-between items-center border bg-blue-300 px-4 py-2'>
            <h2 className='flex-1'>Sartaj Alam</h2>
            <div>
              <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
              <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
            </div>
          </div>

          <div className='flex justify-between items-center border bg-blue-300 px-4 py-2'>
            <h2 className='flex-1'>Sartaj Alam</h2>
            <div>
              <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
              <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
            </div>
          </div>

        </div>

      </aside>

      <div className='flex justify-center items-center w-2/3 border '>
        <form onSubmit={handleCreatFinancer} className='flex flex-col'>
          <input className='border bg-white outline-none' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter financer name..' />
          <input className='border bg-white outline-none' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter financer email..' />
          <input className='border bg-white outline-none' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter financer password..' />

          <button className='bg-blue-600 py-2 rounded-full'>Submit</button>
        </form>
      </div>

    </div>
  )
}

export default Admin
