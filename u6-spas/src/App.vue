<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Colors' }">Colors</router-link> |
      <router-link :to="{ name: 'ProfileEdit' }">Edit Profile</router-link> |
      <router-link :to="{ name: 'Converter' }">Converter</router-link>
    </div>
    <router-view />
  </div>
</template>
