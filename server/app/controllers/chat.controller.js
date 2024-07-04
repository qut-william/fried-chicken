const asyncHandler = require("express-async-handler");

const { chat } = require("../services/openai.service");

exports.sendMessage = asyncHandler(async (req, res) => {
    const { messages } = req.body;

    if (!messages) return res.status(400).json({ error: true, message: "Message history is required" });
    if (!Array.isArray(messages)) return res.status(400).json({ error: true, message: "Make and Model must be an array" });

    const newMessages = await chat(messages);
    // const newMessages = [...messages, {role: "system", content: "dummy response"}]
    return res.status(200).json(newMessages)
});