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

const athletes = [
  { slug: 'shelly-ann-fraser-pryce', name: 'Shell-Ann Fraser-Pryce', teamSlug: 'jamaica', team: 'Jamaica', age: 34, gender: 'Female' },
  { slug: 'sunisa-lee', name: 'Sunisa Lee', teamSlug: 'usa', team: 'USA', age: 18, gender: 'Female' },
  { slug: 'hsing-chun-kuo', name: 'Hsing-Chun Kuo', teamSlug: 'chinese-taipei', team: 'Chinese Taipei', age: 27, gender: 'Female' },
  { slug: 'ahmed-hafnaoui', name: 'Ahmed Hafnaoui', teamSlug: 'tunisia', team: 'Tunisia', age: 18, gender: 'Male' }
]

const sports = [
  { slug: 'sprinting', name: 'Sprinting', description: 'Run as fast as you can! Run as fast as anyone can! Sprinting includes 100m, 200m, 400m, and relays. These events are the flag-bearers of athletics.' },
  { slug: 'gymnastics', name: 'Gymnastics', description: 'Gymnastics covers 3 disciplines: Artistic Gymnastics, Rhythmic Gymnastics, and Trampoline. There are 13 distinct events, including individual, team, and all-around.' },
  { slug: 'weight-lifting', name: 'Weight Lifting', description: 'There are 2 standard techniques for weight-lifting: the "snatch" and the "clean and jerk". Competitors are grouped by bodyweight. Each competitor has 3 attempts at each technique, keeping their best effort.' },
  { slug: 'swimming', name: 'Swimming', description: 'Running, but mostly with your hands, and in the water. You probably already knew what swimming was... this sport spans sprinting up to marathon, and also team events.' }
]

const events = [
  { slug: 'f100m', sportSlug: 'sprinting', name: 'Women\'s 100m', dateStart: 210730, dateEnd: 210731, dateString: 'Fri 30 Jul - Sat 31 Jul' },
  { slug: 'f200m', sportSlug: 'sprinting', name: 'Women\'s 200m', dateStart: 210802, dateEnd: 210803, dateString: 'Mon 02 Aug - Tue 03 Aug' },
  { slug: 'f400m', sportSlug: 'sprinting', name: 'Women\'s 400m', dateStart: 210803, dateEnd: 210806, dateString: 'Tue 03 Aug - Fri 06 Aug' },
  { slug: 'f4x100m', sportSlug: 'sprinting', name: 'Women\'s 4x100m', dateStart: 210805, dateEnd: 210806, dateString: 'Thu 05 Aug - Fri 06 Aug' },
  { slug: 'm100m', sportSlug: 'sprinting', name: 'Men\'s 100m', dateStart: 210731, dateEnd: 210801, dateString: 'Sat 31 Jul - Sun 01 Aug' },
  { slug: 'm200m', sportSlug: 'sprinting', name: 'Men\'s 200m', dateStart: 210803, dateEnd: 210804, dateString: 'Tue 03 Aug - Wed 04 Aug' },
  { slug: 'm400m', sportSlug: 'sprinting', name: 'Men\'s 400m', dateStart: 210801, dateEnd: 210805, dateString: 'Sun 01 Aug - Thu 05 Aug' },
  { slug: 'm4x100m', sportSlug: 'sprinting', name: 'Men\'s 4x100m', dateStart: 210805, dateEnd: 210806, dateString: 'Thu 05 Aug - Fri 06 Aug' },
  { slug: 'fagym', sportSlug: 'gymnastics', name: 'Women\'s Artistic Gymnastics', dateStart: 210725, dateEnd: 210803, dateString: 'Sun 25 Jul - Tue 03 Aug' },
  { slug: 'frgym', sportSlug: 'gymnastics', name: 'Women\'s Rhythmic Gymnastics', dateStart: 210806, dateEnd: 210808, dateString: 'Fri 07 Aug - Sun 08 Aug' },
  { slug: 'wtgym', sportSlug: 'gymnastics', name: 'Women\'s Trampoline Gymnastics', dateStart: 210730, dateEnd: 210730, dateString: 'Fri 30 Jul' },
  { slug: 'magym', sportSlug: 'gymnastics', name: 'Men\'s Artistic Gymnastics', dateStart: 210724, dateEnd: 210803, dateString: 'Sat 24 Jul - Tue 03 Aug' },
  { slug: 'mtgym', sportSlug: 'gymnastics', name: 'Men\'s Trampoline Gymnastics', dateStart: 210731, dateEnd: 210731, dateString: 'Sat 31 Jul' },
  { slug: 'f100mfs', sportSlug: 'swimming', name: 'Women\'s 100m Freestyle', dateStart: 210728, dateEnd: 210730, dateString: 'Wed 28 Jul - Fri 30 Jul' },
  { slug: 'f200mfs', sportSlug: 'swimming', name: 'Women\'s 200m Freestyle', dateStart: 210726, dateEnd: 210728, dateString: 'Mon 26 Jul - Wed 28 Jul' },
  { slug: 'f400mfs', sportSlug: 'swimming', name: 'Women\'s 400m Freestyle', dateStart: 210725, dateEnd: 210726, dateString: 'Sun 25 Jul - Mon 26 Jul' },
  { slug: 'f800mfs', sportSlug: 'swimming', name: 'Women\'s 800m Freestyle', dateStart: 210729, dateEnd: 210731, dateString: 'Thu 29 Jul - Sat 31 Jul' },
  { slug: 'm100mfs', sportSlug: 'swimming', name: 'Men\'s 100m Freestyle', dateStart: 210727, dateEnd: 210729, dateString: 'Tue 27 Jul - Thu 29 Jul' },
  { slug: 'm200mfs', sportSlug: 'swimming', name: 'Men\'s 200m Freestyle', dateStart: 210725, dateEnd: 210727, dateString: 'Sun 25 Jul - Tue 27 Jul' },
  { slug: 'm400mfs', sportSlug: 'swimming', name: 'Men\'s 400m Freestyle', dateStart: 210724, dateEnd: 210725, dateString: 'Sat 24 Jul - Sun 25 Jul' },
  { slug: 'm800mfs', sportSlug: 'swimming', name: 'Men\'s 800m Freestyle', dateStart: 210727, dateEnd: 210729, dateString: 'Tue 27 Jul - Thu 29 Jul' },
  { slug: 'f49lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 49kg', dateStart: 210724, dateEnd: 210724, dateString: 'Sat 24 Jul' },
  { slug: 'f55lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 55kg', dateStart: 210726, dateEnd: 210726, dateString: 'Mon 26 Jul' },
  { slug: 'f59lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 59kg', dateStart: 210727, dateEnd: 210727, dateString: 'Tue 27 Jul' },
  { slug: 'f64lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 64kg', dateStart: 210727, dateEnd: 210727, dateString: 'Tue 27 Jul' },
  { slug: 'f76lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 76kg', dateStart: 210801, dateEnd: 210801, dateString: 'Sun 01 Aug' },
  { slug: 'f87lift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting 87kg', dateStart: 210802, dateEnd: 210802, dateString: 'Mon 02 Aug' },
  { slug: 'f87uplift', sportSlug: 'weight-lifting', name: 'Women\'s Weight-Lifting +87kg', dateStart: 210802, dateEnd: 210802, dateString: 'Mon 02 Aug' },
  { slug: 'm61lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 61kg', dateStart: 210725, dateEnd: 210725, dateString: 'Sun 25 Jul' },
  { slug: 'm67lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 67kg', dateStart: 210725, dateEnd: 210725, dateString: 'Sun 25 Jul' },
  { slug: 'm73lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 73kg', dateStart: 210728, dateEnd: 210728, dateString: 'Wed 28 Jul' },
  { slug: 'm81lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 81kg', dateStart: 210731, dateEnd: 210731, dateString: 'Sat 31 Jul' },
  { slug: 'm96lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 96kg', dateStart: 210731, dateEnd: 210731, dateString: 'Sat 31 Jul' },
  { slug: 'm109lift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting 109kg', dateStart: 210803, dateEnd: 210803, dateString: 'Tue 03 Aug' },
  { slug: 'm109uplift', sportSlug: 'weight-lifting', name: 'Men\'s Weight-Lifting +109kg', dateStart: 210804, dateEnd: 210804, dateString: 'Wed 04 Aug' },
  { slug: 'f49tkd', sportSlug: 'taekwondo', name: 'Women\'s Taekwondo -49kg', dateStart: 210724, dateEnd: 210724, dateString: 'Sat 24 Jul' },
  { slug: 'f57tkd', sportSlug: 'taekwondo', name: 'Women\'s Taekwondo -57kg', dateStart: 210725, dateEnd: 210725, dateString: 'Sun 25 Jul' },
  { slug: 'f67tkd', sportSlug: 'taekwondo', name: 'Women\'s Taekwondo -67kg', dateStart: 210726, dateEnd: 210726, dateString: 'Mon 26 Jul' },
  { slug: 'f67uptkd', sportSlug: 'taekwondo', name: 'Women\'s Taekwondo +67kg', dateStart: 210727, dateEnd: 210727, dateString: 'Tue 27 Jul' },
  { slug: 'm58tkd', sportSlug: 'taekwondo', name: 'Men\'s Taekwondo -58kg', dateStart: 210724, dateEnd: 210724, dateString: 'Sat 24 Jul' },
  { slug: 'm68tkd', sportSlug: 'taekwondo', name: 'Men\'s Taekwondo -68kg', dateStart: 210725, dateEnd: 210725, dateString: 'Sun 25 Jul' },
  { slug: 'm80tkd', sportSlug: 'taekwondo', name: 'Men\'s Taekwondo -80kg', dateStart: 210726, dateEnd: 210726, dateString: 'Mon 26 Jul' },
  { slug: 'm80uptkd', sportSlug: 'taekwondo', name: 'Men\'s Taekwondo +80kg', dateStart: 210727, dateEnd: 210727, dateString: 'Tue 27 Jul' }
]

/**
 * For:
 * - /athletes/shelly-ann-fraser-pryce/schedule
 * - /athletes/sunisa-lee/schedule
 * - /athletes/hsing-chun-kuo/schedule
 * - /athletes/ahmed-hafnaoui/schedule
 * - /athletes/panipak-wongpattanakit/schedule
 * - /sports/100m-f/heats
 **/
const heats = [
  { slug: 'f100m-r1h1', sportSlug: 'sprinting', date: 2107301215, dateString: 'Fri 30 Jul 12:15', event: 'Women\'s 100m Round 1 Heat 1', athleteSlugs: [] },
  { slug: 'f100m-r1h2', sportSlug: 'sprinting', date: 2107301223, dateString: 'Fri 30 Jul 12:23', event: 'Women\'s 100m Round 1 Heat 2', athleteSlugs: [] },
  { slug: 'f100m-r1h3', sportSlug: 'sprinting', date: 2107301231, dateString: 'Fri 30 Jul 12:31', event: 'Women\'s 100m Round 1 Heat 3', athleteSlugs: [] },
  { slug: 'f100m-r1h4', sportSlug: 'sprinting', date: 2107301239, dateString: 'Fri 30 Jul 12:39', event: 'Women\'s 100m Round 1 Heat 4', athleteSlugs: [] },
  { slug: 'f100m-r1h5', sportSlug: 'sprinting', date: 2107301247, dateString: 'Fri 30 Jul 12:47', event: 'Women\'s 100m Round 1 Heat 5', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f100m-r1h6', sportSlug: 'sprinting', date: 2107301255, dateString: 'Fri 30 Jul 12:55', event: 'Women\'s 100m Round 1 Heat 6', athleteSlugs: [] },
  { slug: 'f100m-r1h7', sportSlug: 'sprinting', date: 2107301303, dateString: 'Fri 30 Jul 13:03', event: 'Women\'s 100m Round 1 Heat 7', athleteSlugs: [] },
  { slug: 'f100m-sf1', sportSlug: 'sprinting', date: 2107311915, dateString: 'Sat 31 Jul 19:15', event: 'Women\'s 100m Semifinal 1', athleteSlugs: [] },
  { slug: 'f100m-sf2', sportSlug: 'sprinting', date: 2107311923, dateString: 'Sat 31 Jul 19:23', event: 'Women\'s 100m Semifinal 2', athleteSlugs: [] },
  { slug: 'f100m-sf3', sportSlug: 'sprinting', date: 2107311931, dateString: 'Sat 31 Jul 19:31', event: 'Women\'s 100m Semifinal 3', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f100m-f', sportSlug: 'sprinting', date: 2107312150, dateString: 'Sat 31 Jul 21:50', event: 'Women\'s 100m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-r1-h2', sportSlug: 'sprinting', date: 2108021038, dateString: 'Mon 02 Aug 10:38', event: 'Women\'s 200m Round 1 Heat 2', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-sf1', sportSlug: 'sprinting', date: 2108021925, dateString: 'Mon 02 Aug 19:25', event: 'Women\'s 200m Semifinal 1', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-f', sportSlug: 'sprinting', date: 2108032150, dateString: 'Tue 03 Aug 21:50', event: 'Women\'s 200m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f4x100m-r1h1', sportSlug: 'sprinting', date: 2108051000, dateString: 'Thu 05 Aug 10:00', event: 'Women\'s 4x100m Round 1 Heat 1', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f4x100m-f', sportSlug: 'sprinting', date: 2108062230, dateString: 'Fri 06 Aug 22:30', event: 'Women\'s 4x100m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'fagym-team', sportSlug: 'gymnastics', date: 2107271945, dateString: 'Tue 27 Jul 19:45', event: 'Women\'s Gymnastic Team Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-all', sportSlug: 'gymnastics', date: 2107291950, dateString: 'Thu 29 Jul 19:50', event: 'Women\'s Gymnastic All-Around Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-uneven', sportSlug: 'gymnastics', date: 2108011924, dateString: 'Sun 01 Aug 19:24', event: 'Women\'s Gymnastic Uneven Bars Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-beam', sportSlug: 'gymnastics', date: 2108031750, dateString: 'Tue 03 Aug 17:50', event: 'Women\'s Gymnastic Balance Beam Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'f59wgt-f', sportSlug: 'weight-lifting', date: 2107271550, dateString: 'Tue 27 Jul 15:50', event: 'Women\'s Weight-Lifting 59kg Final', athleteSlugs: ['hsing-chun-kuo'] },
  { slug: 'm400mfs-h4', sportSlug: 'swimming', date: 2107241954, dateString: 'Sat 24 Jul 19:54', event: 'Men\'s 400m Freestyle Heat 4', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'm400mfs-f', sportSlug: 'swimming', date: 2107251052, dateString: 'Sun 25 Jul 10:52', event: 'Men\'s 400m Freestyle Final', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'm800mfs-h4', sportSlug: 'swimming', date: 2107272046, dateString: 'Tue 27 Jul 20:46', event: 'Men\'s 800m Freestyle Heat 4', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'f49tkd-ro16', sportSlug: 'taekwondo', date: 2107241138, dateString: 'Sat 24 Jul 11:38', event: 'Women\'s Taekwondo 49kg Round of 16', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-qf', sportSlug: 'taekwondo', date: 2107241430, dateString: 'Sat 24 Jul 14:30', event: 'Women\'s Taekwondo 49kg Quarterfinal', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-sf', sportSlug: 'taekwondo', date: 2107241600, dateString: 'Sat 24 Jul 16:00', event: 'Women\'s Taekwondo 49kg Semifinal', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-f', sportSlug: 'taekwondo', date: 21072422130, dateString: 'Sat 24 Jul 21:30', event: 'Women\'s Taekwondo 49kg Final', athleteSlugs: ['panipak-wongpattanakit'] }
]

const main = async () => {
  // Setup a write-only batch
  const batch = db.batch()

  // Clear user-created data
  batch.delete(db.collection('teams').doc('thailand'))
  batch.delete(db.collection('athletes').doc('panipak-wongpattanakit'))
  batch.delete(db.collection('sports').doc('taekwondo'))

  // Create example data
  teams.forEach(data => batch.set(db.collection('teams').doc(data.slug), data))
  athletes.forEach(data => batch.set(db.collection('athletes').doc(data.slug), data))
  sports.forEach(data => batch.set(db.collection('sports').doc(data.slug), data))
  events.forEach(data => batch.set(db.collection('events').doc(data.slug), data))
  heats.forEach(data => batch.set(db.collection('heats').doc(data.slug), data))

  // Save data to Firestore
  await batch.commit()
  console.log(`Saved to ${admin.apps[0].options.credential.projectId}\n- ${teams.length} Teams\n- ${athletes.length} Athletes\n- ${sports.length} Sports\n- ${events.length} Events\n- ${heats.length} Heats`)
  process.exit(0)
}

main().catch(err => console.error(err))
