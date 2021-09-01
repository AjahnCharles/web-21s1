<template>
  <div class="playback">
    <div class="playback-player" v-if="video">
      <img :src="`/images/videos/${video.id}.webp`" :alt="video.id" />
      <h3>{{ video.title }}</h3>
      <p class="stats">{{ video.views }} views · {{ video.date }}</p>
    </div>
    <div class="playback-videos">
      <VideoTease
        v-for="suggestion in suggestions"
        :key="`player-suggestion-${suggestion.id}`"
        :video="suggestion"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Video } from '@/store/models'
import VideoTease from './VideoTease.vue'

@Component({ components: { VideoTease } })
export default class VideoPlayer extends Vue {
  video: Video | null = null
  suggestions: Video[] = []
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
