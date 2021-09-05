<template>
  <header class="music-header" :class="{'video-header': shortVideo}">
    <section class="top-wrap flex-box" v-show="!shortVideo">
      <div class="top-music-logo flex-box">
        <img src="../../assets/img/music.png" alt="logo" class="logo-img">
        <img src="../../assets/img/title.png" alt="title" class="top-music-title">
      </div>
    </section>
    <section class="tab-wrap">
      <tab :tabs="tabs" :config="config"></tab>
    </section>
  </header>
</template>

<script setup>
import Tab from '../../components/tab/tab.vue'
import { defineProps, reactive, watch } from 'vue';

const props = defineProps({
  shortVideo: {
    type: Boolean,
    default: false
  }
})

const tabs = [
  {
    name: "推荐",
    path: '/recommend'
  },
  {
    name: "排行",
    path: '/top-list',
  },
  {
    name: "歌手",
    path: '/singer'
  },
  {
    name: "短视频",
    path: '/short-video'
  }
]

const config = reactive({
  divide: true,
  activeColor: 'rgba(44, 162, 249, 1)',
  router: true
})

watch(() => props.shortVideo, () => {
  if (props.shortVideo) {
    config.color = 'rgba(255, 255, 255, .8)'
    config.activeColor = 'rgba(255, 255, 255, 1)'
  } else {
    config.color = 'rgba(0, 0, 0, 1)'
    config.activeColor = 'rgba(44, 162, 249, 1)'
  }
})
</script>

<style scoped>
.top-wrap {
  align-items: center;
  padding: 0 .14rem 0 .16rem;
  position: relative;
  height: .54rem;
}
.top-music-logo {
  width: .32rem;
  height: .32rem;
  margin-right: .06rem;
}
.top-music-logo .logo-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0;
}
.top-music-title {
  width: 1.42rem;
  height: 100%;
}
.video-header {
  z-index: 10;
  position: fixed;
  left: 50%;
  top: .2rem;
  width: 2.2rem;
  transform: translate3d(-50%, 0, 0);
}
</style>