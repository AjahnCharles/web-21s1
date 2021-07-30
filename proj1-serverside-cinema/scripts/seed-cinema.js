const { admin, db } = require('../_services/firebase-admin-initialized')

const projectId = admin.apps[0].options.credential.projectId || 'proj1-cinema-emu'

const films = [
  { slug: 'black-pink-movie', title: 'Blackpink The Movie' },
  { slug: 'dune-2021', title: 'Dune' },
  { slug: 'shang-chi', title: 'Shang Chi and the Legend of the Ten Rings' },
  { slug: 'the-courier', title: 'The Courier' }
]

const main = async () => {
  const batch = db.batch()

  films.forEach(film => batch.set(db.collection('films').doc(film.slug), film, { merge: true }))

  await batch.commit()
  console.log(`Saved to ${projectId}\n- ${films.length} films`)
  process.exit(0)
}

main().catch(err => console.error(err))
