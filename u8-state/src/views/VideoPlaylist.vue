<template>
  <div class="playlist">
    <router-link
      v-for="video in videos"
      :key="`playlist-${video.id}`"
      :to="{ name: 'VideoPlayer', params: { videoId: video.id } }"
      class="playlist-row"
    >
      <VideoCard :video="video" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Video } from '@/store/models'
import Vue from 'vue'
import Component from 'vue-class-component'
import VideoCard from './VideoCard.vue'

@Component({ components: { VideoCard } })
export default class VideoPlaylist extends Vue {
  videos: Video[] = []
}
</script>

<style scoped>
.playlist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 1rem;
}
</style>
