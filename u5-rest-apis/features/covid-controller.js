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
  /************************************/
  /* Version 1: Blindly update latest */
  /************************************/
  try {
    // 1. Inputs
    const { stateId, date: dateMillis, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent } = req.body
    const date = firestore.Timestamp.fromMillis(dateMillis)

    // 2. Query
    const latestUpdate = { stateId, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
    const query = db.collection('covid-latest').doc(stateId).set(latestUpdate, { merge: true })

    // 3. Response
    await query
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }

  /*************************************/
  /* Version 2: Validate & update both */
  /*************************************/
  // try {
  //   // 1. Inputs
  //   const { stateId, date: dateMillis, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent } = req.body
  //   const date = firestore.Timestamp.fromMillis(dateMillis)

  //   // 2. Query AND 3. Response
  //   await db.runTransaction(async t => {
  //     // Read data from covid-latest & covid-history (in parallel)
  //     const [latestSnapshot, historySnapshot] = await Promise.all([
  //       t.get(db.collection('covid-latest').doc(stateId)),
  //       t.get(db.collection('covid-history').doc(stateId))
  //     ])

  //     // Reject if US State data doesn't exist already
  //     if (!latestSnapshot.exists || !historySnapshot.exists) return res.sendStatus(404)
  //     const stateName = latestSnapshot.data().stateName
  //     if (!stateName) return res.sendStatus(404)

  //     // Optional: Reject if data already exists for this data
  //     // ...I prefer to just update, so that the API is "idempotent"
  //     const history = historySnapshot.data().history
  //     const oldHistoryEntryIndex = history.findIndex(entry => date.seconds === entry.date.seconds)
  //     // if (data.seconds === latestSnapshot.data().date.seconds || oldHistoryEntryIndex >= 0) return res.sendStatus(409)

  //     // Replace latest (if request data is newer OR equal)
  //     const latestUpdate = { stateId, stateName, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
  //     if (latestSnapshot.data().date.seconds <= date.seconds) t.set(db.collection('covid-latest').doc(stateId), latestUpdate)

  //     // Update history (always)
  //     if (oldHistoryEntryIndex >= 0) {
  //       // Update existing entry
  //       const oldHistoryEntry = history[oldHistoryEntryIndex]
  //       const newHistoryEntry = { ...oldHistoryEntry, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
  //       history[oldHistoryEntryIndex] = newHistoryEntry // update existing entry
  //       const historyUpdate = { history } // replace entire history array
  //       t.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })
  //       res.sendStatus(200)
  //     } else {
  //       // Add new entry
  //       const historyEntry = { date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
  //       const historyUpdate = { history: firestore.FieldValue.arrayUnion(historyEntry) } // add item to array
  //       t.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })
  //       res.sendStatus(201)
  //     }
  //   })
  // } catch (err) {
  //   console.error(err)
  //   res.sendStatus(500)
  // }
}

const updateCovidRecord = async (req, res) => {
  /************************************/
  /* Version 1: Blindly update latest */
  /************************************/
  try {
    // 1. Inputs
    const stateId = req.params.stateId.toUpperCase()
    const { date: dateMillis, cases, casesNew } = req.body
    const latestUpdate = { date: firestore.Timestamp.fromMillis(dateMillis), cases, casesNew }

    // 2. Query
    const query = db.collection('covid-latest').doc(stateId).set(latestUpdate, { merge: true })

    // 3. Response
    await query
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }

  /*************************************/
  /* Version 2: Validate & update both */
  /*************************************/
  // try {
  //   // 1. Inputs
  //   const stateId = req.params.stateId.toUpperCase()
  //   const { date: dateMillis, cases, casesNew } = req.body
  //   const date = firestore.Timestamp.fromMillis(dateMillis)

  //   // 2. Query AND 3. Response
  //   await db.runTransaction(async t => {
  //     // Read data from covid-latest & covid-history
  //     const [latestSnapshot, historySnapshot] = await Promise.all([
  //       t.get(db.collection('covid-latest').doc(stateId)),
  //       t.get(db.collection('covid-history').doc(stateId))
  //     ])

  //     // Reject if US State data doesn't exist already
  //     if (!latestSnapshot.exists || !historySnapshot.exists) return res.sendStatus(404)

  //     // Reject if date is newer than latest or doesn't exist in history (ie. this isn't an update)
  //     const history = historySnapshot.data().history
  //     const oldHistoryEntryIndex = history.findIndex(entry => date.seconds === entry.date.seconds)
  //     if (date.seconds > latestSnapshot.data().date.seconds || oldHistoryEntryIndex < 0) return res.sendStatus(404)

  //     // Update latest (if request date equals latest date)
  //     const latestUpdate = { date, cases, casesNew }
  //     if (date.seconds === latestSnapshot.data().date.seconds) t.set(db.collection('covid-latest').doc(stateId), latestUpdate, { merge: true })

  //     // Update history (always)
  //     const oldHistoryEntry = history[oldHistoryEntryIndex]
  //     const newHistoryEntry = { ...oldHistoryEntry, date, cases, casesNew }
  //     history[oldHistoryEntryIndex] = newHistoryEntry // update existing entry
  //     const historyUpdate = { history } // replace entire history array
  //     t.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })

  //     res.sendStatus(200)
  //   })
  // } catch (err) {
  //   console.error(err)
  //   res.sendStatus(500)
  // }
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
