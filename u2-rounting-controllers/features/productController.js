
const { findproducts } = require('../_services/fakedb')

const getProduct = (req, res) => {
  const productName = req.query.q
  const products = findproducts(productName)
  const productPage = req.query.page || 1

  if (products) {
    res.send(`<html><body>
    </body><h1>Searching for: ${productName}</h1>
    TODO: SEARCH RESULTS <br>
    Page: ${productPage}/100
    </body></html>`)
  } else res.send('<FONT SIZE=50>Invalid search trem</FONT>')
}

module.exports = {
  getProduct
}
