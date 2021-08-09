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
 * - /sports/f100m/heats
 **/
const heats = [
  { slug: 'f100m-sf1', eventSlug: 'f100m', sportSlug: 'sprinting', date: 2107311915, dateString: 'Sat 31 Jul 19:15', round: 'Women\'s 100m Semifinal 1', athleteSlugs: [] },
  { slug: 'f100m-sf2', eventSlug: 'f100m', sportSlug: 'sprinting', date: 2107311923, dateString: 'Sat 31 Jul 19:23', round: 'Women\'s 100m Semifinal 2', athleteSlugs: [] },
  { slug: 'f100m-sf3', eventSlug: 'f100m', sportSlug: 'sprinting', date: 2107311931, dateString: 'Sat 31 Jul 19:31', round: 'Women\'s 100m Semifinal 3', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f100m-f', eventSlug: 'f100m', sportSlug: 'sprinting', date: 2107312150, dateString: 'Sat 31 Jul 21:50', round: 'Women\'s 100m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-r1-h2', eventSlug: 'f200m', sportSlug: 'sprinting', date: 2108021038, dateString: 'Mon 02 Aug 10:38', round: 'Women\'s 200m Round 1 Heat 2', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-sf1', eventSlug: 'f200m', sportSlug: 'sprinting', date: 2108021925, dateString: 'Mon 02 Aug 19:25', round: 'Women\'s 200m Semifinal 1', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f200m-f', eventSlug: 'f200m', sportSlug: 'sprinting', date: 2108032150, dateString: 'Tue 03 Aug 21:50', round: 'Women\'s 200m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f4x100m-r1h1', eventSlug: 'f4x100m', sportSlug: 'sprinting', date: 2108051000, dateString: 'Thu 05 Aug 10:00', round: 'Women\'s 4x100m Round 1 Heat 1', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'f4x100m-f', eventSlug: 'f4x100m', sportSlug: 'sprinting', date: 2108062230, dateString: 'Fri 06 Aug 22:30', round: 'Women\'s 4x100m Final', athleteSlugs: ['shelly-ann-fraser-pryce'] },
  { slug: 'fagym-team', eventSlug: 'fagym', sportSlug: 'gymnastics', date: 2107271945, dateString: 'Tue 27 Jul 19:45', round: 'Women\'s Gymnastic Team Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-all', eventSlug: 'fagym', sportSlug: 'gymnastics', date: 2107291950, dateString: 'Thu 29 Jul 19:50', round: 'Women\'s Gymnastic All-Around Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-uneven', eventSlug: 'fagym', sportSlug: 'gymnastics', date: 2108011924, dateString: 'Sun 01 Aug 19:24', round: 'Women\'s Gymnastic Uneven Bars Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'fagym-beam', eventSlug: 'fagym', sportSlug: 'gymnastics', date: 2108031750, dateString: 'Tue 03 Aug 17:50', round: 'Women\'s Gymnastic Balance Beam Final', athleteSlugs: ['sunisa-lee'] },
  { slug: 'f59lift-f', eventSlug: 'f59lift', sportSlug: 'weight-lifting', date: 2107271550, dateString: 'Tue 27 Jul 15:50', round: 'Women\'s Weight-Lifting 59kg Final', athleteSlugs: ['hsing-chun-kuo'] },
  { slug: 'm400mfs-h4', eventSlug: 'm400mfs', sportSlug: 'swimming', date: 2107241954, dateString: 'Sat 24 Jul 19:54', round: 'Men\'s 400m Freestyle Heat 4', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'm400mfs-f', eventSlug: 'm400mfs', sportSlug: 'swimming', date: 2107251052, dateString: 'Sun 25 Jul 10:52', round: 'Men\'s 400m Freestyle Final', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'm800mfs-h4', eventSlug: 'm800mfs', sportSlug: 'swimming', date: 2107272046, dateString: 'Tue 27 Jul 20:46', round: 'Men\'s 800m Freestyle Heat 4', athleteSlugs: ['ahmed-hafnaoui'] },
  { slug: 'f49tkd-ro16', eventSlug: 'f49tkd', sportSlug: 'taekwondo', date: 2107241138, dateString: 'Sat 24 Jul 11:38', round: 'Women\'s Taekwondo 49kg Round of 16', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-qf', eventSlug: 'f49tkd', sportSlug: 'taekwondo', date: 2107241430, dateString: 'Sat 24 Jul 14:30', round: 'Women\'s Taekwondo 49kg Quarterfinal', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-sf', eventSlug: 'f49tkd', sportSlug: 'taekwondo', date: 2107241600, dateString: 'Sat 24 Jul 16:00', round: 'Women\'s Taekwondo 49kg Semifinal', athleteSlugs: ['panipak-wongpattanakit'] },
  { slug: 'f49tkd-f', eventSlug: 'f49tkd', sportSlug: 'taekwondo', date: 21072422130, dateString: 'Sat 24 Jul 21:30', round: 'Women\'s Taekwondo 49kg Final', athleteSlugs: ['panipak-wongpattanakit'] }
]

const competitors = {
  'f100m-sf1': [
    { slug: 'elaine-thompson-herah', name: 'Elaine Thompson-Herah', teamSlug: 'jamaica', lane: 4 },
    { slug: 'ajla-del-ponte', name: 'Ajla del Ponte', teamSlug: 'other', lane: 6 },
    { slug: 'dina-asher-smith', name: 'Dina Asher-Smith', teamSlug: 'great-britain', lane: 7 },
    { slug: 'jenna-prandini', name: 'Jenna Prandini', teamSlug: 'usa', lane: 8 },
    { slug: 'khamica-bingham', name: 'Khamica Bingham', teamSlug: 'other', lane: 2 },
    { slug: 'tynia-gaither', name: 'Tynia Gaither', teamSlug: 'other', lane: 3 },
    { slug: 'tatjana-pinto', name: 'Tatjana Pinto', teamSlug: 'germany', lane: 9 },
    { slug: 'mudhawi-alshammari', name: 'Mudhawi Alshammari', teamSlug: 'other', lane: 3 }
  ],
  'f100m-sf2': [
    { slug: 'marie-josee-ta-lou', name: 'Marie-Josee Ta Lou', teamSlug: 'other', lane: 5 },
    { slug: 'shericka-jackson', name: 'Shericka Jackson', teamSlug: 'jamaica', lane: 6 },
    { slug: 'michelle-lee-ahye', name: 'Michelle-Lee Ahye', teamSlug: 'other', lane: 4 },
    { slug: 'alexandra-burghardt', name: 'Alexandra Burghardt', teamSlug: 'germany', lane: 7 },
    { slug: 'javianne-oliver', name: 'Javianne Oliver', teamSlug: 'usa', lane: 9 },
    { slug: 'crystal-emmanuel', name: 'Crystal Emmanuel', teamSlug: 'other', lane: 2 },
    { slug: 'manqi-ge', name: 'Manqi Ge', teamSlug: 'china', lane: 3 },
    { slug: 'asha-philip', name: 'Asha Philip', teamSlug: 'great-britain', lane: 8 }
  ],
  'f100m-sf3': [
    { slug: 'shelly-ann-fraser-pryce', name: 'Shelly-Ann Fraser-Pryce', teamSlug: 'jamaica', lane: 5 },
    { slug: 'mujinga-kambundji', name: 'Mujinga Kambundji', teamSlug: 'other', lane: 7 },
    { slug: 'teahna-daniels', name: 'Teahna Daniels', teamSlug: 'usa', lane: 6 },
    { slug: 'daryll-neita', name: 'Daryll Neita', teamSlug: 'great-britain', lane: 4 },
    { slug: 'nzubechi-grace-nwokocha', name: 'Nzubechi Grace Nwokocha', teamSlug: 'other', lane: 9 },
    { slug: 'gina-bass', name: 'Gina Bass', teamSlug: 'other', lane: 2 },
    { slug: 'murielle-ahoure', name: 'Murielle Ahoure', teamSlug: 'other', lane: 8 },
    { slug: 'anna-bongiorni', name: 'Anna Bongiorni', teamSlug: 'italy', lane: 3 }
  ],
  'f100m-f': [
    { slug: 'elaine-thompson-herah', name: 'Elaine Thompson-Herah', teamSlug: 'jamaica', lane: 4 },
    { slug: 'shelly-ann-fraser-pryce', name: 'Shelly-Ann Fraser-Pryce', teamSlug: 'jamaica', lane: 5 },
    { slug: 'shericka-jackson', name: 'Shericka Jackson', teamSlug: 'jamaica', lane: 7 },
    { slug: 'marie-josee-ta-lou', name: 'Marie-Josee Ta Lou', teamSlug: 'other', lane: 6 },
    { slug: 'ajla-del-ponte', name: 'Ajla del Ponte', teamSlug: 'other', lane: 8 },
    { slug: 'mujinga-kambundji', name: 'Mujinga Kambundji', teamSlug: 'other', lane: 9 },
    { slug: 'teahna-daniels', name: 'Teahna Daniels', teamSlug: 'usa', lane: 3 },
    { slug: 'daryll-neita', name: 'Daryll Neita', teamSlug: 'great-britain', lane: 2 }
  ]
}

const records = [
  { slug: 'elaine-thompson-herah', name: 'Elaine Thompson-Herah', pb100: '10.61', pb200: '21.53', sb100: '10.61', sb200: '21.53' },
  { slug: 'shelly-ann-fraser-pryce', name: 'Shelly-Ann Fraser-Pryce', pb100: '10.63', pb200: '21.79', sb100: '10.63', sb200: '21.79' },
  { slug: 'shericka-jackson', name: 'Shericka Jackson', pb100: '10.76', pb200: '21.82', sb100: '10.76', sb200: '21.82' },
  { slug: 'marie-josee-ta-lou', name: 'Marie-Josee Ta Lou', pb100: '10.78', pb200: '22.08', sb100: '10.78', sb200: '22.11' },
  { slug: 'mujinga-kambundji', name: 'Mujinga Kambundji', pb100: '10.95', pb200: '22.26', sb100: '10.95', sb200: '22.26' },
  { slug: 'teahna-daniels', name: 'Teahna Daniels', pb100: '10.84', pb200: '22.51', sb100: '10.84', sb200: '22.54' },
  { slug: 'daryll-neita', name: 'Daryll Neita', pb100: '10.96', pb200: '23.06', sb100: '10.96', sb200: '23.06' }
]

const main = async () => {
  // Setup a write-only batch
  const batch = db.batch()

  // Delete user-created data
  batch.delete(db.collection('teams').doc('thailand'))
  batch.delete(db.collection('athletes').doc('panipak-wongpattanakit'))
  batch.delete(db.collection('sports').doc('taekwondo'))
  batch.delete(db.collection('records').doc('ajla-del-ponte'))

  // Create example data
  teams.forEach(data => batch.set(db.collection('teams').doc(data.slug), data))
  athletes.forEach(data => batch.set(db.collection('athletes').doc(data.slug), data))
  sports.forEach(data => batch.set(db.collection('sports').doc(data.slug), data))
  events.forEach(data => batch.set(db.collection('events').doc(data.slug), data))
  heats.forEach(data => batch.set(db.collection('heats').doc(data.slug), data))
  Object.entries(competitors).forEach(([heatSlug, dataset]) => dataset.forEach(data => batch.set(db.collection('heats').doc(heatSlug).collection('competitors').doc(data.slug), data)))
  records.forEach(data => batch.set(db.collection('records').doc(data.slug), data))

  // Save data to Firestore
  await batch.commit()
  console.log(`Saved to ${admin.apps[0].options.credential.projectId}\n- ${teams.length} Teams\n- ${athletes.length} Athletes\n- ${sports.length} Sports\n- ${events.length} Events\n- ${heats.length} Heats\n- ${Object.keys(competitors).length} Line-ups\n- ${records.length} Records`)
  process.exit(0)
}

main().catch(err => console.error(err))
