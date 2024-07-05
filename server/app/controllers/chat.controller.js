const asyncHandler = require("express-async-handler");

const { chat } = require("../services/openai.service");

exports.sendMessage = asyncHandler(async (req, res) => {
    const { transactions, messages } = req.body;

    if (!transactions) return res.status(400).json({ error: true, message: "Transaction is required" });
    if (!Array.isArray(transactions)) return res.status(400).json({ error: true, message: "Transactions should be an array" });
    
    if (!messages) return res.status(400).json({ error: true, message: "Message history is required" });
    if (!Array.isArray(messages)) return res.status(400).json({ error: true, message: "Messages should be an array" });

    const newMessages = await chat(transactions, messages);
    // console.log(transactions)
    // const newMessages = [...messages, {role: "system", content: "dummy response"}]
    return res.status(200).json(newMessages)
});