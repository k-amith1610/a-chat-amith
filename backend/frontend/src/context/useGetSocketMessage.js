import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation';
import sound from "../../../frontend/public/assets/a-chat-notification.wav";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();

    useEffect(() => {

        socket.on('newMessage', (newMessage) => {
            const notification = new Audio(sound);
            notification.play()
            setMessage([...messages, newMessage]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
