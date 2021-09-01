<template>
  <section class="music-play-bar">
    <div class="play-bar-box">
      <div class="flotation-bar">
        <div class="play-bar-music">
          <img src="http://localhost:3020/pic1.png" alt="music" class="play-img">
        </div>
        <div class="play-bar-cont flex-box">
          <div class="cont-left">
            <img src="../../assets/img/cd.png" alt="cd" class="cd-img">
          </div>
          <div class="cont-center flex-box">
            <div class="play-music txt-4" :class="moveAnim" @animationend="handleMoveAnim">学到老爱到老 - 金润吉</div>
          </div>
          <div class="cont-right">
            <div class="play-btn flex-box">
              <div class="play-process"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'

// 移动动画
const moveAnim = ref('')
nextTick(() => {
  moveAnim.value = 'move-anim'
})

const handleMoveAnim = () => {
  if (moveAnim.value === 'move-anim') {
    moveAnim.value = 'move-back-anim'
  } else {
    moveAnim.value = ''
  }
}

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
</style>