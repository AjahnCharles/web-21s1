import { Video } from '../store/models'
import { db } from '../_services/firebase-initialized'

const videos: Video[] = [
  {
    id: '123',
    title: 'Is AI a species-level threat to humanity? | Elon Musk, Michio Kaku, Steven Pinker & more | Big Think',
    views: '135,495',
    viewsShort: '135K',
    date: '29 Jun 2020',
    dateRelative: '1 week ago',
    duration: '16:51'
  },
  {
    id: '124',
    title: 'Introduction to Big O Notation and Time Complexity (Data Structures & Algorithms #7)',
    views: '794,166',
    viewsShort: '794K',
    date: '13 May 2018',
    dateRelative: '2 years ago',
    duration: '36:22'
  },
  {
    id: '125',
    title: 'Kotlin Course - Tutorial for Beginners',
    views: '323,140',
    viewsShort: '323K',
    date: '12 Jul 2019',
    dateRelative: '11 months ago',
    duration: '2:38:31'
  },
  {
    id: '126',
    title: 'Deep Learning State of the Art (2020) | MIT Deep Learning Series',
    views: '618,607',
    viewsShort: '618K',
    date: '10 Jan 2020',
    dateRelative: '5 months ago',
    duration: '1:27:42'
  },
  {
    id: '127',
    title: 'But what is a Neural Network? | Deep learning, chapter 1',
    views: '7,281,816',
    viewsShort: '7.2M',
    date: '5 Oct 2017',
    dateRelative: '2 years ago',
    duration: '19:13'
  },
  {
    id: '128',
    title: 'Vue.js: The Documentary',
    views: '570,554',
    viewsShort: '567K',
    date: '24 Feb 2020',
    dateRelative: '4 months ago',
    duration: '34:45'
  },
  {
    id: '129',
    title: 'Jake Archibald: In The Loop - JSConf.Asia',
    views: '249,023',
    viewsShort: '249K',
    date: '9 Feb 2018',
    dateRelative: '2 years ago',
    duration: '35:12'
  },
  {
    id: '130',
    title: 'CSS Pseudo-classes: in 100 Seconds',
    views: '26,645',
    viewsShort: '26K',
    date: '8 Jun 2020',
    dateRelative: '1 month ago',
    duration: '1:59'
  },
  {
    id: '131',
    title: 'Firebase - Ultimate Beginner\'s Guide',
    views: '439,278',
    viewsShort: '438K',
    date: '27 Feb 2018',
    dateRelative: '2 years ago',
    duration: '21:45'
  },
  {
    id: '132',
    title: 'What is Node js?',
    views: '259,218 views',
    viewsShort: '258K',
    date: '23 Jan 2018',
    dateRelative: '2 years ago',
    duration: '3:43'
  },
  {
    id: '133',
    title: 'Concentration Music for Programming \\ Gamedev',
    views: '430,000',
    viewsShort: '430K',
    date: '6 Feb 2018',
    dateRelative: '2 years ago',
    duration: '1:01:15'
  },
  {
    id: '134',
    title: 'Best Drum & Bass Mix 2020 (Melodic/Liquid Drum and Bass)',
    views: '306,152',
    viewsShort: '306K',
    date: '16 May 2020',
    dateRelative: '1 month ago',
    duration: '2:28:39'
  },
  {
    id: '135',
    title: '[2020 GSL S1] RO4 Match1 TY vs PartinG',
    views: '230,980',
    viewsShort: '230K',
    date: '27 May 2020',
    dateRelative: '1 month ago',
    duration: '2:03:10'
  },
  {
    id: '136',
    title: 'Half an Orange & Saxsquatch - Around the World [Monstercat Release]',
    views: '28,916',
    viewsShort: '27K',
    date: '4 Jul 2020',
    dateRelative: '6 days ago',
    duration: '2:58'
  },
  {
    id: '137',
    title: '“Gaming Web Browser”… R U kidding me?',
    views: '2,181,375',
    viewsShort: '2.1M',
    date: '6 Feb 2020',
    dateRelative: '5 months ago',
    duration: '1:27:42'
  },
  {
    id: '138',
    title: 'How I Made My Own iPhone - in China',
    views: '23,878,097',
    viewsShort: '23M',
    date: '12 Apr 2017',
    dateRelative: '3 years ago',
    duration: '23:49'
  },
  {
    id: '139',
    title: 'Control OBS With Twitch Channel Points, Subs!',
    views: '17,081',
    viewsShort: '16K',
    date: '29 Mar 2020',
    dateRelative: '3 months ago',
    duration: '1:27:42'
  },
  {
    id: '140',
    title: 'วิธีดูหน้าตา Sticker ที่ผู้ใช้ส่งเข้ามาผ่าน LINE Chatbot - LINE Developers Secret Tips #3',
    views: '193',
    viewsShort: '193',
    date: '7 Jul 2020',
    dateRelative: '2 days ago',
    duration: '5:06'
  },
  {
    id: '141',
    title: 'Viewing Party & Awards (NU x LINE Mentorship Programme)',
    views: '983',
    viewsShort: '983',
    date: '1 May 2020',
    dateRelative: '2 months ago',
    duration: '4:02:57'
  },
  {
    id: '142',
    title: 'Football to the Face in Slow motion - The Slow Mo Guys',
    views: '16,277,679',
    viewsShort: '16M',
    date: '28 Nov 2010',
    dateRelative: '9 years ago',
    duration: '1:23'
  }
]

const main = async () => {
  const batch = db.batch()
  videos.forEach(v => batch.set(db.collection('videos').doc(v.id), v))

  await batch.commit()
  console.log(`Saved ${videos.length} videos`)

  const p = process as { exit(code: number): void}
  p.exit(0)
}

main().catch(err => console.error(err))
