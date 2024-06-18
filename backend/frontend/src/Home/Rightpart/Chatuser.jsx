import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { CiMenuFries } from 'react-icons/ci';

const Chatuser = () => {

  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline"
  }

  return (
    <>
      <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 duration-300">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex space-x-3 justify-center items-center h-[9vh] py-2 bg-gray-800">
          <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "online" : "offline"}`}>
            <div className="w-12 rounded-full">
              <img src="/assets/logo.avif" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-white to-green-500 text-transparent bg-clip-text">{selectedConversation ? selectedConversation.fullname : "K AMITH"}</h1>
            <span className={`text-sm ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "text-green-500" : "text-red-500"} font-semibold font-mono`}>{getOnlineUsersStatus(selectedConversation._id)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatuser
