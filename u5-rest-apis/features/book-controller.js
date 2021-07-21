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
      payload,
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

const readBook = async (req, res) => {
  try {
    // 1. Inputs
    const isbn13 = req.params.isbn13

    // 2. Query
    const query = db.collection('books').doc(isbn13).get()

    // 3. Response
    const snapshot = await query
    if (!snapshot.exists) return res.status(404).json({ result: 'not found' })

    const { title, authors, description, pages } = snapshot.data()
    const payload = { title, authors, description, pages }
    res.json({ result: 'ok', payload })
  } catch (err) {
    console.error(err)
    res.status(500).json({ result: 'error' })
  }
}

module.exports = {
  readBooks,
  readBook
}
