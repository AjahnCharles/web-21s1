const { db } = require('../_services/firebase-admin-initialized')

const ticketList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('users')
    .doc('chaz')
    .collection('tickets')
    .get()
  const tickets = (await query)
    .docs
    .map(doc => doc.data())
    .map(({ createdAt, seats, ...rest }) => ({ createdAt: new Date(createdAt.seconds * 1000).toLocaleString(), seats: seats.join(' '), ...rest }))

  // 3. Response
  res.render('ticket-list', { tickets })
}

module.exports = {
  ticketList
}
