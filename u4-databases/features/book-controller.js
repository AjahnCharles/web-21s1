const { db } = require('../_services/firebase-initialized')

const bookDetails = async (req, res) => {
  // 1. Inputs
  const isbn13 = req.params.isbn13

  // 2. Queries
  const query = db.collection('books')
    .doc(isbn13)
    .get()

  // 3. Response
  const book = (await query).data()
  res.render('book-details', { book })
}

module.exports = {
  bookDetails
}
