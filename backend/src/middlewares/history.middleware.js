const historyHandler = (req, res, next) => {

    const { originalUrl, method, body, query, params } = req

    if (req.body) {
        console.log(req.body);
    }

    const historyEntry = {
        timestamp: new Date().toISOString(),
        method,
        originalUrl,
        body: body && Object.keys(body).length ? body : undefined,
        params: params && Object.keys(params).length ? params : undefined
    }

    console.log(historyEntry);

    next()
}

module.exports = historyHandler 