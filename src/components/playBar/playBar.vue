<template>
  <section class="music-play-bar">
    <div class="play-bar-box"  @click.prevent="handlebarClick">
      <div class="flotation-bar">
        <div class="play-bar-music">
          <img :src="musicBasic.imgUrl" alt="music" class="play-img" v-if="musicBasic.imgUrl">
        </div>
        <div class="play-bar-cont flex-box">
          <div class="cont-left">
            <img src="../../assets/img/cd.png" alt="cd" class="cd-img">
          </div>
          <div class="cont-center flex-box">
            <div class="play-music txt-4" :class="moveAnim" @animationend="handleMoveAnim">{{musicNameAuthor}}</div>
          </div>
          <div class="cont-right flex-box">
            <div class="play-btn flex-box">
              <div class="play-process"></div>
            </div>
            <div class="music-history">
              <svg t="1632543111484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28980"><path d="M838.99432863 162.40722482l-186.33127437 38.02037807c-13.51137403 2.82796201-23.25213204 14.61113702-23.25213205 28.43672906v412.09690783c0 23.09502305-15.86800901 43.20497508-38.49170507 48.54668107L534.04575904 702.86218588c-34.24976206 8.01255901-61.27251012 37.39194207-61.42961915 72.58435814-0.31421799 48.07535409 44.30473808 83.58198817 90.96611119 72.74146715l29.85071007-6.91279599c48.70379009-11.31184801 83.26777017-53.73127811 85.62440516-103.22061322h0.47132701v-372.34833075c0-10.84052103 7.69834101-20.26706103 18.38175304-22.46658704l150.35331329-30.63625506c10.84052103-2.19952601 18.69597103-11.78317502 18.69597104-22.93791404v-104.47748521c0.15710901-14.76824603-13.35426503-25.76587604-27.96540206-22.78080504zM166.72491631 255.88708001h375.96183773v33.14999904H166.72491631zM166.72491631 387.38731327h375.96183773v33.14999905H166.72491631z" p-id="28981"></path><path d="M166.72491631 518.88754654h375.96183773V552.03754558H166.72491631zM166.72491631 650.3877798h202.98482839v33.14999904H166.72491631z" p-id="28982"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const router = useRouter()

const store = useStore()
const musicBasic = computed(() => store.state.musicBasic)
const setMusicPlayerStatus = (val) => store.commit('setMusicPlayerStatus', val)
const setPlayBarStyle = (val) => store.commit('setPlayBarStyle', val)

// 移动动画
const moveAnim = ref('')
const timer = ref(null)

const handleMoveAnim = () => {
  if (moveAnim.value === 'move-anim') {
    moveAnim.value = 'move-back-anim'
  } else {
    timer.value = setTimeout(() => {
      moveAnim.value = 'move-anim'
    }, 2000)
  }
}

const musicNameAuthor = computed(() => {
  if (musicBasic.value.name || musicBasic.value.author) {
    return `${musicBasic.value.name} - ${musicBasic.value.author}`
  } else {
    return ''
  }
})

watch(() => musicNameAuthor.value, (newVal) => {
  if (newVal) {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
    moveAnim.value = ''
    setTimeout(() => {
      moveAnim.value = 'move-anim'
    }, 1000)
  }
})

// 播放条click处理
const handlebarClick = (event) => {
  const className = event.target.className
  const id = musicBasic.value.id
  if (className && className.indexOf('play-btn') === -1 && id !== -1) {
    setMusicPlayerStatus(true)
    router.push({path: 'playmusic', query: { id }})
  }
}

onMounted(() => {
  const historymusic = localStorage.getItem('historyMusicId')
})
</script>

<style scoped>
.music-play-bar {
  position: fixed;
  left: .16rem;
  right: .2rem;
  bottom: .08rem;
}
.play-bar-box {
  width: 100%;
  height: .48rem;
}
.flotation-bar {
  position: relative;
  padding-top: .06rem;
}
.play-bar-music {
  position: absolute;
  left: 0;
  top: 0;
  width: .48rem;
  height: .48rem;
  z-index: 2;
}
.play-bar-music .play-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: .04rem;
  box-shadow: .05rem .05rem .05rem rgba(0, 0, 0, .6);
}
.play-bar-cont {
  height: .42rem;
  background-color: #bdc2c2;
  border-radius: .4rem;
  align-items: center;
}
.play-bar-cont .cont-left {
  margin-left: .18rem;
  flex-basis: .52rem;
}
.play-bar-cont .cont-center {
  position: relative;
  height: 100%;
  flex: 1;
  overflow: hidden;
  align-items: center;
}
.play-bar-cont .cont-right {
  flex-basis: .6rem;
  padding-left: .2rem;
  align-items: center;
}
.play-bar-cont .cont-left .cd-img {
  display: block;
  width: .42rem;
  height: .42rem;
}
.play-bar-cont .cont-center .play-music {
  position: relative;
  font-size: .14rem;
  white-space: nowrap;
}
.play-bar-cont .cont-right .play-btn {
  position: relative;
  width: .24rem;
  height: .24rem;
  border-radius: 100%;
  border: 2px solid #fff;
  align-items: center;
}
.play-bar-cont .cont-right .play-btn::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: .06rem .09rem;
  border-color: transparent transparent transparent #fff;
  margin-left: .094rem;
}
.move-anim {
  animation: move 5s linear 2s forwards;
}
@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.move-back-anim {
  left: 100%;
  animation: move-back 5s linear .5s forwards;
}
@keyframes move-back {
  0% {
    left: 100%;
  }
  100% {
    left: 0%;
  }
}
.bar-fall {
  animation: barFall .2s linear forwards;
}
@keyframes barFall {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, .8rem, 0);
  }
}
.bar-rise {
  animation: barRise .2s linear forwards;
}
@keyframes barRise {
  0% {
    transform: translate3d(0, .8rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.music-history {
  margin: 0 .1rem;
  width: .32rem;
  height: .32rem;
}
.music-history svg {
  fill: #fff;
}
</style>