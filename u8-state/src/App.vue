<template>
  <div id="app">
    <div class="nav">
      <span class="brand">
        <router-link :to="{ name: 'VideoHome' }">DBTube</router-link> /
        <router-link :to="{ name: 'BookSearch' }">Books</router-link>
      </span>
      <div>
        <router-link
          :to="{ name: 'VideoPlaylist', params: { slug: 'watch-later' } }"
        >
          <img src="/images/icons/playlist-play.png" alt="Watch Later" />{{
            $store.getters.watchLaterCount
          }}
        </router-link>
        <router-link :to="{ name: 'BookCart' }">
          <img src="/images/icons/cart-variant.png" alt="Cart" />{{
            $store.getters.cartCount
          }}
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
