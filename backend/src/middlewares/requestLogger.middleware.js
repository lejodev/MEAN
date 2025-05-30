const logger = async (req, res, next) => {
    console.log(`Endpoint: ${req.originalUrl}, method: ${req.method}, date: ${new Date().toISOString()}`);
    next()
}

module.exports = logger