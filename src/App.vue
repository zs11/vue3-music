<template>
  <m-header :short-video="shortVideoStatus" v-show="headerStatus"></m-header>
  <router-view></router-view>
  <m-footer v-show="!shortVideoStatus"></m-footer>
  <play-bar v-show="!shortVideoStatus"></play-bar>
  <music-audio
    v-show="!shortVideoStatus"
    :url="musicUrl"
    @canplay="handleMusicCanPlay"
    @timeupdate="handleMusicTimeUpdate">
  </music-audio>
  <music-history v-if="musicHistoryStatus"></music-history>
</template>

<script setup>
import MHeader from './views/header/header.vue'
import MFooter from './views/footer/footer.vue'
import PlayBar from './components/playBar/playBar.vue'
import MusicAudio from './components/audio/audio.vue'
import MusicHistory from './components/playBar/history.vue'
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useStore } from "vuex";

// shortVideo 短视频页flag
const store = useStore()
const shortVideoStatus = computed(() => store.state.shortVideoStatus)
const headerStatus = computed(() => store.state.headerStatus)
const musicPlayerStatus = computed(() => store.state.musicPlayerStatus)
const playBarStyle = computed(() => store.state.playBarStyle)
const musicPlayerStyle = computed(() => store.state.musicPlayerStyle)
const setMusicPlayerStyle = (val) => store.commit('setMusicPlayerStyle', val)
const setPlayBarStyle = (val) => store.commit('setPlayBarStyle', val)
const musicBasic = computed(() => store.state.musicBasic)
const setPlayAudioStatus = (key, val) => store.commit('setPlayAudioStatus', { key, val })
const musicHistoryStatus = computed(() => store.state.musicHistoryStatus)

const handleBarAnimation = (event) => {
  if (event.target && event.target.className.indexOf('bar-fall') !== -1) {
    setMusicPlayerStyle('rise')
  }
}

const handlePlayerAnimation = (event) => {
  if (event.target && event.target.className.indexOf('fall') !== -1) {
    setPlayBarStyle('bar-rise')
  }
}

onMounted(() => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`) 
  })
})

// music url
const musicUrl = computed(() => musicBasic.value.musicUrl)

// music evnet
const handleMusicCanPlay = (duration) => {
  if (!Number.isNaN(duration)) {
    setPlayAudioStatus('duration', duration)
  }
}

const handleMusicTimeUpdate = (current) => {
  if (!Number.isNaN(current)) {
    setPlayAudioStatus('current', current)
  }
}
</script>

<style>
@import './assets/css/font.css';

html {
  font-size: calc(100vw / 3.75);
}
blockquote, body, dd, dl, figure, form, h1, h2, h3, h4, h5, h6, hr, input, ol, p, td, textarea, th, ul { 
  margin:0;
  padding:0
}
h1, h2, h3, h4, h5, h6 { 
  font-size:100%;
  font-weight:300
}
body {
  font: 400 12px/1.5 HarmonyOS_Regular,-apple-system,sans-serif;
  font-size: .1rem;
}
body {
  margin: 0;
}
html, body, #app {
  height: 100%;
}
a {
  text-decoration: none;
}
.bg-1 {
  background-color: #fafafa;
}
.bg-2 {
  background-color: #fff;
}
.bg-3 {
  background-color: #f2f2f2;
}
.txt-1 {
  color: rgba(26, 26, 26, .5);
}
.txt-2 {
  color: rgba(26, 26, 26, 1);
}
.txt-3 {
  color: rgba(44, 162, 249, 1);
}
.txt-4 {
  color: rgba(255, 255, 255, 1);
}
.txt-5 {
  color: rgba(0, 0, 0, 1);
}
.flex-box {
  display: flex;
}
.gird-box {
  display: grid;
}
@media screen and (min-width: 1080px) {
  html {
    font-size: 160px;
  }
}
</style>
