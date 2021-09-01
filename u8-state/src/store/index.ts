import { db } from '@/_services/firebase-initialized'
import { keyBy } from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { Video } from './models'

Vue.use(Vuex)

export interface Store {
  videos: Video[]
  watchLater: string[]
}

const store = new Vuex.Store<Store>({
  state: {
    videos: [],
    watchLater: []
  },
  getters: {
    videosById: state => keyBy(state.videos, 'id'),
    watchLaterCount: state => state.watchLater.length,
    watchLaterFull: (state, getters) => state.watchLater.map(
      id => getters.videosById[id]
    )
  },
  mutations: {
    ...vuexfireMutations,
    'watchLater/push': (state, id: string) => {
      if (state.watchLater.includes(id)) return
      state.watchLater.push(id)
    },
    'watchLater/splice': (state, id: string) => {
      const index = state.watchLater.indexOf(id)
      if (index === -1) return
      state.watchLater.splice(index, 1)
    }
  },
  actions: {
    init: firestoreAction(({ bindFirestoreRef }) => Promise.all([
      bindFirestoreRef('videos', db.collection('videos'))
    ])),
    addToWatchLater: ({ commit }, id: string) => commit('watchLater/push', id),
    removeFromWatchLater: ({ commit }, id: string) => commit('watchLater/splice', id)
  },
  modules: { }
})

store.dispatch('init')
export default store
