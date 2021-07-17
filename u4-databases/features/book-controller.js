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

const bookSearch = async (req, res) => {
  // 1. Inputs
  const terms = req.query.terms || '' // Ex: 'HELLO WORLD POTATO'
  const termsLower = terms.toLowerCase() // Ex: ['hello', 'world', 'potato']
    .toLowerCase()
    .split(' ')
    .map(term => term.trim())
    .filter(term => term.length > 0)

  // 2. Queries
  const query = (terms.length === 0)
    ? db.collection('books').orderBy('title').limit(3).get()
    : db.collection('books')
      .where('searchTerms', 'array-contains-any', termsLower)
      .orderBy('title')
      .get()

  // 3. Response
  const results = (await query).docs.map(doc => doc.data())
  res.render('book-search', { results, terms })
}

module.exports = {
  bookDetails,
  bookSearch
}
