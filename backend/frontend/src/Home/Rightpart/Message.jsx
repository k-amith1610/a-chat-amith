import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Message = ({ message }) => {
    const [authUser] = useAuth();
    const itsMe = message.senderId === authUser.user._id;

    const chatName = itsMe ? "chat-end" : "chat-start";
    const chatColor = itsMe ? "bg-blue-500" : "";

    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
    return (
        <div>
            <div className="p-4">
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
                    <div className="chat-footer">{formattedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
