import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'

const Print = () => {

    const { allCustomers, getAllCustomer } = useContext(AppContext)
    const [noDefaultCustomer, setNoDefaultCustomer] = useState([])

    useEffect(() => {
        getAllCustomer();

        console.log("Print")
    }, [])

    useEffect(() => {
        const filterCustomer = allCustomers.filter((item) => item.isDefaulter !== true)
        setNoDefaultCustomer(filterCustomer)
    }, [allCustomers])

    const totalAmount = noDefaultCustomer.reduce((acc, cur) => acc + cur.EMIAmount, 0)

    return (
        <div className='container mx-auto mt-8' >
            <table className='w-full border-collapse'>
                <thead className='print-header'>
                    <tr>
                        <th className='border px-0.5'>N</th>
                        <th className='border'>Name</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border'>EMI</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border px-0.5'>AC</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border'>O-Date</th>
                        <th className='border'>C-Date</th>
                        <th className='border px-0.5'>Pending</th>
                        <th className='border px-0.5'>Balance</th>

                    </tr>
                </thead>
                <tbody>

                    {noDefaultCustomer.map((customer, index) => {

                        const opendate = new Date(customer.openDate);
                        const openformattedDate = opendate.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                        }).replaceAll('/', '-');

                        const closedate = new Date(customer.closeDate);
                        const closeformattedDate = closedate.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                        }).replaceAll('/', '-');

                        

                        console.log("Customer Print:", customer)

                        return (
                            <tr className={`${customer.EMICount > 120 && 'font-bold bg-gray-200'}`} key={customer._id}>
                                <td className='border py-1 px-1 text-center w-8'>{index + 1}</td>
                                <td className='border py-1 px-1 '>{customer.name}</td>
                                <td className='border text-center w-14 '></td>
                                <td className='border py-1 text-center w-10'>{customer.EMIAmount}</td>
                                <td className='border text-center w-14 '></td>
                                <td className='border py-1 text-center w-10'>{customer.accountNo}</td>
                                <td className='border text-center w-14 '></td>
                                <td className='border py-1  text-center w-20'>{openformattedDate}</td>
                                <td className='border py-1  text-center w-20'>{closeformattedDate}</td>
                                <td className='border py-1 px-1 text-center w-14'>{customer.pendingBalance}</td>
                                <td className='border py-1 px-1 text-center w-14'>{customer.balance}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>

            <div className='text-center mt-4 font-medium'>
                ₹{totalAmount}
            </div>

        </div>
    )
}

export default Print
