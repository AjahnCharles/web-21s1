const { db } = require('../_services/firebase-initialized')

const iterationList = async (req, res) => {
  const query = db.collection('iterations').get()
  const iteration = (await query).docs.map(doc => doc.data())
  res.render('uni-iteration-list', { iteration })
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
  const students = (await query).data()
  res.render('uni-student-details', { students })
}

const courseList = async (req, res) => {
  const query = db.collection('iterations')
    .where('year', '==', 2021)
    .where('semester', '==', 1)
    .get()
  const iteration = (await query).docs.map(doc => doc.data())
  res.render('uni-course-list', { iteration })
}

const courseDetails = async (req, res) => {
  const code = req.params.code
  const query = db.collection('iterations')
    .where('courseCode', '==', code)
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
