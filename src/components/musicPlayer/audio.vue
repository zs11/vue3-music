<template>
  <div class="audio-wrapper">
    <div class="audio-progress-wrap" v-if="progress">  
      <div class="audio-progress"
        :class="{'touched': progress.onTouch}"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        ref="progressRef">
        <div class="audio-progress-inner">
          <div class="audio-progress-played" :style="{width: precent}"></div>
        </div>
        <div class="audio-progress-btn" :style="{left: precent}"></div>
      </div>
      <div class="time-progress flex-box">
        <div class="current-time">{{timeInfo.current}}</div>
        <div class="total-time">{{timeInfo.total}}</div>
      </div>
    </div>
    <div class="audio-source">
      <audio :src="url" height="0" width="0" ref="audioRef"
        @canplay="handleCanplay"
        @timeupdate="handleTimeupdate"></audio>
    </div>
    <div class="audio-interactive-wrap">
      <div class="interactive-bar flex-box">
        <div class="audio-play-btn">
          <svg style="display: none;">
            <defs>
              <symbol id="play-icon" viewBox="0 0 32 32">
                <path d="M11.909 24.758l10.941-7.94-10.941-8.709v16.65zM9.727 5.091c0-0.164 0.056-0.324 0.159-0.453 0.25-0.314 0.708-0.367 1.022-0.116l14.799 11.78 0.136 0.142c0.236 0.325 0.164 0.78-0.161 1.016l-14.799 10.74c-0.124 0.090-0.273 0.139-0.427 0.139-0.401 0-0.727-0.326-0.727-0.727v-22.52z"></path>
              </symbol>
              <symbol id="pause-icon" viewBox="0 0 32 32">
                <path d="M10.182 5.091h0.727c0.401 0 0.727 0.326 0.727 0.727v20.364c0 0.401-0.326 0.727-0.727 0.727h-0.727c-0.401 0-0.727-0.326-0.727-0.727v-20.364c0-0.401 0.326-0.727 0.727-0.727zM21.091 5.091h0.727c0.401 0 0.727 0.326 0.727 0.727v20.364c0 0.401-0.326 0.727-0.727 0.727h-0.727c-0.401 0-0.727-0.326-0.727-0.727v-20.364c0-0.401 0.326-0.727 0.727-0.727z"></path>
              </symbol>
            </defs>
          </svg>
          <a href="javascript:;" class="icon-wrap" @click="handlePlayClick">
            <svg class="icon">
              <use :xlink:href="useId" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, defineEmits, watch, reactive } from "vue";

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  progress: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 0
  }
})

const emitter = defineEmits(['StatusChange', 'ProgressTouch'])

const audioRef = ref(null)
const progressRef = ref(null)
const audioPlayStatus = ref(false)
const precent = ref(0)
const useId = computed(() => (
  audioPlayStatus.value ? '#pause-icon' : '#play-icon'
))
const timeInfo = reactive({
  current: '00:00',
  total: '00:00'
})

// event listener
const handleCanplay = () => {
  const duration = audioRef.value.duration
  timeInfo.total = formatTime(duration)
}

const handleTimeupdate = (event) => {
  if (!progress.onTouch) {
    const current = audioRef.value.currentTime
    const duration = audioRef.value.duration
    if (!Number.isNaN(current) && !Number.isNaN(duration)) {
      precent.value = (current / duration).toFixed(4) * 100 + '%'
      timeInfo.current = formatTime(current)
    }
  } else {
    event.preventDefault()
  }
}

const play = () => {
  if (audioRef.value && !audioPlayStatus.value) {
    audioPlayStatus.value = true
    emitter('StatusChange', 'play')
    if (props.delay > 0) {
      setTimeout(playPromise, props.delay)
    } else {
      playPromise()
    }
  }
}

const playPromise = () => {
  const _playPromise = audioRef.value.play()
  if (_playPromise !== undefined) {
    _playPromise.then(_ => {
      audioRef.value.play()
    })
    .catch(error => {
    })
  }
}

const pause = () => {
  if (audioRef.value && audioPlayStatus.value) {
    audioPlayStatus.value = false
    emitter('StatusChange', 'pause')
    audioRef.value.pause()
  }
}

const handlePlayClick = () => {
  if (audioPlayStatus.value) {
    pause()
  } else {
    play()
  }
}

const formatTime = (_time) => {
  let minute = Math.floor(_time / 60)
  let second = Math.round(_time % 60)
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return `${minute}:${second}`
}

// progress touch event
const progress = reactive({
  startX: 0,
  dis: 0,
  startTime: 0,
  duration: 0,
  onTouch: false,
  precent: 0,
  current: 0
})

const countDistance = (type, distance, startTime, duration, precent) => {
  const width = progressRef.value.clientWidth
  const disWidth = (distance / width).toFixed(4)
  if (type === 'duration') {
    const disNum = disWidth * duration;
    return Math.max(Math.min(startTime + disNum, duration), 0)
  } else if (type === 'progress') {
    const disProgress = disWidth * 100
    return Math.max(Math.min(parseFloat(precent) + disProgress, 100), 0) + '%'
  }
}

const handleTouchStart = (event) => {
  progress.startX = event.touches && event.touches[0].clientX
  if (!progress.startX) {
    return
  }
  progress.dis = 0
  progress.startTime = audioRef.value.currentTime
  progress.duration = audioRef.value.duration
  progress.onTouch = true
  progress.precent = precent.value
  emitter('ProgressTouch', 'touchStart')
}

const handleTouchMove = (event) => {
  const curX = event.touches && event.touches[0].clientX
  if (!curX) {
    return
  }
  progress.dis = curX - progress.startX
  const newPG = countDistance('progress', progress.dis, 0, 0, progress.precent)
  const newCUR = countDistance('duration', progress.dis, progress.startTime, progress.duration)
  timeInfo.current = formatTime(newCUR)
  precent.value = newPG
  emitter('ProgressTouch', 'touchMove', newCUR)
}

const handleTouchEnd = (event) => {
  const newCUR = countDistance('duration', progress.dis, progress.startTime, progress.duration)
  progress.onTouch = false
  audioRef.value.currentTime = newCUR
  play()
  emitter('ProgressTouch', 'touchEnd')
}
</script>

<style scoped>
.audio-progress {
  position: relative;
  height: .032rem;
}
.audio-progress-inner {
  position: relative;
  height: 100%;
  background: hsla(0, 0%, 100%, .3);
  transition: height .2s ease-in;
  border-radius: .1rem;
}
.audio-progress-played {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 0;
  height: 100%;
  background: hsla(0, 0%, 100%, .8);
}
.audio-progress-btn {
  position: absolute;
  display: block;
  left: 0;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
}
.audio-progress-btn::before {
  content: "";
  display: block;
  width: .08rem;
  height: .08rem;
  background: hsla(0, 0%, 100%, 1);
  position: relative;
  border-radius: 50%;
}
.audio-interactive-wrap {
  position: relative;
}
.interactive-bar {
  margin-top: .1rem;
  justify-content: center;
  align-items: center;
}
.audio-play-btn {

}
.audio-play-btn .icon {
  display: block;
  width: .28rem;
  height: .28rem;
  fill: #000;
}
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: .82rem;
  height: .38rem;
  background-color: hsla(0, 0%, 100%, .9);
  border-radius: .1rem;
}
.time-progress {
  justify-content: space-between;
  color: rgba(255, 255, 255, .6);
  margin-top: .06rem;
}
.audio-progress.touched {
}
</style>