const { io, getReceiverSocketId } = require("../SocketIO/server");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId); // Get sender's socket ID as well

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage); // Emit to sender as well
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // current logged-in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessage };
