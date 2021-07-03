const logger =
  (req, _res, next) => {
    // Ignore requests for service-worker
    if (req.url === '/service-worker.js') return next()

    // Log to console
    console.log(`${new Date().toISOString()} [${req.method}] ${req.url} ${JSON.stringify(req.body)}`)

    // Hand-over to next middleware/controller
    return next()
  }

module.exports = {
  logger
}
