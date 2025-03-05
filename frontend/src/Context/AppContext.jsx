import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [allCustomers, setAllCustomers] = useState([])
    const [singleCustomer, setSingleCustomer] = useState({});

    const navigate = useNavigate();

    const getAllCustomer = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/customer/get-all-customer');
            if (data.success) {

                const sortedCustomer = data.allCustomers;

                sortedCustomer.sort((a, b) => a.name.localeCompare(b.name))

                setAllCustomers(sortedCustomer)
            } else {
                if (data.message === 'Not Authorized. Login Again') {
                    toast.error(data.message)
                    setAllCustomers([])
                    navigate('/login')
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getSingleCustomer = async (id) => {
        try {
            const { data } = await axios.get(backendUrl + `/customer/get-single-customer/${id}`)
            if (data.success) {
                setSingleCustomer(data.singleCustomer)
            } else {
                if (data.message === 'Not Authorized. Login Again') {
                    toast.error(data.message)
                    navigate('/login')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleIsLogin = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/customer/is-customer-login')

            if (data.success) {
                return true;
            } else {
                if (data.message === 'Not Authorized. Login Again') {
                    toast.error(data.message)
                    navigate('/login')
                    return false;
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        backendUrl,
        allCustomers, setAllCustomers,
        getSingleCustomer,
        singleCustomer, setSingleCustomer,
        getAllCustomer,
        handleIsLogin,
    }





    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}