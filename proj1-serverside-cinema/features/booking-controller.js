const { db } = require('../_services/firebase-admin-initialized')

const bookingForm = async (req, res) => {
  // 1. Inputs
  const { screening: screeningSlug } = req.query

  // 2. Query
  const query = db.collection('screenings').doc(screeningSlug).get()

  // 3. Response
  const screening = (await query).data()
  res.render('booking-form', { screening })
}

module.exports = {
  bookingForm
}
