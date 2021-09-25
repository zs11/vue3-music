import { toRef } from 'vue'
import { createStore, createLogger } from "vuex"
import { localStorageObj } from '../config/storage'

const debug = process.env.NODE_ENV !== 'production'

// 全局 state, getter, action, mutation

// musicPlayerStatus 播放页显示，musicStatus 音乐播放状态
const state = () => ({
  musicPlayerStatus: false,
  shortVideoStatus: false,
  playBarStyle: '',
  musicPlayerStyle: '',
  musicStatus: 'pause',
  musicProgressStatus: 0,
  musicHistory: localStorageObj.get('musicHistory', true) || [],
  audioRef: null,
  playAudioStatus: {
    duration: 0,
    current: 0
  },
  musicBasic: {
    id: -1,
    name: '',
    author: '',
    imgUrl: '',
    musicUrl: ''
  }
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
  },
  setMusicHistory (state, history) {
    let histories = state.musicHistory
    const lastHistory = histories[histories.length - 1]
    if (lastHistory && lastHistory.id === history.id) {
      return
    }
    if (histories.length > 30) {
      histories = histories.slice(1)
    }
    histories = histories.concat(history)
    state.musicHistory = histories
    localStorageObj.set('musicHistory', histories, true)
  },
  setMusicBasic (state, { key, val }) {
    state.musicBasic[key] = val
  },
  setAudioRef (state, ref) {
    state.audioRef = ref
  },
  setPlayAudioStatus (state, { key, val }) {
    state.playAudioStatus[key] = val
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