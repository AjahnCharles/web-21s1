<template>
  <div id="app">
    <div class="nav">
      <span class="brand">
        <router-link :to="{ name: 'Home' }">DBTube &amp; Book Shop </router-link>
      </span>
      <span class="auth">
        <router-link :to="{ name: 'Home' }">Book search </router-link>
      </span>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
