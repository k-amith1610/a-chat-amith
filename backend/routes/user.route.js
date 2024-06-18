const express = require("express");
const router = express.Router();
const { signup, login, logout, allUsers } = require("../controller/user.controller");
const secureRoute = require("../middleware/secureRoute");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers)

module.exports = router;