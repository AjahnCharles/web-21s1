<template>
  <div id="app">
    <b-navbar class="is-primary" wrapper-class="container">
      <template #brand>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Home' }"
          class="is-size-4"
        >
          <b-icon
            icon="book-open-page-variant"
            size="is-medium"
            class="mr-3"
          ></b-icon>
          <span class="is-primary">BEC Books</span>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          Search
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'BookDetails', params: { isbn13: '978-1593272838' } }"
        >
          Promo
        </b-navbar-item>
        <b-navbar-dropdown right>
          <template #label>
            <b-icon icon="cart" class="mr-1"></b-icon>
            <span class="is-size-4 has-text-weight-medium">2</span>
          </template>
          <b-navbar-item
            v-for="book in $store.getters.cart"
            :key="book.isbn13"
            tag="router-link"
            :to="{ name: 'BookDetails', params: { isbn13: book.isbn13 } }"
          >
            <img
              :src="`/images/books/${book.isbn13}.jpg`"
              :alt="book.title"
              class="mr-2"
            />
            <p>
              <span class="has-text-weight-semibold">{{ book.title }}</span>
              <br />
              {{ book.price.toLocaleString() }} THB
            </p>
          </b-navbar-item>
          <b-navbar-item class="mt-2 px-4">
            <b-button class="is-primary" expanded>Checkout</b-button>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.navbar-item img {
  max-height: 3rem;
  vertical-align: top;
}

.navbar-item p {
  display: inline-block;
}
</style>
