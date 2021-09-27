<template>
  <div class="history-wrap" :class="bgStyle" @click="handleMaskCloseClick">
    <div class="music-history flex-box"
      :class="historyStyle"
      @animationstart="handleHistoryAnimationStart"
      @animationend="handleHistoryAnimationEnd">
      <div class="history-header flex-box">
        <div class="play-title">
          <span>历史播放顺序 </span>
          <span>{{historyNum}}</span>
        </div>
        <div class="history-interaction">
          <div class="clear-btn" @click.stop="handleDeleteAllClick">
            <svg t="1632725823195" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3329"><path d="M844.8 326.4c-19.2 0-38.4 19.2-38.4 38.4v550.4c0 19.2-19.2 38.4-38.4 38.4H256c-19.2 0-38.4-19.2-38.4-38.4V364.8c0-19.2-12.8-38.4-38.4-38.4-19.2 0-38.4 19.2-38.4 38.4v550.4c6.4 57.6 51.2 108.8 115.2 108.8h512c64 0 115.2-51.2 115.2-115.2V364.8c0-19.2-19.2-38.4-38.4-38.4z m-409.6 435.2V364.8c0-19.2-12.8-38.4-38.4-38.4-19.2 0-38.4 19.2-38.4 38.4V768c0 19.2 12.8 38.4 38.4 38.4 25.6-6.4 38.4-19.2 38.4-44.8z m224 0V364.8c0-19.2-19.2-38.4-38.4-38.4s-38.4 19.2-38.4 38.4V768c0 19.2 19.2 38.4 38.4 38.4 19.2-6.4 38.4-19.2 38.4-44.8z m326.4-582.4h-179.2V108.8c0-57.6-51.2-108.8-108.8-108.8H326.4c-64 0-108.8 44.8-108.8 108.8v76.8H38.4c-19.2-6.4-38.4 12.8-38.4 32s19.2 32 38.4 32h947.2c19.2 0 38.4-12.8 38.4-32s-19.2-38.4-38.4-38.4z m-256 0H288V108.8c0-19.2 19.2-38.4 38.4-38.4h371.2c19.2 0 32 12.8 32 38.4v70.4z m0 0" p-id="3330"></path></svg>
          </div>
        </div>
      </div>
      <div class="history-list-container">
        <ul class="history-list">
          <li class="history-list-item flex-box" v-for="(history, index) in musicHistory" :key="history.name + index">
            <div class="history-info">
              <span class="music-name">{{history.name}}</span>
              <span> - </span>
              <span class="music-author">{{history.author}}</span>
            </div>
            <div class="delete-btn" @click.stop="handleDeleteOneClick(index)">
              <svg t="1632726693208" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4519"><path d="M557.311759 513.248864l265.280473-263.904314c12.54369-12.480043 12.607338-32.704421 0.127295-45.248112-12.512727-12.576374-32.704421-12.607338-45.248112-0.127295L512.127295 467.904421 249.088241 204.063755c-12.447359-12.480043-32.704421-12.54369-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.280796l262.975407 263.775299-265.151458 263.744335c-12.54369 12.480043-12.607338 32.704421-0.127295 45.248112 6.239161 6.271845 14.463432 9.440452 22.687703 9.440452 8.160624 0 16.319527-3.103239 22.560409-9.311437l265.216826-263.807983 265.440452 266.240344c6.239161 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.591372-9.34412 12.512727-12.480043 12.54369-32.704421 0.063647-45.248112L557.311759 513.248864z" p-id="4520"></path></svg>
            </div>
          </li>
        </ul>
      </div>
      <div class="close-btn flex-box" @click.stop="handleCloseClick">
        <div>
          <span>关闭</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const musicHistory = computed(() => store.state.musicHistory)
const deleteMusicHistory = (type, idx) => store.commit('deleteMusicHistory', {type, idx})
const setMusicHistoryStatus = (val) => store.commit('setMusicHistoryStatus', val)

const bgStyle = ref('')
const historyStyle = ref('rise')

const historyNum = computed(() => {
  if (typeof musicHistory.value.length === 'number') {
    return `(${musicHistory.value.length}首)`
  } else {
    return ''
  }
})

const handleDeleteOneClick = (idx) => {
  deleteMusicHistory('deleteOne', idx)
}

const handleDeleteAllClick = (idx) => {
  deleteMusicHistory('deleteAll')
}

const handleCloseClick = () => {
  historyStyle.value = 'fall'
}

const handleMaskCloseClick = (event) => {
  if (event.target && event.target.className.indexOf('history-wrap') !== -1) {
    historyStyle.value = 'fall'
  }
}

const handleHistoryAnimationStart = () => {
  if (historyStyle.value === 'rise') {
    bgStyle.value = 'mask'
  } else if (historyStyle.value === 'fall') {
    bgStyle.value = ''
  }
}

const handleHistoryAnimationEnd = () => {
  if (historyStyle.value === 'fall') {
    setMusicHistoryStatus(false)
  }
}

onMounted(() => {
  const ele = document.querySelector('html')
  ele.style.setProperty('overflow', 'hidden')
})

onUnmounted(() => {
  const ele = document.querySelector('html')
  ele.style.removeProperty('overflow')
})

</script>

<style scoped>
.history-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  transition: background-color 200ms ease-in;
}
.music-history {
  position: absolute;
  top: 30%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255);
  flex-direction: column;
  transform: translate3d(0, 100%, 0);
}
.history-header {
  justify-content: space-between;
  align-items: center;
  padding: .1rem .12rem;
  border-bottom: 1px solid #f2f2f2;
}
.clear-btn, .delete-btn {
  width: .16rem;
  height: .16rem;
}
.clear-btn svg, .delete-btn svg {
  fill: #9d9d9d;
}
.history-header .play-title {
  font-size: .16rem;
  color: #000;
  font-weight: 600;
}
.history-list-container {
  flex: 1;
  overflow: auto;
}
.history-list {
  list-style: none;
  padding: 0 .12rem;
}
.history-list-item {
  padding: .08rem 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
}
.history-info {
  color: #999;
}
.history-info .music-name {
  color: #000;
  font-size: .14rem;
}
.close-btn {
  height: .4rem;
  font-size: .16rem;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 5px #f2f2f2;
}
.rise {
  animation: rise .4s linear forwards .2s;
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
.mask {
  background-color: rgba(0, 0, 0, .2);
}
</style>