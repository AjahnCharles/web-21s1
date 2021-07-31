const { db } = require('../_services/firebase-admin-initialized')

const filmList = async (req, res) => {
  try {
    // 1. Inputs
    // none

    // 2. Query
    const query = db.collection('films').get()

    // 3. Response
    const films = (await query)
      .docs
      .map(doc => doc.data())
      .map(({ slug, title }) => ({ slug, title }))

    res.render('film-list', { films })
  } catch (err) {
    console.error(err)
    res.render('whoops')
  }
}

const filmDetails = async (req, res) => {
  try {
    // 1. Inputs
    const { slug } = req.params
    const cinemaSlugs = ['phitsanulok-bec-auditorium', 'phitsanulok-canal', 'phitsanulok-central']

    // 2. Query
    const queryFilm = db.collection('films').doc(slug).get()
    const queryScreenings = db.collection('screenings')
      .where('filmSlug', '==', slug)
      .where('cinemaSlug', 'in', cinemaSlugs)
      .orderBy('timeString')
      .orderBy('cinemaSlug')
      .orderBy('screen')
      .get()

    // 3. Response
    const film = (await queryFilm).data()
    const screenings = (await queryScreenings)
      .docs
      .map(doc => doc.data())

    res.render('film-details', { film, screenings })
  } catch (err) {
    console.error(err)
    res.render('whoops')
  }
}

module.exports = {
  filmList,
  filmDetails
}
