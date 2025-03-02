import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const CustomerProfileUpdate = () => {

    axios.defaults.withCredentials = true;
    const { backendUrl, singleCustomer, handleIsLogin } = useContext(AppContext);
    const [openDate, setOpenDate] = useState(new Date(singleCustomer.openDate).toISOString().split("T")[0])
    const [inputCustomer, setInputCustomer] = useState({
        name: '',
        phone: '',
        address: '',
        loanAmount: '',
        openDate: '',
    })
    const { id } = useParams();

    useEffect(() => {
        setInputCustomer({
            name: singleCustomer.name,
            phone: singleCustomer.phone,
            address: singleCustomer.address,
            loanAmount: singleCustomer.loanAmount,
            openDate: openDate,
        })
    }, [])


    const closeDate = new Date(inputCustomer.openDate)
    closeDate.setDate(closeDate.getDate() + 120)

    const handleInputChange = (e) => {
        setInputCustomer({ ...inputCustomer, [e.target.name]: e.target.value })
    }


    const handleEditProfile = async (e) => {
        e.preventDefault();

        const isLogin = await handleIsLogin();

        if (!isLogin) {
            return
        }

        try {

            const { data } = await axios.put(backendUrl + `/customer/update-customer-profile/${id}`, {
                name : inputCustomer.name,
                phone : inputCustomer.phone,
                address : inputCustomer.address,
                loanAmount : inputCustomer.loanAmount,
                openDate : inputCustomer.openDate,
                closeDate : closeDate
            })

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
        <div className='w-full md:1/2 border-r' >

            <form className="bg-blue-300 flex flex-col w-full gap-4 items-left mx-auto p-4 py-10 rounded-md" onSubmit={handleEditProfile}>

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

export default CustomerProfileUpdate
