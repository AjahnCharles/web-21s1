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
  const termsLower = terms // Ex: ['hello', 'world', 'potato']
    .toLowerCase()
    .split(' ')
    .map(term => term.trim())
    .filter(term => term.length > 0)

  // 2. Queries
  const query = (terms.length === 0)
    ? db.collection('books').orderBy('title').limit(3).get()
    : db.collection('books')
      .where('searchTerms', 'array-contains-any', termsLower)
      .get()

  // 3. Response
  const results = (await query).docs.map(doc => doc.data())
  res.render('book-search', { results, terms })
}

const bookCreateForm = async (req, res) => {
  // A real app should have an 'authors' collection
  // ...that the UI would query to autocomplete suggestions
  const authors = ['Bill Venners', 'Bruce Tate', 'Cay Horstmann', 'Dave Thomas', 'Francesco Cesarini', 'Fred Hebert', 'etc']

  // 3. Response
  res.render('book-create', { authors })
}

const bookCreate = async (req, res) => {
  // 1. Inputs
  const isbn13 = req.body.isbn13
  const title = req.body.title
  const description = req.body.description
  const pages = parseInt(req.body.pages) || 0
  const authorRaw = req.body.authorIds || []
  const authors = Array.isArray(authorRaw) ? authorRaw : [authorRaw]

  const book = { isbn13, title, description, pages, authors }

  // 2. Queries
  const query = db.collection('books')
    .doc(isbn13)
    .set(book, { merge: true })

  // 3. Response
  await query
  res.redirect(`/books/${isbn13}`)
}

module.exports = {
  bookDetails,
  bookSearch,
  bookCreateForm,
  bookCreate
}
