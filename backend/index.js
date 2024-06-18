const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { app, server } = require("./SocketIO/server");
dotenv.config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

//---------code for deployment--------------
if(process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();


    app.use(express.static("./frontend/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"));
    })
}

const start = async () => {
    try {
        await connectDB(uri);
        server.listen(PORT, () => {
            console.log(`running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();