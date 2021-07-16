const courses = {
  231370: {
    code: '231370',
    title: 'Web Servers & Services',
    semester: 1,
    students: [
      'Bank', 'Chinjung', 'Jay', 'Jib', 'Joker',
      'Mook', 'Oat', 'Oil', 'Peet', 'Phun'
    ],
    units: [
      { id: 'U1', title: 'HTTP Request-Response' },
      { id: 'U2', title: 'Routing & Controllers' },
      { id: 'U3', title: 'Views' },
      { id: 'U4', title: 'Databases' },
      { id: 'U5', title: 'REST APIs' },
      { id: 'U6', title: 'Single-Page Apps' },
      { id: 'U7', title: 'Components' },
      { id: 'U8', title: 'Client-side State' },
      { id: 'U9', title: 'CSS Frameworks' },
      { id: 'U10', title: 'Hosting & CI/CD' }
    ]
  }
}

const getCourse = (code) => courses[code]
module.exports = { getCourse }
