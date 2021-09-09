import { keyBy } from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Book {
  title: string
  description:string
  isbn13: string
  pages: number
  authors: string[]
  rating: number
  price: number
}

const getRandomPrice = (): number => Math.floor(Math.random() * 3000)
const getRandomRating = (): number => (Math.floor(Math.random() * 2.5) + 8) / 2

const books: Book[] = [
  {
    title: 'Seven Languages in Seven Weeks',
    description: 'You should learn a programming language every year, as recommended by The Pragmatic Programmer. But if one per year is good, how about Seven Languages in Seven Weeks? In this book you\'ll get a hands-on tour of Clojure, Haskell, Io, Prolog, Scala, Erlang, and Ruby. Whether or not your favorite language is on that list, you\'ll broaden your perspective of programming by examining these languages side-by-side. You\'ll learn something new from each, and best of all, you\'ll learn how to learn a language quickly.',
    isbn13: '978-1934356593',
    pages: 328,
    authors: ['Bruce Tate'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Seven More Languages in Seven Weeks: Languages That Are Shaping the Future',
    description: 'Great programmers aren\'t born--they\'re made. The industry is moving from object-oriented languages to functional languages, and you need to commit to radical improvement. New programming languages arm you with the tools and idioms you need to refine your craft. While other language primers take you through basic installation and "Hello, World," we aim higher. Each language in Seven More Languages in Seven Weeks will take you on a step-by-step journey through the most important paradigms of our time. You\'ll learn seven exciting languages: Lua, Factor, Elixir, Elm, Julia, MiniKanren, and Idris.',
    isbn13: '978-1941222157',
    pages: 350,
    authors: ['Bruce Tate', 'Ian Dees', 'Frederic Daoud', 'Jack Moffitt'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Designing Elixir Systems With OTP',
    description: 'You know how to code in Elixir; now learn to think in it. Learn to design libraries with intelligent layers that shape the right data structures, flow from one function into the next, and present the right APIs. Embrace the same OTP that\'s kept our telephone systems reliable and fast for over 30 years. Move beyond understanding the OTP functions to knowing what\'s happening under the hood, and why that matters. Using that knowledge, instinctively know how to design systems that deliver fast and resilient services to your users, all with an Elixir focus. Elixir is gaining mindshare as the programming language you can use to keep you software running forever, even in the face of unexpected errors and an ever growing need to use more processors. This power comes from an effective programming language, an excellent foundation for concurrency and its inheritance of a battle-tested framework called the OTP.',
    isbn13: '978-1680506617',
    pages: 250,
    authors: ['Bruce Tate', 'James Edward Gray Ii'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Programming Elixir 1.6',
    description: 'This book is the introduction to Elixir for experienced programmers, completely updated for Elixir 1.6 and beyond. Explore functional programming without the academic overtones (tell me about monads just one more time). Create concurrent applications, but get them right without all the locking and consistency headaches. Meet Elixir, a modern, functional, concurrent language built on the rock-solid Erlang VM. Elixir\'s pragmatic syntax and built-in support for metaprogramming will make you productive and keep you interested for the long haul. Maybe the time is right for the Next Big Thing. Maybe it\'s Elixir. Functional programming techniques help you manage the complexities of today\'s real-world, concurrent systems; maximize uptime; and manage security.',
    isbn13: '978-1680502992',
    pages: 398,
    authors: ['Dave Thomas'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Programming in Scala',
    description: 'Coauthored by the designer of the Scala language, this authoritative book will teach you, one step at a time, the Scala language and the ideas behind it.The book is carefully crafted to help you learn. The first few chapters will give you enough of the basics that you can already start using Scala for simple tasks. The entire book is organized so that each new concept builds on concepts that came beforea series of steps that promises to help you master the Scala language and the important ideas about programming that Scala embodies. A comprehensive tutorial and reference for Scala, this book covers the entire language and important libraries.',
    isbn13: '978-0981531618',
    pages: 896,
    authors: ['Martin Odersky', 'Lex Spoon', 'Bill Venners'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Scala for the Impatient',
    description: 'Interest in the Scala programming language continues to grow for many reasons. Scala embraces the functional programming style without abandoning the object-oriented paradigm, and it allows you to write programs more concisely than in Java. Because Scala runs on the JVM, it can access any Java library and is interoperable with familiar Java frameworks. Scala also makes it easier to leverage the full power of concurrency.',
    isbn13: '978-0134540566',
    pages: 384,
    authors: ['Cay Horstmann'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Learn You Some Erlang for Great Good',
    description: 'Erlang is the language of choice for programmers who want to write robust, concurrent applications, but its strange syntax and functional design can intimidate the uninitiated. Luckily, there\'s a new weapon in the battle against Erlang-phobia: Learn You Some Erlang for Great Good!',
    isbn13: '978-1593274351',
    pages: 624,
    authors: ['Fred Hebert'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Learn You a Haskell for Great Good',
    description: 'It\'s all in the name: Learn You a Haskell for Great Good! is a hilarious, illustrated guide to this complex functional language. Packed with the author\'s original artwork, pop culture references, and most importantly, useful example code, this book teaches functional fundamentals in a way you never thought possible. You\'ll start with the kid stuff: basic syntax, recursion, types and type classes. Then once you\'ve got the basics down, the real black belt master-class begins: you\'ll learn to use applicative functors, monads, zippers, and all the other mythical Haskell constructs you\'ve only read about in storybooks.',
    isbn13: '978-1593272838',
    pages: 400,
    authors: ['Miran Lipovaca'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Property-Based Testing with PropEr, Erlang, and Elixir',
    description: 'Property-based testing helps you create better, more solid tests with little code. By using the PropEr framework in both Erlang and Elixir, this book teaches you how to automatically generate test cases, test stateful programs, and change how you design your software for more principled and reliable approaches. You will be able to better explore the problem space, validate the assumptions you make when coming up with program behavior, and expose unexpected weaknesses in your design. PropEr will even show you how to reproduce the bugs it found. With this book, you will be writing efficient property-based tests in no time.',
    isbn13: '978-1680506211',
    pages: 250,
    authors: ['Fred Hebert'],
    rating: getRandomRating(),
    price: getRandomPrice()
  },
  {
    title: 'Erlang Programming',
    description: 'This book is an in-depth introduction to Erlang, a programming language ideal for any situation where concurrency, fault tolerance, and fast response is essential. Erlang is gaining widespread adoption with the advent of multi-core processors and their new scalable approach to concurrency. With this guide you\'ll learn how to write complex concurrent programs in Erlang, regardless of your programming background or experience.',
    isbn13: '978-0596518189',
    pages: 498,
    authors: ['Francesco Cesarini', 'Simon Thompson'],
    rating: getRandomRating(),
    price: getRandomPrice()
  }
]

export interface Store {
  books: Book[],
  cartIsbn13s: string[]
}

export default new Vuex.Store<Store>({
  state: {
    books: books,
    cartIsbn13s: [
      '978-0134540566',
      '978-1593274351',
      '978-1934356593',
      '978-0596518189',
      '978-1680502992'
    ]
  },
  getters: {
    booksByIsbn13: (state) => keyBy(state.books, 'isbn13'),
    bookByIsbn13: (_state, getters) => (isbn13: string) => getters.booksByIsbn13[isbn13],
    cart: (state, getters) => state.cartIsbn13s.map(isbn13 => getters.booksByIsbn13[isbn13])
  }
})
