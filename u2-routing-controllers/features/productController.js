const { findProducts } = require('../_services/product')

const getproduct = (req, res) => {
  const productsName = req.query.q
  const products = findProducts(productsName)
  const productsPage = req.query.page || 1

  if (products) {
    res.send(`
    <html>
      <body>
        <h1>Searching for: ${productsName}</h1>
        <P>
          TODO: SEARCH RESULTS
          Page: ${productsPage}/100
        </p>  
      </body>
    </html>`)
  } else res.send('Invalid search term')
}

module.exports = {
  getproduct
}
