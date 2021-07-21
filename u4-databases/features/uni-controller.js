const { db } = require('../_services/firebase-initialized')

const iterationList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('iterations').get()

  // 3. Response
  const iterations = (await query).docs.map(doc => doc.data())
  res.render('uni-iteration-list', { iterations })
}

const iterationDetails = async (req, res) => {
  // 1. Inputs
  const iterationCode = req.params.code

  // 2. Query
  const query = db.collection('iterations').doc(iterationCode).get()

  // 3. Response
  const iteration = (await query).data()
  res.render('uni-iteration-details', { iteration })
}

const studentDetails = async (req, res) => {
  // 1. Inputs
  const studentCode = req.params.code

  // 2. Query
  const query = db.collection('students').doc(studentCode).get()

  // 3. Response
  const student = (await query).data()
  res.render('uni-student-details', { student })
}

const courseList = async (req, res) => {
  // 1. Inputs
  // none

  // 2. Query
  const query = db.collection('iterations')
    .where('year', '==', 2021)
    .where('semester', '==', 1)
    .get()

  // 3. Response
  const courses = (await query).docs.map(doc => doc.data())
  res.render('uni-course-list', { courses })
}

module.exports = {
  iterationList,
  iterationDetails,
  studentDetails,
  courseList
}
