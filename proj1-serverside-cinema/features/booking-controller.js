const { firestore } = require('firebase-admin')
const { db } = require('../_services/firebase-admin-initialized')
const { baseUrl } = require('../_services/base-url')

const bookingForm = async (req, res) => {
  // 1. Inputs
  const { screening: screeningSlug } = req.query

  // 2. Query
  const query = db.collection('screenings').doc(screeningSlug).get()

  // 3. Response
  const screening = (await query).data()
  res.render('booking-form', { screening })
}

const bookingProcess = async (req, res) => {
  // 1. Inputs
  const { screeningSlug, seats } = req.body

  // 2. Query
  // TODO: This should be a transaction
  const queryScreening = db.collection('screenings')
    .doc(screeningSlug)
    .get()
  const { cinemaName, filmName, date, timeString, screen } = (await queryScreening).data()

  const ticket = {
    screeningSlug,
    cinemaName,
    filmName,
    date,
    timeString,
    screen,
    seats,
    createdAt: firestore.FieldValue.serverTimestamp()
  }
  const queryCreateTicket = db.collection('users')
    .doc('chaz')
    .collection('tickets')
    .doc()
    .set(ticket)

  const screeningUpdate = {
    seatsAvailable: firestore.FieldValue.arrayRemove(...seats),
    seatsUnavailable: firestore.FieldValue.arrayUnion(...seats)
  }
  const queryUpdateScreening = db.collection('screenings')
    .doc(screeningSlug)
    .set(screeningUpdate, { merge: true })

  // 3. Response
  await queryCreateTicket
  await queryUpdateScreening
  res.redirect(`${baseUrl}tickets`)
}

module.exports = {
  bookingForm,
  bookingProcess
}
