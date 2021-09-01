<template>
  <router-link
    :to="{ name: 'VideoPlayer', params: { videoId: video.id } }"
    class="next-card"
  >
    <div>
      <img
        :src="`/images/videos/${video.id}.webp`"
        :alt="video.id"
        class="thumb"
      />
      <img
        @click.prevent="addToWatchLater(video.id)"
        class="watch-later"
        src="/images/icons/playlist-plus.png"
        alt="Add to watch later"
      />
    </div>
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
export default class VideoTease extends Vue {
  addToWatchLater (videoId: string): void {
    this.$store.dispatch('addToWatchLater', videoId)
  }
}
</script>

<style scoped>
.next-card {
  display: flex;
  color: #444444;
  text-decoration: none;
  margin: 0 0 16px 0;
}

.next-card > div {
  position: relative;
  flex: 0 0 150px;
  margin: 0 12px 0 0;
  border: 0;
}

.thumb {
  display: block;
  width: 100%;
}

.watch-later {
  position: absolute;
  width: 1.25rem;
  top: 0;
  right: 0;
  padding: 0.25rem;
  filter: invert();
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
