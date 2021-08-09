const { db } = require('../_services/firebase-admin-initialized')

const athleteList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('athletes').orderBy('name').get()

  // 3. Response
  const athletes = (await query).docs.map(doc => doc.data())
  res.render('athlete-list', { athletes })
}

const athleteDetails = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('athletes').doc(slug).get()

  // 3. Response
  const athlete = (await query).data()
  res.render('athlete-details', { athlete })
}

const athleteSchedule = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('heats').where('athleteSlugs', 'array-contains', slug).get()

  // 3. Response
  const heats = (await query).docs.map(doc => doc.data())
  res.render('athlete-schedule', { heats })
}

const athleteCreateForm = async (req, res) => {
  // 3. Response
  res.render('athlete-create-form')
}

const athleteCreate = async (req, res) => {
  // 1. Inputs
  const { slug, name, teamSlug, team, age, gender } = req.body
  const data = { slug, name, teamSlug, team, age, gender }

  // 2. Query
  const query = db.collection('athletes').doc(slug).set(data, { merge: true })

  // 3. Response
  await query
  res.redirect(`/athletes/${slug}`)
}

module.exports = {
  athleteList,
  athleteDetails,
  athleteSchedule,
  athleteCreateForm,
  athleteCreate
}
