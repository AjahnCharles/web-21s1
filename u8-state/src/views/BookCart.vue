<template>
  <div>
    <table>
      <tr v-for="book in cart" :key="book.isbn13">
        <td>
          <img :src="`/images/books/${book.isbn13}.jpg`" :alt="book.title" />
        </td>
        <td>
          <p class="title">{{ book.title }}</p>
          <p>{{ book.authors.join(', ') }}</p>
        </td>
        <td>{{ book.price.toLocaleString() }} THB</td>
      </tr>
    </table>
    <p class="total">Total: {{ cartTotal.toLocaleString() }} THB</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
  computed: mapGetters(['cart', 'cartTotal'])
})
export default class BookCart extends Vue { }
</script>

<style scoped>
td {
  vertical-align: top;
  padding: 0.5rem;
}

img {
  width: 4rem;
}

p {
  margin: 0;
  padding: 0;
}

.title {
  font-size: 1.35rem;
  max-width: 25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.total {
  float: right;
  padding: 1rem;
  font-weight: bold;
}
</style>
