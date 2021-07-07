const { findProducts } = require('../_services/fakedb')

const getProducts = (req, res) => {
  const productsName = req.query.q
  const productsPage = req.query.page || 1
  const products = findProducts(productsName)

  if (products) {
    res.send(`<html><body>
      </body><h1>Searching for: ${productsName}</h1>
      <h3>TODO: SEARCH RESULTS</h3>
      <h4>Page: ${productsPage}/100</h4>
      </html>`)
  } else {
    res.send(`<html><body>
    </body><h1>Invalid search term</h1>
    </html>`)
  }
}

module.exports = {
  getProducts
}
