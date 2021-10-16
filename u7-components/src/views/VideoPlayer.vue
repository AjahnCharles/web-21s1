<template>
  <div class="playback">
    <div class="playback-player">
      <img :src="`/images/${video.id}.webp`" :alt="video.id" />
      <h3>{{ video.title }}</h3>
      <p class="stats">{{ video.views }} views · {{ video.date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getVideo, Video } from '@/_services/fakeapi'
@Component
export default class VideoPlayer extends Vue {
  video: Video | null = null
  created (): void { this.loadData(this.$route.params.videoId) }
  loadData (id: string): void { this.video = getVideo(id) }
}
</script>

<style scoped>
.playback {
  display: flex;
}
.playback-player {
  flex: 1 0 600px;
  margin: 0 12px 0 0;
}
.playback-videos {
  flex: 0 0 400px;
}
.playback-player > img {
  display: block;
  width: 100%;
}
</style>
