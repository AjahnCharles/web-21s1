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
    const latestUpdate = { stateId, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }

    // 2. Query
    const query = db.collection('covid-latest').doc(stateId).set(latestUpdate, { merge: true })

    // 3. Response
    await query
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }

  /**********************************/
  /* Version 2: Check & update both */
  /**********************************/
  // try {
  //   // 1. Inputs
  //   const { stateId, date: dateMillis, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent } = req.body
  //   const date = firestore.Timestamp.fromMillis(dateMillis)

  //   // 2. Query
  //   const query = db.runTransaction(async t => {
  //     // Read data from covid-latest & covid-history
  //     const [latestSnapshot, historySnapshot] = await Promise.all([
  //       t.get(db.collection('covid-latest').doc(stateId)),
  //       t.get(db.collection('covid-history').doc(stateId))
  //     ])

  //     // Our NoSQL design requires the docs to exist already (stateId/stateName must be defined)
  //     if (!latestSnapshot.exists || !historySnapshot.exists) return res.sendStatus(404)

  //     // Reject if this data already exists
  //     const oldHistoryEntry = historySnapshot.data().history.find(oldHistoryEntry => oldHistoryEntry.date.seconds === date.seconds)
  //     if (oldHistoryEntry) return res.sendStatus(409)

  //     // Only update latest if request data is newer
  //     const latestUpdate = { stateId, date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
  //     if (latestSnapshot.data().date.seconds < date.seconds) t.set(db.collection('covid-latest').doc(stateId), latestUpdate, { merge: true })

  //     // Always update history (add new entry)
  //     const historyEntry = { date, cases, casesNew, vaccineOne, vaccineOnePercent, vaccineComplete, vaccineCompletePercent }
  //     const historyUpdate = { history: firestore.FieldValue.arrayUnion(historyEntry) }
  //     t.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })

  //     res.sendStatus(201)
  //   })

  //   // 3. Response
  //   await query
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

  /**********************************/
  /* Version 2: Check & update both */
  /**********************************/
  // try {
  //   // 1. Inputs
  //   const stateId = req.params.stateId.toUpperCase()
  //   const { date: dateMillis, cases, casesNew } = req.body
  //   const date = firestore.Timestamp.fromMillis(dateMillis)

  //   // 2. Query
  //   const query = db.runTransaction(async t => {
  //     // Read data from covid-latest & covid-history
  //     const [latestSnapshot, historySnapshot] = await Promise.all([
  //       t.get(db.collection('covid-latest').doc(stateId)),
  //       t.get(db.collection('covid-history').doc(stateId))
  //     ])

  //     // Our NoSQL design requires the docs to exist already (stateId/stateName must be defined)
  //     if (!latestSnapshot.exists || !historySnapshot.exists) return res.sendStatus(404)

  //     // Only update latest if request data is newer OR equal
  //     const latestUpdate = { date, cases, casesNew }
  //     if (latestSnapshot.data().date.seconds <= date.seconds) t.set(db.collection('covid-latest').doc(stateId), latestUpdate, { merge: true })

  //     // Always update history (merge new entry into old entry)
  //     const history = []
  //     const historyEntry = { date, cases, casesNew } // coincidentally the same change as latestUpdate
  //     for (const oldHistoryEntry of historySnapshot.data().history) {
  //       if (oldHistoryEntry.date.seconds === date.seconds) history.push({ ...oldHistoryEntry, ...historyEntry })
  //       else history.push(oldHistoryEntry)
  //     }

  //     const historyUpdate = { history }
  //     t.set(db.collection('covid-history').doc(stateId), historyUpdate, { merge: true })

  //     res.sendStatus(200)
  //   })

  //   // 3. Response
  //   await query
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
