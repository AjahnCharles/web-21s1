const { admin, db } = require('../_services/firebase-admin-initialized')
const { firestore } = require('firebase-admin')
const keyBy = require('lodash/keyBy')

const projectId = admin.apps[0].options.credential.projectId || 'proj1-cinema-emu'

const cinemas = [
  { slug: 'phitsanulok-bec-auditorium', name: 'BEC Auditorium', city: 'Phitsanulok' },
  { slug: 'phitsanulok-canal', name: 'BECinema Canal View', city: 'Phitsanulok' },
  { slug: 'phitsanulok-central', name: 'BECinema @ Central Plaza', city: 'Phitsanulok' },
  { slug: 'bangkok-paragon', name: 'BECinema @ Siam Paragon', city: 'Bangkok' },
  { slug: 'chiang-mai-maya', name: 'BECinema @ MAYA', city: 'Chiang Mai' }
]

const films = [
  { slug: 'black-pink-movie', title: 'Blackpink The Movie' },
  { slug: 'dune-2021', title: 'Dune' },
  { slug: 'shang-chi', title: 'Shang Chi and the Legend of the Ten Rings' },
  { slug: 'the-courier', title: 'The Courier' }
]

const screeningsRaw = [
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628857800000, screen: '1' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628863200000, screen: '1' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628868600000, screen: '1' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'dune-2021', dateMillis: 1628859600000, screen: '2' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'dune-2021', dateMillis: 1628868600000, screen: '2' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'shang-chi', dateMillis: 1628861400000, screen: '3' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'shang-chi', dateMillis: 1628863200000, screen: '1' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'the-courier', dateMillis: 1628856000000, screen: '2' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'the-courier', dateMillis: 1628863200000, screen: '2' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'dune-2021', dateMillis: 1628856900000, screen: 'A' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'dune-2021', dateMillis: 1628865900000, screen: 'A' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: 'B' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'black-pink-movie', dateMillis: 1628858700000, screen: 'C' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'the-courier', dateMillis: 1628865900000, screen: 'C' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628856000000, screen: '1' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628865000000, screen: '1' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628857800000, screen: '2' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628866800000, screen: '2' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628856900000, screen: '3' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628865900000, screen: '3' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'black-pink-movie', dateMillis: 1628858700000, screen: '4' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'black-pink-movie', dateMillis: 1628865900000, screen: '4' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: '5' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'the-courier', dateMillis: 1628868600000, screen: '5' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: '11' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628861400000, screen: '12' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628863200000, screen: '13' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'black-pink-movie', dateMillis: 1628864100000, screen: '14' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'dune-2021', dateMillis: 1628867700000, screen: '11' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628868600000, screen: '12' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'the-courier', dateMillis: 1628869500000, screen: '13' }
]

const cinemasBySlug = keyBy(cinemas, 'slug')
const filmsBySlug = keyBy(films, 'slug')

const getTimeString = (dateMillis) => {
  const date = new Date(dateMillis)
  const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' })
  return formatter.format(date)
}

const screenings = screeningsRaw
  .map(({ dateMillis, ...screening }) => ({
    ...screening,
    date: firestore.Timestamp.fromMillis(dateMillis),
    timeString: getTimeString(dateMillis),
    cinemaName: cinemasBySlug[screening.cinemaSlug].name,
    filmName: filmsBySlug[screening.filmSlug].title
  }))
  .map(screening => ({ ...screening, slug: `${screening.cinemaSlug},${screening.screen},${screening.date.seconds}` }))

const main = async () => {
  const batch = db.batch()

  cinemas.forEach(cinema => batch.set(db.collection('cinemas').doc(cinema.slug), cinema, { merge: true }))
  films.forEach(film => batch.set(db.collection('films').doc(film.slug), film, { merge: true }))
  screenings.forEach(screening => batch.set(db.collection('screenings').doc(screening.slug), screening, { merge: true }))

  await batch.commit()
  console.log(`Saved to ${projectId}\n- ${cinemas.length} cinemas\n- ${films.length} films\n- ${screenings.length} screenings`)
  process.exit(0)
}

main().catch(err => console.error(err))
