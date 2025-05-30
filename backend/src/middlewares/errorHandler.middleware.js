const errorHandler = (err, req, res, next) => {
    console.error(`Error in endpoint ${req.originalUrl}, Method: ${req.method}, Date: ${new Date().toISOString()}`)
    res.status(err.status || 500).json({ message: err.message || "Server error" })
}

module.exports = errorHandler