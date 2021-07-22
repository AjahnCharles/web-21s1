const { db } = require('../_services/firebase-admin-initialized')

const readCovidRecords = async (req, res) => {
  try {
    // 1. Inputs
    // none

    // 2. Query
    const query = db.collection('covid-latest').get()

    // 3. Response
    const payload = (await query)
      .docs
      .map(doc => doc.data())
      .map(({ date, stateId, stateName, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }) =>
        ({ date: date.toMillis(), stateId, stateName, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }))
    res.json({ result: 'ok', payload, count: payload.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ result: 'error', payload: [], count: 0 })
  }
}

const readCovidRecord = async (req, res) => {
  try {
    // 1. Inputs
    const stateId = req.params.stateId.toUpperCase()

    // 2. Query
    const query = db.collection('covid-history').doc(stateId).get()

    // 3. Response
    const snapshot = await query
    if (!snapshot.exists) return res.status(404).json({ result: 'not found' })

    const data = snapshot.data()
    const history = data.history.map(({ date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }) => ({ date: date.toMillis(), cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }))
    const payload = { stateId, stateName: data.stateName, history }
    res.json({ result: 'ok', payload })
  } catch (err) {
    console.error(err)
    res.status(500).json({ result: 'error' })
  }
}

module.exports = {
  readCovidRecords,
  readCovidRecord
}
