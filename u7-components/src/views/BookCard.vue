<template>
  <router-link
    :to="{ name: 'BookDetails', params: { isbn13: book.isbn13 } }"
    class="book-card"
  >
    <img :src="`/images/books/${book.isbn13}.jpg`" :alt="book.title" />
    <p>⭐ {{ book.rating.toFixed(1) }}</p>
    <p>{{ book.title }}</p>
    <p>{{ book.price.toLocaleString() }} THB</p>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ props: ['book'] })
export default class BookCard extends Vue { }
</script>

<style scoped>
a {
  text-decoration: none;
}
img {
  width: 100%;
  aspect-ratio: 0.75;
  object-fit: cover;
}
.book-card {
  width: 100%;
  min-width: 6rem;
  box-sizing: border-box;
  border: 1px solid #f8f8f8;
  font-size: 0.8rem;
}
.book-card p {
  margin: 0.35rem 0.5rem 0.5rem;
}
</style>
