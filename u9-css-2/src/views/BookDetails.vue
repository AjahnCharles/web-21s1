<template>
  <div class="book-details">
    <section class="section">
      <div class="columns is-variable is-4">
        <div
          class="
            column
            has-text-centered
            is-full is-two-fifths-tablet is-one-third-widescreen
          "
        >
          <img :src="`/images/books/${book.isbn13}.jpg`" :alt="book.title" />
        </div>
        <div class="column">
          <h1
            class="is-size-2 has-text-weight-semibold has-text-centered-mobile"
          >
            {{ book.title }}
          </h1>
          <p
            class="
              is-size-4
              has-text-weight-light has-text-centered-mobile
              mt-3
            "
          >
            {{ book.authors.join(', ') }}
          </p>
          <div class="columns is-variable is-2 mt-3">
            <div class="column is-narrow py-2">
              <b-button class="is-primary" size="is-medium" expanded outlined>
                Add to Cart
              </b-button>
            </div>
            <div class="column is-narrow py-2">
              <b-button class="is-primary" size="is-medium" expanded>
                Buy Now
              </b-button>
            </div>
          </div>
          <p class="mt-4">{{ book.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Book } from '@/store'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class BookDetails extends Vue {
  get book (): Book {
    return this.$store.getters.bookByIsbn13(this.$route.params.isbn13)
  }
}
</script>
