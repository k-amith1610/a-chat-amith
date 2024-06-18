import React from 'react'
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import toast from "react-hot-toast";

const Signup = () => {


    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    //watch the password and confirm password fields
    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    const validatePasswordMatch = (value) => {
        return value === password || "*Passwords do not match";
    }

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            const response = await axios.post("/api/user/signup", userInfo);
            if (response.data) {
                reset();
                toast.success("Signup Successful");
                localStorage.setItem("ChatApp", JSON.stringify(response.data));
                setAuthUser(response.data);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            }
        }
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center bg-slate-900 text-white text-sm md:text-[16px]">
                <form onSubmit={handleSubmit(onSubmit)} className="border border-white rounded-3xl px-6 py-6 w-80 md:w-96 flex flex-col justify-between space-y-6 shadow-lg shadow-green-500">
                    <div className="flex justify-between items-center">
                        <img src="/assets/logo.avif" className="w-12 rounded-full border border-x-4 border-y-4 border-red-500" alt="logo" />
                        <h1 className="text-3xl mx-auto bg-black px-3 py-2 rounded-xl"><span className="font-semibold bg-gradient-to-r from-red-500 via-blue-500 to-red-500 text-transparent bg-clip-text">A-Chat</span></h1>
                    </div>
                    <h2 className="font-semibold px-2 py-2 text-2xl text-start font-mono bg-gradient-to-r from-blue-500 via-red-500 to-red-500 text-transparent bg-clip-text">Signup</h2>
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <FaUser className="absolute ml-3" />
                            <input {...register("fullname", { required: true })} type="text" className="grow border px-9 py-3 rounded-lg" placeholder="Username" />
                        </label>
                        {errors.fullname && <span className="text-red-500 text-[12px] font-semibold">*Name is required</span>}
                        <label className="flex items-center gap-2">
                            <IoMdMail className="absolute ml-3 text-lg" />
                            <input {...register("email", { required: true })} type="email" className="grow border px-9 py-3 rounded-lg" placeholder="Email" />
                        </label>
                        {errors.email && <span className="text-red-500 text-[12px] font-semibold">*Email is required</span>}
                        <label className="flex items-center gap-2">
                            <FaKey className="absolute ml-3 text-sm" />
                            <input {...register("password", { required: true })} type="password" className="grow border px-9 py-3 rounded-lg" placeholder="Password" />
                        </label>
                        {errors.password && <span className="text-red-500 text-[12px] font-semibold">*Password is required</span>}
                        <label className="flex items-center gap-2">
                            <FaKey className="absolute ml-3 text-sm" />
                            <input {...register("confirmPassword", { required: true, validate: validatePasswordMatch })} type="password" className="grow border px-9 py-3 rounded-lg" placeholder="Confirm Password" />
                        </label>
                        {errors.confirmPassword && <span className="text-red-500 text-[12px] font-semibold">{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="justify-between space-y-5">
                        <input type="submit" value="Signup" className="bg-gradient-to-r from-blue-500 to-red-500 px-3 py-2 rounded-lg cursor-pointer  shadow-lg shadow-slate-600 hover:shadow-green-500" />
                        <p className="self-center">Have account in <span className="bg-black rounded-md px-2"><span className="font-mono font-bold  md:text-lg bg-gradient-to-r from-red-500 via-blue-500 to-red-500 text-transparent bg-clip-text">A-Chat?</span></span><Link to="/login" className="text-blue-500 shadow-lg">{" "}Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
