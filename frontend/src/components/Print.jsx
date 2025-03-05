import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'

const Print = () => {

    const { allCustomers, getAllCustomer } = useContext(AppContext)

    useEffect(() => {
        getAllCustomer();
        console.log("Print")
    }, [])

    
    const totalAmount = allCustomers.reduce((acc, cur) => acc + cur.EMIAmount, 0)

    return (
        <div className='container mx-auto mt-8' >
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='border px-0.5'>S.No</th>
                        <th className='border'>Name</th>
                        <th className='border'>EMI</th>
                        <th className='border px-0.5'>Amount</th>
                        <th className='border px-0.5'>AC.No</th>
                        <th className='border'>O-Date</th>
                        <th className='border'>C-Date</th>
                        <th className='border px-0.5'>Pending</th>
                        <th className='border px-0.5'>Balance</th>

                    </tr>
                </thead>
                <tbody>

                    {allCustomers.map((customer, index) => {

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



                        return (
                            <tr key={customer._id}>
                                <td className='border py-1 px-2 text-center w-8'>{index + 1}</td>
                                <td className='border py-1 px-2 '>{customer.name}</td>
                                <td className='border py-1 text-center w-10'>{customer.EMIAmount}</td>
                                <td className='border py-1 px-2 text-center w-20'></td>
                                <td className='border py-1 text-center w-10'>{customer.accountNo}</td>
                                <td className='border py-1  text-center w-20'>{openformattedDate}</td>
                                <td className='border py-1  text-center w-20'>{closeformattedDate}</td>
                                <td className='border py-1 px-2 text-center w-14'>{customer.pendingBalance}</td>
                                <td className='border py-1 px-2 text-center w-14'>{customer.balance}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td className=' py-1 px-2 text-center w-8'></td>
                        <td className=' py-1 px-2 '></td>
                        <td className=' py-1 text-center w-10 font-medium'>{totalAmount}</td>
                        <td className=' py-1 px-2 text-center w-20'></td>
                        <td className=' py-1 text-center w-10'></td>
                        <td className=' py-1  text-center w-20'></td>
                        <td className=' py-1  text-center w-20'></td>
                        <td className=' py-1 px-2 text-center w-14'></td>
                        <td className=' py-1 px-2 text-center w-14'></td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default Print
