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

const layouts = [
  {
    layout: 'medium',
    seatsAvailable: [
      '1B', '1C', '1F', '1G', '1J', '1K', '1N', '1O',
      '2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I', '2J', '2K', '2L', '2M', '2N', '2O', '2P',
      '3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I', '3J', '3K', '3L', '3M', '3N', '3O', '3P',
      '4A', '4B', '4C', '4D', '4E', '4F', '4G', '4H', '4I', '4J', '4K', '4L', '4M', '4N', '4O', '4P',
      '5A', '5B', '5E', '5F', '5G', '5H', '5I', '5J', '5K', '5L', '5O', '5P',
      '6A', '6B', '6E', '6F', '6G', '6H', '6I', '6J', '6K', '6L', '6O', '6P'
    ],
    seatsUnavailable: []
  },
  {
    layout: 'small',
    seatsAvailable: [
      '1A', '1B', '1D', '1E', '1G', '1H',
      '2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H',
      '3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H',
      '4A', '4B', '4C', '4D', '4E', '4F', '4G', '4H'
    ],
    seatsUnavailable: []
  }
]

const screeningsRaw = [
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628857800000, screen: '1', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628863200000, screen: '1', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'black-pink-movie', dateMillis: 1628868600000, screen: '1', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'dune-2021', dateMillis: 1628859600000, screen: '2', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'dune-2021', dateMillis: 1628868600000, screen: '2', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-bec-auditorium', filmSlug: 'shang-chi', dateMillis: 1628861400000, screen: '3', layout: 'small' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'shang-chi', dateMillis: 1628863200000, screen: '1', layout: 'small' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'the-courier', dateMillis: 1628856000000, screen: '2', layout: 'small' },
  { cinemaSlug: 'phitsanulok-canal', filmSlug: 'the-courier', dateMillis: 1628863200000, screen: '2', layout: 'small' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'dune-2021', dateMillis: 1628856900000, screen: 'A', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'dune-2021', dateMillis: 1628865900000, screen: 'A', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: 'B', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'black-pink-movie', dateMillis: 1628858700000, screen: 'C', layout: 'medium' },
  { cinemaSlug: 'phitsanulok-central', filmSlug: 'the-courier', dateMillis: 1628865900000, screen: 'C', layout: 'medium' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628856000000, screen: '1', layout: 'medium' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628865000000, screen: '1', layout: 'medium' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628857800000, screen: '2', layout: 'medium' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628866800000, screen: '2', layout: 'medium' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628856900000, screen: '3', layout: 'small' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'dune-2021', dateMillis: 1628865900000, screen: '3', layout: 'small' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'black-pink-movie', dateMillis: 1628858700000, screen: '4', layout: 'small' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'black-pink-movie', dateMillis: 1628865900000, screen: '4', layout: 'small' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: '5', layout: 'small' },
  { cinemaSlug: 'bangkok-paragon', filmSlug: 'the-courier', dateMillis: 1628868600000, screen: '5', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628859600000, screen: '11', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628861400000, screen: '12', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628863200000, screen: '13', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'black-pink-movie', dateMillis: 1628864100000, screen: '14', layout: 'medium' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'dune-2021', dateMillis: 1628867700000, screen: '11', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'shang-chi', dateMillis: 1628868600000, screen: '12', layout: 'small' },
  { cinemaSlug: 'chiang-mai-maya', filmSlug: 'the-courier', dateMillis: 1628869500000, screen: '13', layout: 'small' }
]

const cinemasBySlug = keyBy(cinemas, 'slug')
const filmsBySlug = keyBy(films, 'slug')
const layoutsByName = keyBy(layouts, 'layout')

const getTimeString = (dateMillis) => {
  const date = new Date(dateMillis)
  const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' })
  return formatter.format(date)
}

const screenings = screeningsRaw
  .map(({ dateMillis, ...screening }) => ({
    ...screening,
    ...layoutsByName[screening.layout],
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
