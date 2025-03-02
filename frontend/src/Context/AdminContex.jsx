import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const AdminContext = createContext();

export const AdminContextProvider = (props) => {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const isLoginAdmin = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/admin/is-Login')

            if (data.success) {
                return true;
            } else {
                if (data.message === 'Not Authorized. Login Again') {
                    toast.error(data.message)
                    navigate('/admin/login')
                    return false;
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message + 'error')
        }
    }


    const value = {
        backendUrl,
        isLoginAdmin
    }



    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}