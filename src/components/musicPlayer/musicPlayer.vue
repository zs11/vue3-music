<template>
  <section class="music-player">
    <div class="player-bg" :style="{'background-image': `url(${musicInfo.imgUrl})`}"></div>
    <div class="bottom-shade"></div>
    <div class="player-wrapper">
      <div class="player-bar flex-box">
        <div class="fall-btn" @click="handleFallClick">
          <svg t="1631718783676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3719"><path d="M512 736c-9.6 0-16-3.2-22.4-9.6l-384-384c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 659.2 873.6 297.6c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-384 384c-6.4 6.4-12.8 9.6-22.4 9.6z" fill="rgba(255, 255, 255, .9)" p-id="3720"></path></svg>
        </div>
        <div class="bar-list">
          <div class="title-txt">歌曲</div>
        </div>
      </div>
      <div class="music-info">
        <div class="music-bd flex-box">
          <div class="bd-cover">
            <img :src="musicInfo.imgUrl" alt="music" class="music-img">
          </div>
        </div>
        <div class="info-box box-cover">
          <div class="info-detail txt-4">
            <span class="name-info">{{musicInfo.name}}</span>
            <span> - </span>
            <span class="author-info">{{musicInfo.author}}</span>
          </div>
          <music-player :musicLyric="musicLyric" @lyric-update="handleLyricUpdate"></music-player>
        </div>
      </div>
      <div class="music-interactive">
        <music-audio :url="musicInfo.musicUrl" :progress="true" :delay="300"
          @status-change="handleAudioStatusChange"
          @progress-touch="handleAudioProgressTouch"></music-audio>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick } from 'vue';
import { useStore } from "vuex";
import request from '../../config/request'
import MusicPlayer from "./musicLyric.vue";
import MusicAudio from "./audio.vue";

// store
const store = useStore()
const setMusicPlayerStatus = (val) => store.commit('setMusicPlayerStatus', val)
const setMusicPlayerStyle = (val) => store.commit('setMusicPlayerStyle', val)
const setMusicStatus = (val) => store.commit('setMusicStatus', val)
const setMusicProgressStatus = (val) => store.commit('setMusicProgressStatus', val)
const setMusicHistory = (val) => store.commit('setMusicHistory', val)

// music info
const musicInfo = ref({})
const author = computed(() => ((musicInfo.value.author && `${musicInfo.value.author}`) || ''))
const musicLyric = computed(() => {
  const { id, lyric } = musicInfo.value
  if (lyric) {
    return {
      id,
      lyric
    }
  }
  return {}
})


// onMounted
onMounted(async () => {
  const res = await request({
    url: '/music/info',
    method: 'GET',
    params: {
      id: 1
    }
  })
  const { data } = res
  musicInfo.value = data
})


// fall down btn
const handleFallClick = () => {
  setMusicPlayerStyle('fall')
}

// audio event: 1. status change 2. progress touch
const handleAudioStatusChange = (val) => {
  setMusicStatus(val)
  if (val === 'play') {
    setMusicHistory({
      id: 1,
      name: '半糖主义',
      author: 'S.H.E',
      imgUrl: 'http://localhost:3020/music/music1.jpg'
    })
  }
}

const handleAudioProgressTouch = (type, cur) => {
  if (type === 'touchStart') {
  } else if (type === 'touchMove') {
    setMusicProgressStatus(cur)
  } else if (type === 'touchEnd') {
  }
} 

// lyric update
const handleLyricUpdate = () => {
}
</script>

<style scoped>
.music-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transform: translate3d(0, 100%, 0);
  overflow: hidden;
}
.player-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #161825;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  opacity: 1;
  transform: scale(1.5);
  transform-origin: center center;
  filter: blur(30px);
}
.player-bg::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}
.bottom-shade {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0));
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
  width: .22rem;
  height: .22rem;
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
.music-info {
  margin: .12rem .32rem 0;
}
.music-info .music-bd {
  position: relative;
  width: 2.8rem;
  height: 2.8rem;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.music-info .music-bd::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../../assets/img/music-wrap.png) no-repeat;
  background-size: contain;
}
.music-info .bd-cover {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  overflow: hidden;
}
.music-info .bd-cover .music-img {
  display: block;
  width: 100%;
}
.info-box {
  position: relative;
  text-align: center;
}
.info-box .info-detail {
  margin: .2rem 0 .1rem;
  font-size: .22rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-detail .author-info {
  color: hsla(0, 0%, 100%, .6);
}
.info-detail .name-info {
  /* font-weight: 600; */
}
.info-box .music-author {
  font-size: .14rem;
  color: rgba(255, 255, 255, .6);
  font-weight: 300;
}
.music-interactive {
  position: relative;
  margin: .2rem .32rem 0;
}
.history-btn {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>