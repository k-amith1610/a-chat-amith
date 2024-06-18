import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage'
import Loading from "../../components/Loading";
import useGetSocketMessage from '../../context/useGetSocketMessage';

const Messages = () => {

    const { loading, messages } = useGetMessage();
    useGetSocketMessage() // listening incomming messages
    // console.log(messages);
    const lastMsgRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100)
    }, [messages])


    return (
        <div className="" style={{ minHeight: "calc(91vh - 9vh)" }}>
            {loading ? (<Loading />) : (messages.length > 0 && messages.map((message, index) => {
                return (
                    <div key={message._id || index} ref={lastMsgRef}>
                        <Message message={message} />
                    </div>
                )
            }))}
            {!loading && messages.length === 0 && (
                <div>
                    <p className="text-center mt-[20%]">Say! Hi to Start the conversation</p>
                </div>
            )}
        </div>
    )
}

export default Messages
