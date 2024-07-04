module.exports = (err, req, res, next) => {
    const status = err.status || err.response?.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`Error: ${status} - ${message}`);

    return res.status(status).json({
        error: true,
        message: message,
    });
};