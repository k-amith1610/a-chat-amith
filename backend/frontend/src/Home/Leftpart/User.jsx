import React from 'react'
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from '../../context/SocketContext';

const User = ({ user }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;

    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <div className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-gray-400 text-black" : ""}`} onClick={() => setSelectedConversation(user)}>
            <div className="flex space-x-4 px-6 py-3 hover:bg-slate-500 hover:text-black cursor-pointer">
                <div className={`avatar ${isOnline? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="/assets/logo.avif" />
                    </div>
                </div>
                <div>
                    <h1 className="font-bold">{user.fullname}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
