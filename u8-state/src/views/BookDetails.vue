<template>
  <div class="book-details" v-if="book">
    <img :src="`/images/books/${book.isbn13}.jpg`" :alt="book.title" />
    <button @click="addToCart(book.isbn13)">Add to Cart</button>
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
import Vue from 'vue'
import Component from 'vue-class-component'
import BookCard from './BookCard.vue'
import { Book } from '@/store/models'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

@Component({ components: { BookCard } })
export default class BookDetails extends Vue {
  get book (): Book | null {
    return this.$store.getters.booksByIsbn13[this.$route.params.isbn13] ?? null
  }

  get relatedBooks (): Book[] {
    const book = this.book
    if (!book) return []

    const keyterms = [...book.title.split(' '), ...book.authors.flatMap(a => a.split(' '))]
      .filter(word => word.length > 3)
    return this.$store.state.books.filter((b: Book) => b.isbn13 !== book.isbn13 && keyterms.some(term =>
      b.title.includes(term) ||
      b.authors.some(author => author.includes(term))
    ))
  }

  addToCart (isbn13: string): void {
    this.$store.dispatch('addToCart', isbn13)
  }
}
</script>

<style scoped>
.book-details {
  padding: 0.5rem 1rem;
}

button {
  display: block;
  font-size: 2rem;
  margin-top: 1rem;
  padding: 1rem;
  color: white;
  background-color: #333333;
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
