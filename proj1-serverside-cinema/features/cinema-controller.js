const { db } = require('../_services/firebase-admin-initialized')

const cinemaList = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err)
    res.render('whoops')
  }
}

const cinemaDetails = async (req, res) => {
  try {
    // 1. Inputs
    const { slug } = req.params

    // 2. Query
    const queryCinema = db.collection('cinemas').doc(slug).get()
    const queryScreenings = db.collection('screenings')
      .where('cinemaSlug', '==', slug) // real implementation would also set the date
      .orderBy('timeString')
      .orderBy('screen')
      .get()

    // 3. Response
    const cinema = (await queryCinema).data()
    const screenings = (await queryScreenings)
      .docs
      .map(doc => doc.data())

    res.render('cinema-details', { cinema, screenings })
  } catch (err) {
    console.error(err)
    res.render('whoops')
  }
}

module.exports = {
  cinemaList,
  cinemaDetails
}
