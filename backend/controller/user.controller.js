const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const createTokenAndSaveCookie = require("../jwt/generateToken");

const signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });

        await newUser.save();
        if (newUser) {

            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User Created Successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }

        // console.log(user);
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Email or Password" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User Logged out Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { signup, login, logout, allUsers };
