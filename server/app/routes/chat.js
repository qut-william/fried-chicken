const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat.controller");

router.post("/", controller.sendMessage);

module.exports = router;