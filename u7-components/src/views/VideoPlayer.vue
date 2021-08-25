<template>
  <div class="playback">
    <div class="playback-player">
      <img :src="`/images/${video.id}.webp`" :alt="video.id" />
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
import type { Route, NavigationGuardNext } from 'vue-router'
import Vue from 'vue'
import Component from 'vue-class-component'
import { getVideo, getSuggestions, Video } from '@/_services/fakeapi'
import VideoTease from './VideoTease.vue'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

@Component({ components: { VideoTease } })
export default class VideoPlayer extends Vue {
  video: Video | null = null
  suggestions: Video[] = []

  created (): void {
    this.loadData(this.$route.params.videoId)
  }

  beforeRouteUpdate (to: Route, _from: Route, next: NavigationGuardNext): void {
    this.loadData(to.params.videoId)
    next()
  }

  loadData (id: string): void {
    this.video = getVideo(id)
    this.suggestions = getSuggestions(7).filter(video => video.id !== id).slice(0, 6)
  }
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
