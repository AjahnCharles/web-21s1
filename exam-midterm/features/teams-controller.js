const { db } = require('../_services/firebase-admin-initialized')

const teamList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('teams').orderBy('name').get()

  // 3. Response
  const teams = (await query).docs.map(doc => doc.data())
  res.render('team-list', { teams })
}

const teamDetails = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('teams').doc(slug).get()

  // 3. Response
  const team = (await query).data()
  res.render('team-details', { team })
}

const teamMedals = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('teams').orderBy('rank').get()

  // 3. Response
  const teams = (await query).docs.map(doc => doc.data())
  res.render('team-medals', { teams })
}

const teamCreateForm = async (req, res) => {
  // 3. Response
  res.render('team-create-form')
}

const teamCreate = async (req, res) => {
  // 1. Inputs
  const { slug, name, rank, countFirst, countSecond, countThird, countTotal, introduction } = req.body
  const data = { slug, name, rank, countFirst, countSecond, countThird, countTotal, introduction }

  // 2. Query
  const query = db.collection('teams').doc(slug).set(data, { merge: true })

  // 3. Response
  await query
  res.redirect(`/teams/${slug}`)
}

module.exports = {
  teamList,
  teamDetails,
  teamMedals,
  teamCreateForm,
  teamCreate
}
