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
