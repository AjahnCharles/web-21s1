const productSearch = (req, res) => {
  // Inputs (query string)
  const searchTerm = req.query.q
  const page = req.query.page || 1

  // Validate search term
  if (!searchTerm) return res.status(404).send('<html><body><h1>Invalid search term</h1></body></html>')

  // Send response
  res.send(`<html><body>
    <h1>Searching for: ${searchTerm}</h1>
    <p>TODO: SEARCH RESULTS</p>
    <p>Page: ${page} / 100</p>
  </body></html>`)
}

module.exports = {
  productSearch
}
