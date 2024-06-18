const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://a-chat-amith.onrender.com",
        methods: ["GET", "POST"],
    }
});

// realtime message code goes here
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {}

// used to listen events on server side
io.on("connection", (socket) => {
    console.log("A User Connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log(users);
    }
    //used to send the events to all connected clients
    io.emit("getOnlineUsers", Object.keys(users));


    //used to listen client side events on server side
    socket.on("disconnect", () => {
        console.log("A User Disconnected", socket.id);
        delete users[userId]
        io.emit("getOnlineUsers", Object.keys(users));
    })
});

module.exports = { app, io, server, getReceiverSocketId };