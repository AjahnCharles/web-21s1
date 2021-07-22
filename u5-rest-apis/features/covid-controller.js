const { db } = require('../_services/firebase-admin-initialized')
const { firestore } = require('firebase-admin')

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

const createCovidRecord = async (req, res) => {
  try {
    /*********************************/
    /* Version 1: Only update latest */
    /*********************************/

    // // 1. Inputs
    // const { stateId, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent } = req.body
    // const record = { stateId, date: firestore.Timestamp.fromMillis(date), cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }

    // // 2. Query
    // const query = db.collection('covid-latest').doc(stateId).set(record, { merge: true })

    // // 3. Response
    // await query
    // res.sendStatus(201)

    /**********************************/
    /* Version 2: Also update history */
    /**********************************/

    // 1. Inputs
    const { stateId, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent } = req.body
    const record = { stateId, date: firestore.Timestamp.fromMillis(date), cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
    const historyEntry = { date: firestore.Timestamp.fromMillis(date), cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
    const historyUpdate = { history: firestore.FieldValue.arrayUnion(historyEntry) }

    // 2. Query
    const batch = db.batch()
    batch.set(db.collection('covid-latest').doc(stateId), record, { merge: true })
    batch.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })

    // 3. Response
    await batch.commit()
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const updateCovidRecord = async (req, res) => {
  try {
    /*********************************/
    /* Version 1: Only update latest */
    /*********************************/

    // 1. Inputs
    const stateId = req.params.stateId.toUpperCase()
    const { date, cases, casesNew } = req.body
    const record = { date: firestore.Timestamp.fromMillis(date), cases, casesNew }

    // 2. Query
    const query = db.collection('covid-latest').doc(stateId).set(record, { merge: true })

    // 3. Response
    await query
    res.sendStatus(200)

    /**********************************/
    /* Version 2: Also update history */
    /**********************************/

    // TODO: We need to use a transaction:
    // - Read the current data
    // - Remove existing history data for that day
    // - Add the new history data
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

const deleteCovidRecord = async (req, res) => {
  res.sendStatus(403)
}

module.exports = {
  readCovidRecords,
  readCovidRecord,
  createCovidRecord,
  updateCovidRecord,
  deleteCovidRecord
}
