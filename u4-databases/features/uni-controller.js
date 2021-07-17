const { db } = require('../_services/firebase-initialized')

const iterationList = async (req, res) => {
  const query = db.collection('iterations').get()
  const iterations = (await query).docs.map(doc => doc.data())

  res.render('uni-iteration-list', { iterations })
}

const iterationDetails = async (req, res) => {
  const code = req.params.code
  const query = db.collection('iterations').doc(code).get()
  const iteration = (await query).data()

  res.render('uni-iteration-details', { iteration })
}

const studentDetails = async (req, res) => {
  const code = req.params.code
  const query = db.collection('students').doc(code).get()
  const student = (await query).data()

  res.render('uni-student-details', { student })
}

const courseList = async (req, res) => {
  const query = db.collection('iterations')
    .where('year', '==', 2021)
    .where('semester', '==', 1)
    .get()
  const courses = (await query).docs.map(doc => doc.data())

  res.render('uni-course-list', { courses })
}

const courseDetails = async (req, res) => {
  const iterationCode = req.params.code
  const query = db.collection('iterations')
    .where('courseCode', '==', iterationCode)
    .orderBy('iterationCode', 'desc')
    .limit(1)
    .get()
  const iteration = (await query).docs[0].data()

  res.render('uni-course-details', { iteration })
}

module.exports = {
  iterationList,
  iterationDetails,
  studentDetails,
  courseList,
  courseDetails
}