// const { firestore } = require('firebase-admin')
const { db, admin } = require('../_services/firebase-admin-initialized')

// Data
const teams = [
  { slug: 'usa', rank: 1, name: 'United States of America', countFirst: 39, countSecond: 41, countThird: 33, countTotal: 113, introduction: 'They get a lot of medals. Michael Phelps is really good at swimming. Katie Ledecky too! Carl Lewis was a pretty great runner.' },
  { slug: 'china', rank: 2, name: 'People\'s Republic of China', countFirst: 38, countSecond: 32, countThird: 18, countTotal: 88, introduction: 'Great at table-tennis and badminton. Zou Kai is a legendary gymnast. Wu Minxia and Chen Ruolin are great divers.' },
  { slug: 'japan', rank: 3, name: 'Japan', countFirst: 27, countSecond: 14, countThird: 17, countTotal: 58, introduction: 'Judo-KIIICK! Tadahiro Nomura leads Japan\'s judo dominance.' },
  { slug: 'great-britain', rank: 4, name: 'Great Britain', countFirst: 22, countSecond: 21, countThird: 22, countTotal: 65, introduction: 'Great Britain has won at least one gold medal at every Olympic Games ever! Chris Hoy, Jason Kenny, Bradley Wiggins, Laura (Trott) Kenny are great cyclists.' },
  { slug: 'roc', rank: 5, name: 'ROC', countFirst: 20, countSecond: 28, countThird: 23, countTotal: 71, introduction: 'Competing as ROC, Russian athletes are exceptional at artistic swimming and gymnastics. Go watch Svetlana Romashina in the pool!' },
  { slug: 'australia', rank: 6, name: 'Australia', countFirst: 17, countSecond: 7, countThird: 22, countTotal: 46, introduction: 'Australia are strong swimmers. Ian Thorpe won 5 gold medals.' },
  { slug: 'netherlands', rank: 7, name: 'Netherlands', countFirst: 10, countSecond: 12, countThird: 14, countTotal: 36, introduction: 'The Dutch are strongest at cycling, sprinting, and dressage. Anna van der Breggen was braggin\' about her road race win!' },
  { slug: 'france', rank: 8, name: 'France', countFirst: 10, countSecond: 12, countThird: 11, countTotal: 33, introduction: 'LUNGE! French athletes are great at fencing. They\'re also pretty great at cycling.' },
  { slug: 'germany', rank: 9, name: 'Germany', countFirst: 10, countSecond: 11, countThird: 16, countTotal: 37, introduction: 'Isabell Werth bagged 10 medals in dressage. They\'re also good at football and hockey. Maybe watch out for their cyclists too!' },
  { slug: 'italy', rank: 10, name: 'Italy', countFirst: 10, countSecond: 10, countThird: 20, countTotal: 40, introduction: 'Italy love fencing. Valentina Vezzali scored 6 gold, 1 silver, and 2 bronze medals.' }
]

const main = async () => {
  // Setup a write-only batch
  const batch = db.batch()
  teams.forEach(data => batch.set(db.collection('teams').doc(data.slug), data))

  // Save data to Firestore
  await batch.commit()
  console.log(`Saved to ${admin.apps[0].options.credential.projectId}\n- ${teams.length} Teams`)
  process.exit(0)
}

main().catch(err => console.error(err))
