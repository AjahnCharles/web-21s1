const { db, admin } = require('../_services/firebase-admin-initialized')

const books = [
  {
    title: 'Seven Languages in Seven Weeks',
    description: 'You should learn a programming language every year...',
    isbn13: '978-1934356593',
    pages: 328,
    authors: ['Bruce Tate']
  },
  {
    title: 'Seven More Languages in Seven Weeks: Languages That Are Shaping the Future',
    description: 'The industry is moving from OO to FP...',
    isbn13: '978-1941222157',
    pages: 350,
    authors: ['Bruce Tate', 'Ian Dees', 'Frederic Daoud', 'Jack Moffitt']
  },
  {
    title: 'Scala for the Impatient',
    description: 'Interest in the Scala programming language continues to grow...',
    isbn13: '978-0134540566',
    pages: 384,
    authors: ['Cay Horstmann']
  }
]

const main = async () => {
  // Setup a write-only batch
  const batch = db.batch()
  books.forEach(book => {
    batch.set(db.collection('books').doc(book.isbn13), book, { merge: true })
  })

  // Save data to Firestore
  await batch.commit()
  console.log(`Saved ${books.length} books to ${admin.apps[0].options.credential.projectId}`)
  process.exit(0)
}

main().catch(err => console.error(err))
