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
  musicHistoryStatus: false,
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
  },
  musicChange: false,
  headerStatus: true
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
  deleteMusicHistory (state, { type, idx }) {
    if (type === 'deleteAll') {
      state.musicHistory = []
      localStorageObj.set('musicHistory', [], true)
    } else if (type === 'deleteOne') {
      const newHistory = state.musicHistory.slice(0, idx).concat(state.musicHistory.slice(idx+1))
      state.musicHistory = newHistory
      localStorageObj.set('musicHistory', newHistory, true)
    }
  },
  setMusicHistoryStatus (state, status) {
    state.musicHistoryStatus = status
  },
  setMusicBasic (state, { key, val }) {
    state.musicBasic[key] = val
  },
  setAudioRef (state, ref) {
    state.audioRef = ref
  },
  setPlayAudioStatus (state, { key, val }) {
    state.playAudioStatus[key] = val
  },
  setMusicChange (state, status) {
    state.musicChange = status
  },
  setHeaderStatus (state, status) {
    state.headerStatus = status
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