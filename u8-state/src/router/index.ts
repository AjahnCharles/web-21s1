import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import VideoHome from '@/views/VideoHome.vue'
import VideoPlayer from '@/views/VideoPlayer.vue'
import VideoPlaylist from '@/views/VideoPlaylist.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/videos'
  },
  {
    path: '/videos',
    name: 'VideoHome',
    component: VideoHome
  },
  {
    path: '/videos/:videoId',
    name: 'VideoPlayer',
    component: VideoPlayer
  },
  {
    path: '/videos/playlists/:slug',
    name: 'VideoPlaylist',
    component: VideoPlaylist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
