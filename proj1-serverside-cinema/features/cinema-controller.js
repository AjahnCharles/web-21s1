const { db } = require('../_services/firebase-admin-initialized')

const cinemaList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('cinemas')
    .orderBy('city')
    .orderBy('name')
    .get()

  // 3. Response
  const cinemas = (await query)
    .docs
    .map(doc => doc.data())

  res.render('cinema-list', { cinemas })
}

module.exports = {
  cinemaList
}
