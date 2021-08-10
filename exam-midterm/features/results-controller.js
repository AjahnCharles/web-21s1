const { db } = require('../_services/firebase-admin-initialized')

const resultList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('results').orderBy('rank').get()

  // 3. Response
  const results = (await query).docs.map(doc => doc.data())
  res.render('result-list', { results })
}

const resultDetails = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('results').doc(slug).collection('attempts').orderBy('distance').get()

  // 3. Response
  const attempts = (await query).docs.map(doc => doc.data())
  res.render('result-details', { attempts })
}

const resultWorldRecords = async (req, res) => {
  // 1. Inputs
  const slug = req.params.slug

  // 2. Query
  const query = db.collection('world-records').doc(slug).get()

  // 3. Response
  const worldRecord = (await query).data()
  res.render('result-worldrecord', { worldRecord })
}

const resultCreateForm = async (req, res) => {
  // 3. Response
  res.render('result-create-form')
}

const resultCreate = async (req, res) => {
  // 1. Inputs
  const { slug, name, rank, order, distance, record } = req.body
  const data = { slug, name, rank: parseInt(rank), order: parseInt(order), distance, record }

  // 2. Query
  const query = db.collection('results').doc(slug).set(data, { merge: true })

  // 3. Response
  await query
  res.redirect('/results')
}

module.exports = {
  resultList,
  resultDetails,
  resultWorldRecords,
  resultCreateForm,
  resultCreate
}
