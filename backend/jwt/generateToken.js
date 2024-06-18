const jwt = require("jsonwebtoken");

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "10d"
    });
    res.cookie("jwt", token, {
        httpOnly: true, // protect from xss attack
        secure: true,
        sameSite: "strict", // protect from csrf attack
    })
}

module.exports = createTokenAndSaveCookie
