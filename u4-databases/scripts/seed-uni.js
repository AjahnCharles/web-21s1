const { firebase, db } = require('../_services/firebase-initialized')

const iterations = [
  { courseCode: '231322', iterationCode: '231322.19s1', title: 'Information Systems Planning & Management', year: 2019, semester: 1, studentCodes: [] },
  { courseCode: '231322', iterationCode: '231322.20s1', title: 'Information Systems Planning & Management', year: 2020, semester: 1, studentCodes: ['61341416'] },
  { courseCode: '231322', iterationCode: '231322.21s1', title: 'Information Systems Planning & Management', year: 2021, semester: 1, studentCodes: ['62342931', '62344386', '62346076', '62346915', '62340104', '62349015', '62342214', '62346786', '62347127', '62345345'] },
  { courseCode: '231370', iterationCode: '231370.19s2', title: 'Web Servers & Services', year: 2019, semester: 2, studentCodes: [] },
  { courseCode: '231370', iterationCode: '231370.20s1', title: 'Web Servers & Services', year: 2020, semester: 1, studentCodes: ['61341416'] },
  { courseCode: '231370', iterationCode: '231370.20s2', title: 'Web Servers & Services', year: 2020, semester: 2, studentCodes: [] },
  { courseCode: '231370', iterationCode: '231370.21s1', title: 'Web Servers & Services', year: 2021, semester: 1, studentCodes: ['62342931', '62344386', '62346076', '62346915', '62340104', '62349015', '62342214', '62346786', '62347127', '62345345'] },
  { courseCode: '231371', iterationCode: '231371.19s1', title: 'Mobile Application Development', year: 2019, semester: 1, studentCodes: [] },
  { courseCode: '231371', iterationCode: '231371.20s2', title: 'Mobile Application Development', year: 2020, semester: 2, studentCodes: ['61341416'] },
  { courseCode: '231374', iterationCode: '231374.19s2', title: 'Concurrent & Functional Programming', year: 2019, semester: 2, studentCodes: [] }
]

const students = [
  { code: '62342931', name: 'Bank', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62344386', name: 'Chinjung', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '61341416', name: 'Crave', enrollments: [{ iterationCode: '231322.20s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.20s1', title: 'Web Servers & Services' }, { iterationCode: '231371.20s2', title: 'Mobile Application Development' }] },
  { code: '62346076', name: 'Jay', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62346915', name: 'Jib', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62340104', name: 'Joker', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62349015', name: 'Mook', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62342214', name: 'Oat', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62346786', name: 'Oil', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62347127', name: 'Peet', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] },
  { code: '62345345', name: 'Phun', enrollments: [{ iterationCode: '231322.21s1', title: 'Information Systems Planning & Management' }, { iterationCode: '231370.21s1', title: 'Web Servers & Services' }] }
]

const batch = db.batch()

iterations.forEach(iteration => {
  batch.set(db.collection('iterations').doc(iteration.iterationCode), { ...iteration, studentCount: iteration.studentCodes.length })
})

students.forEach(student => {
  batch.set(db.collection('students').doc(student.code), student)
})

batch.commit()
  .then(() => {
    console.log(`Saved ${iterations.length} iterations & ${students.length} studentCodes to ${firebase.app().options.projectId}`)
    process.exit(0)
  })
