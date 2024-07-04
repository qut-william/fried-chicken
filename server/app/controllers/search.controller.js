const asyncHandler = require("express-async-handler");

const { getSearchResults } = require("../services/openai.service");

exports.get = asyncHandler(async (req, res) => {
    const { q } = req.query;
    if (q) return res.status(400).json({ error: true, message: "Search query is required" });

    const searchResults = await getSearchResults(q);
    return res.status(200).json(searchResults);
});