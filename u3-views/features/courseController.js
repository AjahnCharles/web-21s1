const { getCourse } = require('../_services/fakedb')

const courseDetails = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)

  // left `course` = name in handlebars
  // right `course` = JS variable
  res.render('course-details', { course: course })
}

const courseUnits = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)

  // left `units` = name in handlebars
  // right `course.units` = JS expression
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
