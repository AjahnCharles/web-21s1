<template>
  <div>
    <h1>Queued: {{ watchLaterFull.length }} / {{ videos.length }}</h1>
    <div class="playlist" v-if="watchLaterFull && videos">
      <router-link
        v-for="video in watchLaterFull"
        :key="`playlist-${video.id}`"
        :to="{ name: 'VideoPlayer', params: { videoId: video.id } }"
        class="playlist-row"
      >
        <VideoCard :video="video" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapState } from 'vuex'
import VideoCard from './VideoCard.vue'

@Component({
  components: { VideoCard },
  computed: {
    ...mapState(['videos', 'watchLater']),
    ...mapGetters(['watchLaterFull'])
  }
})
export default class VideoPlaylist extends Vue { }
</script>

<style scoped>
.playlist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 1rem;
}
</style>
