import { createStore, createLogger } from "vuex"

const debug = process.env.NODE_ENV !== 'production'

// 全局 state, getter, action, mutation

// musicPlayerStatus 播放页显示，musicStatus 音乐播放状态
const state = () => ({
  musicPlayerStatus: false,
  shortVideoStatus: false,
  playBarStyle: '',
  musicPlayerStyle: '',
  musicStatus: 'pause',
  musicProgressStatus: 0
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
  setMusicStatus (state, status) {
    state.musicStatus = status
  },
  setMusicProgressStatus (state, status) {
    state.musicProgressStatus = status
  } 
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {},
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})