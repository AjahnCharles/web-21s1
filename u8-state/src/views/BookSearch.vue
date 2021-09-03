<template>
  <div class="books">
    <input type="text" v-model="q" placeholder="🔍  Search books" />

    <div class="results">
      <BookCard
        v-for="book in books"
        :key="`book-search-${book.isbn13}`"
        :book="book"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Book } from '@/store/models'
import Vue from 'vue'
import Component from 'vue-class-component'
import BookCard from './BookCard.vue'

@Component({ components: { BookCard } })
export default class BookSearch extends Vue {
  q = ''

  get books (): Book[] {
    const qLower = this.q.toLowerCase()
    return this.$store.state.books.filter((book: Book) =>
      book.title.toLowerCase().includes(qLower) ||
      book.authors.some(author => author.toLowerCase().includes(qLower)) ||
      book.description.toLowerCase().includes(qLower)
    )
  }
}
</script>

<style scoped>
.books {
  padding: 0.5rem 1rem;
}

input {
  font-size: 1.5rem;
  padding: 0.5rem;
  font-family: 'Helvetica Neue', sans-serif;
}

input::-webkit-input-placeholder {
  font-weight: 200;
  color: #afb2b3;
}

input::-moz-placeholder {
  font-weight: 200;
  color: #afb2b3;
}

input::-ms-input-placeholder {
  font-weight: 200;
  color: #afb2b3;
}

.results {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  grid-gap: 1rem;
}
</style>
