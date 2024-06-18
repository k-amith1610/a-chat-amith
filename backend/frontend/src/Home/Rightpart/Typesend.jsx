import React, { useState } from 'react'
import { IoSend } from "react-icons/io5"
import useSendMessage from '../../context/useSendMessage'
const Typesend = () => {

    const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; 
        await sendMessages(message);
        setMessage("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[9vh] items-center bg-gray-800">
                <div className="w-[85%] px-3">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here" className="border border-gray-700 rounded-lg outline-none px-4 py-3 w-full" />
                </div>
                <button>
                    <IoSend className="text-3xl" />
                </button>
            </div>
        </form>
    )
}

export default Typesend
