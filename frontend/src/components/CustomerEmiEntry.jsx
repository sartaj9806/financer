import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';

const CustomerEmiEntry = () => {
    const [inputValues, setInputValues] = useState({});

    axios.defaults.withCredentials = true;

    const { backendUrl, allCustomers, getAllCustomer, handleIsLogin } = useContext(AppContext);

    useEffect(() => {
        getAllCustomer();
        console.log('Customer Emi Entry')
    }, [])


    const handleInputChange = (customerId, value) => {
        setInputValues(({ ...inputValues, [customerId]: value, }));
    };

    const createEmiArray = async (e) => {
        e.preventDefault();

        const isLogin = await handleIsLogin();

        if (!isLogin) {
            return
        }

        const allCustomersEmiArray = allCustomers.map(customer => ({
            customerId: customer._id,
            EMIReceived: parseFloat(inputValues[customer._id]) || 0,
        }))

        try {

            const { data } = await axios.put(backendUrl + `/customer/add-all-customer-emi`, allCustomersEmiArray)

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }


    }

    return (
        <div className='container mx-auto mt-24'>

            <form className='overflow-x-scroll' onSubmit={createEmiArray}>
                <table>
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
                                    <td className='border py-1 px-2 text-center'>{index + 1}</td>
                                    <td className='border py-1 px-2'>{customer.name}</td>
                                    <td className='border py-1 text-center w-10'>{customer.EMIAmount}</td>
                                    <td className='border px-2'>
                                        <input
                                            className='h-fit w-16 outline-none'
                                            required
                                            type="number"
                                            placeholder='EMI'
                                            value={inputValues[customer._id] || ''}
                                            onChange={(e) => handleInputChange(customer._id, e.target.value)}
                                        />
                                    </td>
                                    <td className='border py-1 text-center w-10'>{customer.accountNo}</td>
                                    <td className='border py-1 text-center w-20'>{openformattedDate}</td>
                                    <td className='border py-1 text-center w-20'>{closeformattedDate}</td>
                                    <td className='border py-1 px-2 text-center'>{customer.pendingBalance}</td>
                                    <td className='border py-1 px-2 text-center'>{customer.balance}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" type='submit'>Add Emi</button>
            </form>


        </div>
    );
};

export default CustomerEmiEntry;