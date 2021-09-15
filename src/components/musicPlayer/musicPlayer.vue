<template>
  <section class="music-player">
    <div class="player-wrapper" :style="{'background-color': musicConf.bgColor}">
      <div class="player-bar flex-box">
        <div class="fall-btn" @click="handleFallClick">
          <svg t="1631718783676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3719"><path d="M512 736c-9.6 0-16-3.2-22.4-9.6l-384-384c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 659.2 873.6 297.6c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-384 384c-6.4 6.4-12.8 9.6-22.4 9.6z" fill="rgba(255, 255, 255, .9)" p-id="3720"></path></svg>
        </div>
        <div class="bar-list">
          <div class="title-txt">歌曲</div>
        </div>
      </div>
      <div class="music-info"></div>
      <div class="music-interactive"></div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from "vuex";

// store
const store = useStore()
const setMusicPlayerStatus = (val) => store.commit('setMusicPlayerStatus', val)
const setMusicPlayerStyle = (val) => store.commit('setMusicPlayerStyle', val)

// music config
const musicConf = reactive({
  bgColor: '#540953'
})

// fall down btn
const handleFallClick = () => {
  setMusicPlayerStyle('fall')
}
</script>

<style scoped>
.music-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  transform: translate3d(0, 100%, 0);
}
.rise {
  animation: rise .4s linear forwards;
}
@keyframes rise {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.fall {
  animation: fall .4s linear forwards;
}
@keyframes fall {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
.player-wrapper {
  height: 100%;
  overflow: auto;
}
.fall-btn .icon {
  display: block;
  width: .24rem;
  height: .24rem;
}
.player-bar {
  align-items: center;
  justify-content: center;
  margin-top: .12rem;
}
.fall-btn {
  position: absolute;
  left: .2rem;
}
.bar-list {
  font-size: .16rem;
  color: rgba(255, 255, 255, .9);
  line-height: 1.5;
}
</style>