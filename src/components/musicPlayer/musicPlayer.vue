<template>
  <section class="music-player">
    <div class="player-wrapper" :style="{'background-color': musicInfo.bgColor}">
      <div class="player-bar flex-box">
        <div class="fall-btn" @click="handleFallClick">
          <svg t="1631718783676" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3719"><path d="M512 736c-9.6 0-16-3.2-22.4-9.6l-384-384c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 659.2 873.6 297.6c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-384 384c-6.4 6.4-12.8 9.6-22.4 9.6z" fill="rgba(255, 255, 255, .9)" p-id="3720"></path></svg>
        </div>
        <div class="bar-list">
          <div class="title-txt">歌曲</div>
        </div>
      </div>
      <div class="music-info">
        <div class="music-bd">
          <div class="bd-cover">
            <img :src="musicInfo.imgUrl" alt="music" class="music-img">
          </div>
        </div>
        <div class="info-box box-cover">
          <div class="music-name txt-4">
            <span>{{musicInfo.name}}</span>
          </div>
          <div class="music-author">
            <span>{{author}}</span>
          </div>
          <music-player :musicLyric="musicLyric" :isPlaying="isPlaying" @lyric-update="handleLyricUpdate"></music-player>
        </div>
      </div>
      <div class="music-interactive"></div>
      <div class="audio-wrap">
        <audio :src="musicInfo.musicUrl" height="0" width="0" ref="audioRef"></audio>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick } from 'vue';
import { useStore } from "vuex";
import request from '../../config/request'
import MusicPlayer from "./musicLyric.vue";

// store
const store = useStore()
const setMusicPlayerStatus = (val) => store.commit('setMusicPlayerStatus', val)
const setMusicPlayerStyle = (val) => store.commit('setMusicPlayerStyle', val)

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

// audio ref
const audioRef = ref(null)

// isPlaying
const isPlaying = ref(false)

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
  audioRef.value.addEventListener('canplay', () => {
    audioPlay()
  })
})


// fall down btn
const handleFallClick = () => {
  setMusicPlayerStyle('fall')
}

// lyric update
const handleLyricUpdate = () => {
  audioPlay()
}

// audio play / pause
const audioPlay = () => {
  const playPromise = audioRef.value.play()
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      isPlaying.value = true
      audioRef.value.play()
    })
    .catch(error => {
    })
  }
}

const audioPause = () => {
  isPlaying.value = false
  audioRef.value.pause()
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
}
.music-info .bd-cover {
  height: 0;
  padding-bottom: 100%;
  border-radius: .08rem;
  overflow: hidden;
}
.music-info .bd-cover .music-img {
  display: block;
  width: 100%;
}
.info-box {
  position: relative;
}
.info-box .music-name {
  margin-top: .12rem;
  font-size: .18rem;
}
.info-box .music-author {
  font-size: .14rem;
  color: rgba(255, 255, 255, .7);
}
</style>