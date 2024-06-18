import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Logout = () => {

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/user/logout");
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt");
            setLoading(false);
            toast.success("Logout successfull!!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }

    }

    return (
        <div className="h-[10vh]">
            <hr />
            <div>
                <BiLogOutCircle onClick={handleLogout} className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 m-3" />
            </div>
        </div>
    )
}

export default Logout
