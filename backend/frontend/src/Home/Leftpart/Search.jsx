import React, { useState } from 'react'
import { FaSadCry, FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const Search = () => {

    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        const conversation = allUsers.find((user) => (
            user.fullname?.toLowerCase().includes(search.toLowerCase())
        ))
        if(conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    }

    return (
        <div className="h-[10vh]">
            <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-3">
                        <label className="input input-border border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%]">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="outline-none p-2 text-lg grow bg-slate-900 font-semibold" placeholder="Search" />
                        </label>
                        <button>
                            <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-2xl duration-300" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search
