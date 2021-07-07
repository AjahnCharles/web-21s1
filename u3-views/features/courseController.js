const { getCourse } = require('../_services/fakedb')

const courseDetails = (req, res) => {
  const courseCode = req.params.code
  const course = getCourse(courseCode)

  // left `course` = name in handlebars
  // right `course` = JS variable
  res.render('course-details', { course: course })
}

module.exports = {
  courseDetails
}
