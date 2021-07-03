const { findProducts } = require('../_services/fakedb')

const getProduct = (req, res) => {
  const productsName = req.query.q
  const products = findProducts(productsName)
  const productsPage = req.query.page || 1

  if (products) {
    res.send(`<html><body>
    </body><h1>Searching for: ${productsName}</h1>
    TODO: SEARCH RESULTS <br><br>
    Page: ${productsPage}/100
    </body></html>`)
  } else res.send('<h1>Invalid search term</h1>')
}

module.exports = {
  getProduct
}
