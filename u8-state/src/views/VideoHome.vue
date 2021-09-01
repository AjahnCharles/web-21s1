<template>
  <div class="home-videos">
    <VideoCard
      v-for="video in videos"
      :key="`home-card-${video.id}`"
      :video="video"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import VideoCard from './VideoCard.vue'

@Component({ components: { VideoCard }})
export default class VideoHome extends Vue { 
  videos: []
}
</script>

<style scoped>
.home-videos {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
