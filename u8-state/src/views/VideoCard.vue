<template>
  <router-link
    :to="{ name: 'VideoPlayer', params: { videoId: video.id } }"
    class="home-card"
  >
    <div>
      <img :src="`/images/videos/${video.id}.webp`" :alt="video.title" />
      <p>{{ video.duration }}</p>
    </div>
    <p>{{ video.title }}</p>
    <p class="stats">{{ video.viewsShort }} views · {{ video.dateRelative }}</p>
    <img
      @click.prevent="addToWatchLater(video.id)"
      class="watch-later"
      src="/images/icons/playlist-plus.png"
      alt="Add to watch later"
    />
    <img
      @click.prevent="removeFromWatchLater(video.id)"
      class="watch-later-remove"
      src="/images/icons/playlist-remove.png"
      alt="Add to watch later"
    />
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ props: ['video'] })
export default class VideoCard extends Vue {
  addToWatchLater (videoId: string): void {
    this.$store.dispatch('addToWatchLater', videoId)
  }

  removeFromWatchLater (videoId: string): void {
    this.$store.dispatch('removeFromWatchLater', videoId)
  }
}
</script>

<style scoped>
.home-card {
  position: relative;
  display: block;
  margin: 8px;
  background-color: #f5f5f5;
  color: #444444;
  border: 1px solid #efefef;
  text-decoration: none;
}

.home-card > div {
  position: relative;
}

.home-card > div > img {
  display: block;
  width: 100%;
}

.home-card > div > p {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 8px;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.25);
  color: #ffffff;
  font-size: 0.75rem;
}

.home-card > p {
  width: 100%;
  margin: 8px;
  padding: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  max-height: 2.6em;
}

.watch-later,
.watch-later-remove {
  position: absolute;
  height: 2rem;
  padding: 0.5rem;
  filter: invert();
}

.watch-later {
  top: 0;
  right: 0;
}

.watch-later-remove {
  top: 2rem;
  right: 0;
}
</style>
