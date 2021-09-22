<template>
  <section class="music-player" ref="playerRef">
    <div class="player-bg" :style="bgStyle"></div>
    <div class="bottom-shade"></div>
    <div class="top-txt txt-4">
      <span>歌曲</span>
    </div>
    <div class="player-scroll" ref="scrollRef">
      <div class="player-wrapper">
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
        <div class="music-audio">
          <music-audio :url="musicInfo.musicUrl" :progress="true" :delay="300"
            @status-change="handleAudioStatusChange"
            @progress-touch="handleAudioProgressTouch"></music-audio>
        </div>
      </div>
    </div>
    <div class="music-relation-info flex-box"
      :style="relationStyle"
      :class="{ 'spread': relationShow }"
      v-show="playerHeight !== 0">
      <div class="relation-icon" @click="handleIconClick">
        <svg t="1632317677444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2787"><path d="M497.408 320.7168l-417.792 287.1296a25.6 25.6 0 0 0-6.656 35.84l36.608 53.1968a25.6 25.6 0 0 0 35.84 6.656l367.2064-252.416 365.9264 252.3136a25.6 25.6 0 0 0 35.84-6.6048l36.6592-53.1456a25.6 25.6 0 0 0-6.5536-35.84l-416.4096-287.1296a27.0848 27.0848 0 0 0-30.6688 0z" p-id="2788"></path></svg>
      </div>
      <ul class="relation-tabs flex-box"
        @click="handleTabClick"
        @touchstart="handleRelationTouchStart"
        @touchmove="handleRelationTouchMove"
        @touchend="handleRelationTouchEnd">
        <li class="relation-item txt-4" data-type="song" :class="{active: selectTab === 'song' && relationShow}">
          <span class="tab-txt">相关歌曲</span>
        </li>
        <li class="relation-item txt-4" data-type="comment" :class="{active: selectTab === 'comment' && relationShow}">
          <span class="tab-txt">精彩评论</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick, watch } from 'vue'
import { useStore } from "vuex"
import request from '../../config/request'
import BScroll from 'better-scroll'
import MusicPlayer from "./musicLyric.vue"
import MusicAudio from "./audio.vue"

// store
const store = useStore()
const setMusicPlayerStatus = (val) => store.commit('setMusicPlayerStatus', val)
const setMusicPlayerStyle = (val) => store.commit('setMusicPlayerStyle', val)
const setMusicStatus = (val) => store.commit('setMusicStatus', val)
const setMusicProgressStatus = (val) => store.commit('setMusicProgressStatus', val)
const setMusicHistory = (val) => store.commit('setMusicHistory', val)

// music info
const playerRef = ref(null)
const playerHeight = ref(0)
const musicInfo = ref({})
const bottomNum = ref(0)
const transitionVal = ref('all .3s ease-in 0s')
const bgStyle = computed(() => {
  const imgUrl  = musicInfo.value.imgUrl
  if (imgUrl) {
    return {
      'background-image': `url(${imgUrl})`,
      'opacity': 1,
      'transform': 'scale(1.5)',
      'transform-origin': 'center center',
      'filter': 'blur(30px)'
    }
  } else {
    return {}
  }
})
const relationStyle = computed(() => {
  return {
    'background-color': relationShow.value ? 'rgba(255, 255, 255)' : 'rgba(255, 255, 255, .1)',
    'height': `${playerHeight.value - 60}px`,
    'bottom': `${bottomNum.value}px`,
    'transition': transitionVal.value
  }
})
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
  playerHeight.value = playerRef.value.clientHeight
  bottomNum.value = -(playerHeight.value - 120)
  nextTick(() => {
    initScroll()
  })
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
  // refresh.value = Object.create(null)
  nextTick(() => {
    scrollRefresh()
  })
}


// scroll
const scrollRef = ref(null)
const scrollVal = ref(null)

const initScroll = () => {
  scrollVal.value = new BScroll(scrollRef.value, {
    probeType: 1,
  })
}

const scrollRefresh = () => {
  scrollVal.value && scrollVal.value.refresh()
}


// music relation
const relationShow = ref(false)
const selectTab = ref('')
const relationTouch = reactive({
  startY: 0,
  bottom: 0,
  up: false,
  upDone: false,
  down: false,
  downDone: false
})

watch(() => relationShow.value, (newStatus) => {
  if (newStatus && selectTab.value === '') {
    selectTab.value = 'song'
  }
})

const handleTabClick = (event) => {
  let _target = event.target.nodeName.toLocaleLowerCase() === 'span' ? event.target.parentNode : event.target
  if (_target.nodeName.toLocaleLowerCase() === 'li') {
    selectTab.value = _target.dataset.type
    relationShow.value = true
    bottomNum.value = 0
  }
}

const handleIconClick = (event) => {
  if (relationShow.value) {
    relationShow.value = false
    bottomNum.value = -(playerHeight.value - 120)
  } else {
    relationShow.value = true
    bottomNum.value = 0
  }
}

const handleRelationTouchStart = (event) => {
  if (event.touches) {
    relationTouch.startY = event.touches[0].clientY
    relationTouch.bottom = bottomNum.value
  }
}
const handleRelationTouchMove = (event) => {
  if (event.touches) {
    const dis = event.touches[0].clientY - relationTouch.startY
    transitionVal.value = 'none 0s ease 0s'
    if (relationShow.value && dis > 0) {
      bottomNum.value = relationTouch.bottom - dis
      relationTouch.down = true
      if (dis > 80) {
        relationTouch.downDone = true
      }
    } else if (!relationShow.value && dis < 0) {
      bottomNum.value = relationTouch.bottom - dis
      relationTouch.up = true
      if (-dis > 80) {
        relationTouch.upDone = true
      }
    }
  }
}
const handleRelationTouchEnd = (event) => {
  transitionVal.value = 'all .3s ease-in 0s'
  if (relationTouch.up) {
    if (relationTouch.upDone) {
      bottomNum.value = 0
      relationShow.value = true
    } else {
      bottomNum.value = -(playerHeight.value - 120)
    }
  }
  if (relationTouch.down) {
    if (relationTouch.downDone) {
      bottomNum.value = -(playerHeight.value - 120)
      relationShow.value = false
    } else {
      bottomNum.value = 0
    }
  }
  relationTouch.up = false
  relationTouch.upDone = false
  relationTouch.down = false
  relationTouch.downDone = false
}
</script>

<style scoped>
.music-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
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
  z-index: 1;
  filter: blur(0);
  -webkit-filter: blur(0);
  backface-visibility: hidden;
  overflow: hidden;
}
.player-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: .5rem;
  bottom: .6rem;
  overflow: hidden;
  z-index: 100;
}
.fall-btn .icon {
  display: block;
  width: .24rem;
  height: .24rem;
  transform: rotate(90deg);
}
.top-txt {
  position: relative;
  padding-top: .16rem;
  font-size: .16rem;
  text-align: center;
}
.player-bar {
  align-items: center;
  justify-content: center;
  margin-top: .12rem;
}
.fall-btn {
  position: absolute;
  left: .16rem;
}
.bar-list {
  font-size: .16rem;
  color: rgba(255, 255, 255, .9);
  line-height: 1.5;
}
.music-info {
  margin: 0 .32rem;
}
.music-info .music-bd {
  position: relative;
  width: 2.6rem;
  height: 2.6rem;
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
  height: 1.9rem;
  width: 1.9rem;
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
.music-audio {
  position: relative;
  margin: .2rem .32rem;
}
.history-btn {
  position: absolute;
  top: 50%;
  right: 0;
}
.music-relation-info {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: .24rem .24rem 0 0;
  overflow: hidden;
  flex-direction: column;
  z-index: 101;
}
.relation-tabs {
  width: 100%;
  padding-top: .28rem;
}
.relation-item {
  color: hsla(0, 0%, 100%, .2);
  height: .32rem;
  text-align: center;
  font-size: .16rem;
  list-style: none;
  flex: 1;
}
.relation-item .tab-txt {
  padding: 0 .04rem .04rem;
}
.relation-item.active .tab-txt {
  color: rgba(44, 162, 249, 1);
  border-bottom: 2px solid rgba(44, 162, 249, 1);;
}
.relation-icon {
  position: absolute;
  width: .3rem;
  height: .3rem;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.relation-icon svg {
  fill: hsla(0, 0%, 100%, .1);
  width: 100%;
  height: 100%;
}
.music-relation-info.spread .relation-item {
  color: #333;
}
.music-relation-info.spread .relation-icon svg {
  fill: #333;
  transform: rotate(180deg);
}
</style>