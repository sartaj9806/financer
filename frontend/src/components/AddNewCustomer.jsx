import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios';
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddNewCustomer = () => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const [inputCustomer, setInputCustomer] = useState({
        name: '',
        phone: '',
        address: '',
        loanAmount: '',
        openDate: '',
        accountNo: '',
    })

    const { backendUrl, handleIsLogin, allCustomers, setAllCustomers } = useContext(AppContext);

    useEffect(() => {
        handleIsLogin()
        console.log('Add new customer')
    }, [])




    const closeDate = new Date(inputCustomer.openDate)
    closeDate.setDate(closeDate.getDate() + 120)

    const handleInputChange = (e) => {
        setInputCustomer({ ...inputCustomer, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isLogin = await handleIsLogin()

        if (!isLogin) {
            return
        }

        const closeDate = new Date(inputCustomer.openDate)
        closeDate.setDate(closeDate.getDate() + 120)

        try {
            const { data } = await axios.post(backendUrl + '/customer/add-new-customer', {
                name: inputCustomer.name,
                phone: inputCustomer.phone,
                address: inputCustomer.address,
                loanAmount: inputCustomer.loanAmount,
                openDate: inputCustomer.openDate,
                closeDate: closeDate.toISOString().split('T')[0],
                accountNo: inputCustomer.accountNo,
            })

            if (data.success) {
                toast.success(data.message)
                setAllCustomers([...allCustomers, data.newCustomer])
                navigate('/')
            } else {
                console.log("called else conditon")
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }



    return (
        <div className='container mx-auto mt-24 ' >

            <form className="bg-blue-300 flex flex-col w-full md:w-2/3 gap-4 items-left mx-auto p-4 py-10 rounded-md mt-10" onSubmit={handleSubmit}>

                <h2 className='text-center text-2xl font-bold' >Add New Client</h2>

                <label className="flex flex-col gap-1 font-normal ">
                    Name
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-medium w-full placeholder:font-normal"
                        name="name"
                        onChange={handleInputChange}
                        type="text"
                        value={inputCustomer.name}
                        placeholder="Enter client name..."
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 font-normal">
                    Phone
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-medium w-full placeholder:font-normal"
                        name="phone"
                        onChange={handleInputChange}
                        type="text"
                        value={inputCustomer.phone}
                        placeholder="Enter client phone..."
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 font-normal">
                    Account No
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-medium w-full placeholder:font-normal"
                        name="accountNo"
                        onChange={handleInputChange}
                        type="text"
                        value={inputCustomer.accountNo}
                        placeholder="Enter client account no..."
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 font-normal">
                    Address
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-medium w-full placeholder:font-normal"
                        name="address"
                        onChange={handleInputChange}
                        type="text"
                        value={inputCustomer.address}
                        placeholder="Enter client address..."
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 font-normal">
                    Open Date
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-normal w-full"
                        name="openDate"
                        onChange={handleInputChange}
                        type="date"
                        value={inputCustomer.openDate}
                        required
                    />
                </label>

                <label className="flex flex-col gap-1 font-medium text-lg">
                    Loan Amount
                    <input
                        className="bg-white border border-black outline-none text-lg py-1 px-3 rounded-md font-medium w-full placeholder:font-normal"
                        name="loanAmount"
                        onChange={handleInputChange}
                        type="number"
                        value={inputCustomer.loanAmount}
                        placeholder="Enter client loan amount"
                        required
                    />
                </label>


                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mt-6 rounded cursor-pointer font-medium">
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddNewCustomer
