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
      .map(({ isbn13, title, authors, pages }) => ({ isbn13, title, authors, pages }))

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
