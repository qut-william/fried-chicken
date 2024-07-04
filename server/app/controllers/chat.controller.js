const asyncHandler = require("express-async-handler");

const { getCarDetails } = require("../services/openai.service");

exports.get = asyncHandler(async (req, res) => {
    const { search } = req.query;
    if (!make || !model) return res.status(400).json({ error: true, message: "Make and Model are required" });

    const carDetails = await getCarDetails(make, model);
    return res.status(200).json(carDetails);
});