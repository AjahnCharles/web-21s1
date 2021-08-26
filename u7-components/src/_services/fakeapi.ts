import { mapValues } from 'lodash'

export interface Video {
  id: string
  title: string
  views: string
  viewsShort: string
  date: string
  dateRelative: string
  duration: string
}

export interface Book {
  title: string
  description:string
  isbn13: string
  pages: number
  authors: string[]
  rating: number
  price: number
}

const videos: Record<string, Video> = {
  123: {
    id: '123',
    title: 'Is AI a species-level threat to humanity? | Elon Musk, Michio Kaku, Steven Pinker & more | Big Think',
    views: '135,495',
    viewsShort: '135K',
    date: '29 Jun 2020',
    dateRelative: '1 week ago',
    duration: '16:51'
  },
  124: {
    id: '124',
    title: 'Introduction to Big O Notation and Time Complexity (Data Structures & Algorithms #7)',
    views: '794,166',
    viewsShort: '794K',
    date: '13 May 2018',
    dateRelative: '2 years ago',
    duration: '36:22'
  },
  125: {
    id: '125',
    title: 'Kotlin Course - Tutorial for Beginners',
    views: '323,140',
    viewsShort: '323K',
    date: '12 Jul 2019',
    dateRelative: '11 months ago',
    duration: '2:38:31'
  },
  126: {
    id: '126',
    title: 'Deep Learning State of the Art (2020) | MIT Deep Learning Series',
    views: '618,607',
    viewsShort: '618K',
    date: '10 Jan 2020',
    dateRelative: '5 months ago',
    duration: '1:27:42'
  },
  127: {
    id: '127',
    title: 'But what is a Neural Network? | Deep learning, chapter 1',
    views: '7,281,816',
    viewsShort: '7.2M',
    date: '5 Oct 2017',
    dateRelative: '2 years ago',
    duration: '19:13'
  },
  128: {
    id: '128',
    title: 'Vue.js: The Documentary',
    views: '570,554',
    viewsShort: '567K',
    date: '24 Feb 2020',
    dateRelative: '4 months ago',
    duration: '34:45'
  },
  129: {
    id: '129',
    title: 'Jake Archibald: In The Loop - JSConf.Asia',
    views: '249,023',
    viewsShort: '249K',
    date: '9 Feb 2018',
    dateRelative: '2 years ago',
    duration: '35:12'
  },
  130: {
    id: '130',
    title: 'CSS Pseudo-classes: in 100 Seconds',
    views: '26,645',
    viewsShort: '26K',
    date: '8 Jun 2020',
    dateRelative: '1 month ago',
    duration: '1:59'
  },
  131: {
    id: '131',
    title: 'Firebase - Ultimate Beginner\'s Guide',
    views: '439,278',
    viewsShort: '438K',
    date: '27 Feb 2018',
    dateRelative: '2 years ago',
    duration: '21:45'
  },
  132: {
    id: '132',
    title: 'What is Node js?',
    views: '259,218 views',
    viewsShort: '258K',
    date: '23 Jan 2018',
    dateRelative: '2 years ago',
    duration: '3:43'
  },
  133: {
    id: '133',
    title: 'Concentration Music for Programming \\ Gamedev',
    views: '430,000',
    viewsShort: '430K',
    date: '6 Feb 2018',
    dateRelative: '2 years ago',
    duration: '1:01:15'
  },
  134: {
    id: '134',
    title: 'Best Drum & Bass Mix 2020 (Melodic/Liquid Drum and Bass)',
    views: '306,152',
    viewsShort: '306K',
    date: '16 May 2020',
    dateRelative: '1 month ago',
    duration: '2:28:39'
  },
  135: {
    id: '135',
    title: '[2020 GSL S1] RO4 Match1 TY vs PartinG',
    views: '230,980',
    viewsShort: '230K',
    date: '27 May 2020',
    dateRelative: '1 month ago',
    duration: '2:03:10'
  },
  136: {
    id: '136',
    title: 'Half an Orange & Saxsquatch - Around the World [Monstercat Release]',
    views: '28,916',
    viewsShort: '27K',
    date: '4 Jul 2020',
    dateRelative: '6 days ago',
    duration: '2:58'
  },
  137: {
    id: '137',
    title: '“Gaming Web Browser”… R U kidding me?',
    views: '2,181,375',
    viewsShort: '2.1M',
    date: '6 Feb 2020',
    dateRelative: '5 months ago',
    duration: '1:27:42'
  },
  138: {
    id: '138',
    title: 'How I Made My Own iPhone - in China',
    views: '23,878,097',
    viewsShort: '23M',
    date: '12 Apr 2017',
    dateRelative: '3 years ago',
    duration: '23:49'
  },
  139: {
    id: '139',
    title: 'Control OBS With Twitch Channel Points, Subs!',
    views: '17,081',
    viewsShort: '16K',
    date: '29 Mar 2020',
    dateRelative: '3 months ago',
    duration: '1:27:42'
  },
  140: {
    id: '140',
    title: 'วิธีดูหน้าตา Sticker ที่ผู้ใช้ส่งเข้ามาผ่าน LINE Chatbot - LINE Developers Secret Tips #3',
    views: '193',
    viewsShort: '193',
    date: '7 Jul 2020',
    dateRelative: '2 days ago',
    duration: '5:06'
  },
  141: {
    id: '141',
    title: 'Viewing Party & Awards (NU x LINE Mentorship Programme)',
    views: '983',
    viewsShort: '983',
    date: '1 May 2020',
    dateRelative: '2 months ago',
    duration: '4:02:57'
  },
  142: {
    id: '142',
    title: 'Football to the Face in Slow motion - The Slow Mo Guys',
    views: '16,277,679',
    viewsShort: '16M',
    date: '28 Nov 2010',
    dateRelative: '9 years ago',
    duration: '1:23'
  }
}

const bookSearchIgnoredTerms = new Set(['the', 'and', 'a'])
const getSearchTermsBad = (book: Book): Set<string> =>
  new Set(
    [...book.authors.flatMap(a => a.split(' ')), ...book.title.split(' ')]
      .map(t => t.toLowerCase())
      .filter(t => !bookSearchIgnoredTerms.has(t))
  )
const getRandomPrice = (): number => Math.floor(Math.random() * 3000)
const getRandomRating = (): number => (Math.floor(Math.random() * 2.5) + 8) / 2

const books: Record<string, Book> = {
  '978-1934356593': {
    title: 'Seven Languages in Seven Weeks',
    description: 'You should learn a programming language every year, as recommended by The Pragmatic Programmer. But if one per year is good, how about Seven Languages in Seven Weeks? In this book you\'ll get a hands-on tour of Clojure, Haskell, Io, Prolog, Scala, Erlang, and Ruby. Whether or not your favorite language is on that list, you\'ll broaden your perspective of programming by examining these languages side-by-side. You\'ll learn something new from each, and best of all, you\'ll learn how to learn a language quickly.',
    isbn13: '978-1934356593',
    pages: 328,
    authors: ['Bruce Tate'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1941222157': {
    title: 'Seven More Languages in Seven Weeks: Languages That Are Shaping the Future',
    description: 'Great programmers aren\'t born--they\'re made. The industry is moving from object-oriented languages to functional languages, and you need to commit to radical improvement. New programming languages arm you with the tools and idioms you need to refine your craft. While other language primers take you through basic installation and "Hello, World," we aim higher. Each language in Seven More Languages in Seven Weeks will take you on a step-by-step journey through the most important paradigms of our time. You\'ll learn seven exciting languages: Lua, Factor, Elixir, Elm, Julia, MiniKanren, and Idris.',
    isbn13: '978-1941222157',
    pages: 350,
    authors: ['Bruce Tate', 'Ian Dees', 'Frederic Daoud', 'Jack Moffitt'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1680506617': {
    title: 'Designing Elixir Systems With OTP',
    description: 'You know how to code in Elixir; now learn to think in it. Learn to design libraries with intelligent layers that shape the right data structures, flow from one function into the next, and present the right APIs. Embrace the same OTP that\'s kept our telephone systems reliable and fast for over 30 years. Move beyond understanding the OTP functions to knowing what\'s happening under the hood, and why that matters. Using that knowledge, instinctively know how to design systems that deliver fast and resilient services to your users, all with an Elixir focus. Elixir is gaining mindshare as the programming language you can use to keep you software running forever, even in the face of unexpected errors and an ever growing need to use more processors. This power comes from an effective programming language, an excellent foundation for concurrency and its inheritance of a battle-tested framework called the OTP.',
    isbn13: '978-1680506617',
    pages: 250,
    authors: ['Bruce Tate', 'James Edward Gray Ii'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1680502992': {
    title: 'Programming Elixir 1.6',
    description: 'This book is the introduction to Elixir for experienced programmers, completely updated for Elixir 1.6 and beyond. Explore functional programming without the academic overtones (tell me about monads just one more time). Create concurrent applications, but get them right without all the locking and consistency headaches. Meet Elixir, a modern, functional, concurrent language built on the rock-solid Erlang VM. Elixir\'s pragmatic syntax and built-in support for metaprogramming will make you productive and keep you interested for the long haul. Maybe the time is right for the Next Big Thing. Maybe it\'s Elixir. Functional programming techniques help you manage the complexities of today\'s real-world, concurrent systems; maximize uptime; and manage security.',
    isbn13: '978-1680502992',
    pages: 398,
    authors: ['Dave Thomas'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-0981531618': {
    title: 'Programming in Scala',
    description: 'Coauthored by the designer of the Scala language, this authoritative book will teach you, one step at a time, the Scala language and the ideas behind it.The book is carefully crafted to help you learn. The first few chapters will give you enough of the basics that you can already start using Scala for simple tasks. The entire book is organized so that each new concept builds on concepts that came beforea series of steps that promises to help you master the Scala language and the important ideas about programming that Scala embodies. A comprehensive tutorial and reference for Scala, this book covers the entire language and important libraries.',
    isbn13: '978-0981531618',
    pages: 896,
    authors: ['Martin Odersky', 'Lex Spoon', 'Bill Venners'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-0134540566': {
    title: 'Scala for the Impatient',
    description: 'Interest in the Scala programming language continues to grow for many reasons. Scala embraces the functional programming style without abandoning the object-oriented paradigm, and it allows you to write programs more concisely than in Java. Because Scala runs on the JVM, it can access any Java library and is interoperable with familiar Java frameworks. Scala also makes it easier to leverage the full power of concurrency.',
    isbn13: '978-0134540566',
    pages: 384,
    authors: ['Cay Horstmann'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1593274351': {
    title: 'Learn You Some Erlang for Great Good',
    description: 'Erlang is the language of choice for programmers who want to write robust, concurrent applications, but its strange syntax and functional design can intimidate the uninitiated. Luckily, there\'s a new weapon in the battle against Erlang-phobia: Learn You Some Erlang for Great Good!',
    isbn13: '978-1593274351',
    pages: 624,
    authors: ['Fred Hebert'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1593272838': {
    title: 'Learn You a Haskell for Great Good',
    description: 'It\'s all in the name: Learn You a Haskell for Great Good! is a hilarious, illustrated guide to this complex functional language. Packed with the author\'s original artwork, pop culture references, and most importantly, useful example code, this book teaches functional fundamentals in a way you never thought possible. You\'ll start with the kid stuff: basic syntax, recursion, types and type classes. Then once you\'ve got the basics down, the real black belt master-class begins: you\'ll learn to use applicative functors, monads, zippers, and all the other mythical Haskell constructs you\'ve only read about in storybooks.',
    isbn13: '978-1593272838',
    pages: 400,
    authors: ['Miran Lipovaca'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-1680506211': {
    title: 'Property-Based Testing with PropEr, Erlang, and Elixir',
    description: 'Property-based testing helps you create better, more solid tests with little code. By using the PropEr framework in both Erlang and Elixir, this book teaches you how to automatically generate test cases, test stateful programs, and change how you design your software for more principled and reliable approaches. You will be able to better explore the problem space, validate the assumptions you make when coming up with program behavior, and expose unexpected weaknesses in your design. PropEr will even show you how to reproduce the bugs it found. With this book, you will be writing efficient property-based tests in no time.',
    isbn13: '978-1680506211',
    pages: 250,
    authors: ['Fred Hebert'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  '978-0596518189': {
    title: 'Erlang Programming',
    description: 'This book is an in-depth introduction to Erlang, a programming language ideal for any situation where concurrency, fault tolerance, and fast response is essential. Erlang is gaining widespread adoption with the advent of multi-core processors and their new scalable approach to concurrency. With this guide you\'ll learn how to write complex concurrent programs in Erlang, regardless of your programming background or experience.',
    isbn13: '978-0596518189',
    pages: 498,
    authors: ['Francesco Cesarini', 'Simon Thompson'],
    rating: getRandomRating(),
    price: getRandomPrice()
  }
}
const booksWithSearch = mapValues(books, (book: Book) => ({ ...book, searchTerms: getSearchTermsBad(book) }))

const shuffle = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const getVideo = (id: string): Video => videos[id]
export const getSuggestions = (count: number): Video[] => shuffle(Array.from(Object.values(videos))).splice(0, count)

export const getBook = (id: string): Book => books[id]
export const searchBooks = (terms: string): Book[] => {
  const termsLower = terms.split(' ').map(t => t.trim().toLowerCase()).filter(t => t.length > 0)
  if (termsLower.length === 0) return shuffle(Object.values(books))
  return Object.values(booksWithSearch).filter(book => termsLower.some(term => book.searchTerms.has(term) || book.title.toLowerCase().startsWith(term)))
}
export const getRelatedBooks = (book: Book | null): Book[] => book ? shuffle(searchBooks(Array.from(getSearchTermsBad(book)).join(' ')).filter(b => b.isbn13 !== book.isbn13)) : []
