const { getCourse } = require('../_services/fakedb')
const courseDetails = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)
  res.render('course-details', { course: course })
}
const courseUnits = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)
  res.render('course-units', { units: course.units })
}
const courseStudents = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)
  res.render('course-students', { course: course })
}
module.exports = {
  courseDetails,
  courseUnits,
  courseStudents
}
