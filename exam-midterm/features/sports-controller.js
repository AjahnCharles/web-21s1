const { db } = require('../_services/firebase-admin-initialized')

const sportList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('sports').orderBy('name').get()

  // 3. Response
  const sports = (await query).docs.map(doc => doc.data())
  res.render('sport-list', { sports })
}

const sportDetails = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('sports').doc(slug).get()

  // 3. Response
  const sport = (await query).data()
  res.render('sport-details', { sport })
}

const sportSchedule = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('events').where('sportSlug', '==', slug).get()

  // 3. Response
  const events = (await query).docs.map(doc => doc.data())
  res.render('sport-schedule', { events })
}

const sportCreateForm = async (req, res) => {
  // 3. Response
  res.render('sport-create-form')
}

const sportCreate = async (req, res) => {
  // 1. Inputs
  const { slug, name, description } = req.body
  const data = { slug, name, description }

  // 2. Query
  const query = db.collection('sports').doc(slug).set(data, { merge: true })

  // 3. Response
  await query
  res.redirect(`/sports/${slug}`)
}

module.exports = {
  sportList,
  sportDetails,
  sportSchedule,
  sportCreateForm,
  sportCreate
}
