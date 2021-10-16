<template>
  <div id="app">
    <div class="nav">
      <span class="brand">
        <router-link :to="{ name: 'Home' }">DBTube</router-link>
      </span>
      <span class="auth">Login</span>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
