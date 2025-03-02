import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Home = () => {

    const { backendUrl, allCustomers, getAllCustomer } = useContext(AppContext);

    useEffect(() => {
        getAllCustomer();
        console.log("Home")
    }, [])


    return (
        <div className='container mx-auto mt-24' >
            <h2 className='text-center text-2xl font-bold' >Customer List</h2>
            <ul className='flex gap-5 items-center flex-wrap mt-10 p-2' >
                {
                    allCustomers.map((customer) => {
                        const date = new Date(customer.closeDate)

                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const formattedDate = `${day}-${month}-${year}`;

                        return (
                            <li className={`${customer.EMICount <= 120 ? "bg-blue-400" : "bg-red-300"} flex-1 min-w-[300px] rounded-md  border p-4`} key={customer._id}>
                                <div>
                                    <p className='text-lg font-medium text-black'> <span>Name : </span> {customer.name}</p>
                                    <p className='text-lg font-medium text-black'> <span>Close Date : </span> {formattedDate}</p>
                                    <p className='text-lg font-medium text-black'> <span>Pending Due : </span> {customer.pendingBalance}</p>
                                </div>
                                <Link className='inline-block mt-4  text-left bg-white hover:bg-blue-600 hover:text-white font-semibold text-lg rounded-md py-1 px-4' to={`/client/${customer._id}`}>Details</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home
