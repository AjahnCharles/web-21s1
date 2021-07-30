const { db } = require('../_services/firebase-admin-initialized')

const filmList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('films').get()

  // 3. Response
  const films = (await query)
    .docs
    .map(doc => doc.data())
    .map(({ slug, title }) => ({ slug, title }))

  res.render('film-list', { films })
}

module.exports = {
  filmList
}
