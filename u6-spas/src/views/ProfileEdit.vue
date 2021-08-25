<template>
  <div class="profile-edit">
    <div>
      <h1>{{ name }}</h1>
      <p>{{ tagline }}</p>
      <img :src="picUrl" height="200" />
    </div>
    <div>
      <input type="text" v-model="name" />
      <input type="text" v-model="tagline" />
      <input type="text" v-model="picUrl" />
    </div>
  </div>
</template>

<style scoped>
.profile-edit {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

input {
  display: block;
  width: 100%;
  margin-top: 1rem;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ProfileEdit extends Vue {
  name = 'Charles Allen'
  tagline = 'Health; Happiness; Excellence'
  picUrl = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'
}
</script>
