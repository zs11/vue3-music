<template>
  <header class="music-header">
    <section class="top-wrap flex-box">
      <div class="top-music-logo">
        <img src="../../assets/img/music.png" alt="logo" class="logo-img">
      </div>
      <div class="top-music-desc flex-box">
        <h2 class="top-music-title">my'Music</h2>
        <p class="top-music-txt">一起聆听动感音乐</p>
      </div>
    </section>
    <section class="tab-wrap">
      <tab :tabs="tabs"></tab>
    </section>
  </header>
</template>

<script setup>
import Tab from '../../components/tab/tab.vue'

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
  }
]
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
.top-music-desc {
  flex-direction: column;
}
.top-music-desc .top-music-title {
  font-size: .16rem;
  color: #000;
  font-weight: 400;
}
.top-music-desc .top-music-txt {
  font-size: .12rem;
  color: #8a8a8a;
  font-weight: 400;
}
</style>