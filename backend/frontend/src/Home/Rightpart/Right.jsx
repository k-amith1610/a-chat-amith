import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation'
import { useAuth } from '../../context/AuthProvider'
import { CiMenuFries } from "react-icons/ci";

const Right = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation])

  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (<NoChatSelected />) : (
          <>
            <Chatuser />
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(91vh - 9vh)" }}>
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  )
}

export default Right


const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-2xl" />
        </label>
        <div className="h-screen flex justify-center items-center px-3">
          <h1 className="text-center">Welcome <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-white to-green-500 text-transparent bg-clip-text">{authUser.user.fullname}</span>
            <br />
            No chat selected, please start conversation by selecting anyone.
          </h1>
        </div>
      </div>
    </>
  )
}