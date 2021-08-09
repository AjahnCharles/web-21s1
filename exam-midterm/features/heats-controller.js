const { db } = require('../_services/firebase-admin-initialized')

const heatList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('heats').where('eventSlug', '==', 'f100m').get()

  // 3. Response
  const heats = (await query).docs.map(doc => doc.data())
  res.render('heat-list', { heats })
}

const heatLineup = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('heats').doc(slug).collection('competitors').orderBy('lane').get()

  // 3. Response
  const competitors = (await query).docs.map(doc => doc.data())
  res.render('heat-lineup', { competitors })
}

const recordDetails = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('records').doc(slug).get()

  // 3. Response
  const record = (await query).data()
  res.render('record-details', { record })
}

const recordCreateForm = async (req, res) => {
  // 3. Response
  res.render('record-create-form')
}

const recordCreate = async (req, res) => {
  // 1. Inputs
  const { slug, name, pb100, pb200, sb100, sb200 } = req.body
  const data = { slug, name, pb100, pb200, sb100, sb200 }

  // 2. Query
  const query = db.collection('records').doc(slug).set(data, { merge: true })

  // 3. Response
  await query
  res.redirect(`/records/${slug}`)
}

module.exports = {
  heatList,
  heatLineup,
  recordDetails,
  recordCreateForm,
  recordCreate
}
