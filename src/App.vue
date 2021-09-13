<template>
  <m-header :short-video="$shortVideo"></m-header>
  <router-view @video-event="videoPageHandle"></router-view>
  <m-footer v-show="!$shortVideo"></m-footer>
  <play-bar v-show="!$shortVideo"></play-bar> 
</template>

<script setup>
import MHeader from './views/header/header.vue'
import MFooter from './views/footer/footer.vue'
import PlayBar from './components/playBar/playBar.vue'
import { ref, onMounted } from 'vue'

// $shortVideo 短视频页
const $shortVideo = ref(false)

const videoPageHandle = (state) => {
  $shortVideo.value = state
}

onMounted(() => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`) 
  })
})
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
  font-size: .14rem;
  font: 400 12px/1.5 HarmonyOS_Regular,-apple-system,sans-serif;
}
body {
  margin: 0;
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
.flex-box {
  display: flex;
}
.gird-box {
  display: grid;
}
</style>
