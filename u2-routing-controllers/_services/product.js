const products = {
  lenovo: {},
  asus: {}
}

const findProducts = (q) => {
  return products[q]
}

module.exports = {
  findProducts
}
