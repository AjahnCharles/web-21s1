const { db } = require('../_services/firebase-admin-initialized')

const readBooks = async (req, res) => {
  try {
    // 1. Inputs
    // none

    // 2. Query
    const query = db.collection('books').get()

    // 3. Response
    const payload = (await query)
      .docs
      .map(doc => doc.data())
      .map(data => ({
        isbn13: data.isbn13,
        title: data.title,
        authors: data.authors,
        pages: data.pages
      }))

    res.json({
      result: 'ok',
      payload: payload,
      count: payload.length
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      result: 'error',
      payload: [],
      count: 0
    })
  }
}

module.exports = {
  readBooks
}
