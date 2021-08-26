<template>
  <div id="app">
    <div class="nav">
      <span class="brand">
        <router-link :to="{ name: 'Home' }">DBTube &amp; Book Shop</router-link>
      </span>
      <router-link :to="{ name: 'BookSearch' }" class="auth"
        >Book search</router-link
      >
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
