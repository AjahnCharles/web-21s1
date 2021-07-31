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

  const ticket = {
    screeningSlug,
    seats,
    createdAt: firestore.FieldValue.serverTimestamp()
  }

  const screeningUpdate = {
    seatsAvailable: firestore.FieldValue.arrayRemove(...seats),
    seatsUnavailable: firestore.FieldValue.arrayUnion(...seats)
  }

  // 2. Query
  // TODO: This should be a transaction
  const ticketRef = db.collection('users')
    .doc('chaz')
    .collection('tickets')
    .doc()

  const queryTicket = ticketRef.set(ticket)
  const queryScreening = db.collection('screenings')
    .doc(screeningSlug)
    .set(screeningUpdate, { merge: true })

  // 3. Response
  await queryTicket
  await queryScreening
  res.redirect(`${baseUrl}tickets/${ticketRef.id}`)
}

module.exports = {
  bookingForm,
  bookingProcess
}
