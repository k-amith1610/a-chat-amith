const express = require("express");
const router = express.Router();
const { sendMessage, getMessage } = require("../controller/message.controller")
const secureRoute = require("../middleware/secureRoute");

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

module.exports = router;