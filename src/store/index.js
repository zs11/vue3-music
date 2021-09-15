import { createStore, createLogger } from "vuex"

const debug = process.env.NODE_ENV !== 'production'

// 全局 state, getter, action, mutation

const state = () => ({
  musicPlayerStatus: false,
  shortVideoStatus: false,
  playBarStyle: '',
  musicPlayerStyle: ''
})

const getters = {}

const actions = {}

const mutations = {
  setMusicPlayerStatus (state, status) {
    state.musicPlayerStatus = status
  },
  setShortVideoStatus (state, status) {
    state.shortVideoStatus = status
  },
  setPlayBarStyle (state, style) {
    state.playBarStyle = style
  },
  setMusicPlayerStyle (state, style) {
    state.musicPlayerStyle = style
  },
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
})