const mongoose = require("mongoose");
const User = require("./user.model");
const Message = require("./message.model");

const conversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation; 