const { db } = require('../_services/firebase-initialized')

const iterationList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('iterations').get()

  // 3. Response
  const iterations = (await query).docs.map(doc => doc.data())
  res.render('uni-iteration-list', { iterations })
}

const iterationDetails = async (req, res) => {
  // 1. Inputs
  const iterationCode = req.params.code

  // 2. Query
  const query = db.collection('iterations').doc(iterationCode).get()

  // 3. Response
  const iteration = (await query).data()
  res.render('uni-iteration-details', { iteration })
}

module.exports = {
  iterationList,
  iterationDetails
}
