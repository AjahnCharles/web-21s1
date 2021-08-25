<template>
  <router-link
    :to="{ name: 'VideoPlayer', params: { videoId: video.id } }"
    class="next-card"
  >
    <div><img :src="`/images/${video.id}.webp`" :alt="video.id" /></div>
    <div class="description">
      <p>{{ video.title }}</p>
      <p class="stats">
        {{ video.viewsShort }} views · {{ video.dateRelative }}
      </p>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ props: ['video'] })
export default class Home extends Vue { }
</script>

<style scoped>
.next-card {
  display: flex;
  color: #444444;
  text-decoration: none;
  margin: 0 0 16px 0;
}

.next-card > div {
  flex: 0 0 150px;
  margin: 0 12px 0 0;
  border: 0;
}

.next-card > div > img {
  display: block;
  width: 100%;
}

.next-card > div.description {
  flex: auto;
}

.next-card > div.description > p {
  margin: 0;
  padding: 2px 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  max-height: 3.9em;
}
</style>
