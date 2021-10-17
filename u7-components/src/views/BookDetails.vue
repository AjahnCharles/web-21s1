<template>
  <div class="book-details">
    <img :src="`/images/books/${book.isbn13}.jpg`" :alt="book.title" />
    <p>{{ book.description }}</p>

    <h2>You might also like...</h2>
    <div class="related">
      <BookCard
        v-for="book in relatedBooks"
        :key="`book-related-${book.isbn13}`"
        :book="book"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Route, NavigationGuardNext } from 'vue-router' 
import Vue from 'vue'
import Component from 'vue-class-component'
import { Book, getBook, getRelatedBooks } from '@/_services/fakeapi'
import BookCard from './BookCard.vue'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
@Component({ components: { BookCard } })
export default class BookDetails extends Vue {
  book: Book | null = null
  relatedBooks: Book[] = []
  created (): void {
    this.loadData(this.$route.params.isbn13)
  }
  
  beforeRouteUpdate (to: Route, _from: Route, next: NavigationGuardNext): void {
    this.loadData(to.params.isbn13)
    next()
  }
  
  loadData (isbn13: string): void {
    this.book = getBook(isbn13)
    this.relatedBooks = getRelatedBooks(this.book)
  }
}
</script>
<style scoped>
.book-details {
  padding: 0.5rem 1rem;
}
.related {
  padding-top: 1rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 10rem;
  grid-gap: 1rem;
  max-width: 100%;
  overflow-x: scroll;
}
</style>
