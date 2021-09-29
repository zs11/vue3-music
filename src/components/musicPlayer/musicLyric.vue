<template>
  <div class="lyric music-lyric">
    <div class="lyric_bd" v-if="_lyric">
      <div class="lyric-scroll music-lines-wrap" :style="scrollStyle">
        <p class="lyric-line" :class="{current: curLine === index}" v-for="(line, index) in _lyric.lines" :key="`line.txt${index}`">{{line.txt}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Lyric from 'lyric-parser'
import { defineProps, nextTick, onMounted, ref, watch, defineEmits, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  musicLyric: {
    type: Object,
    default: {}
  },
  musicChange: {
    type: Object,
    default: {
      current: 0,
      isChange: false,
      isPlay: false
    }
  },
  delay: {
    type: Number,
    default: 0
  }
})

const store = useStore()

// audio statut
const musicStatus = computed(() => store.state.musicStatus)
const musicProgressStatus = computed(() => store.state.musicProgressStatus) 

const isSeek = ref(false)
const _lyric = ref(null)
const curLine = ref(0)
const scrollStyle = ref({ transform: 'translate3d(0, 0, 0)' })
const basicHeight = 0.21
const emitter = defineEmits(['LyricUpdate', 'Loop'])

const handleLyric = ({ lineNum, txt }) => {
  // console.log(lineNum, txt);
  if (lineNum > 1) {
    const offset = -1 * (lineNum - 1) * basicHeight
    scrollStyle.value = { transform: `translate3d(0, ${offset}rem, 0)` }
  }
  curLine.value = lineNum
}

const initLyric = () => {
  _lyric.value = new Lyric(props.musicLyric.lyric, handleLyric)
  if (!props.musicChange.isChange && props.musicChange.current !== 0) {
    setLyric(props.musicChange.current)
    if (!props.musicChange.isPlay) {
      togglePlay()
    }
  }
}

watch(() => props.musicLyric, (newLyric, oldLyric) => {
  if (newLyric.id !== oldLyric.id) {
    if (!_lyric.value) {
      initLyric()
    } else {
      stop()
      nextTick(() => {
        initLyric()
        emitter('LyricUpdate')
      })
    }
  }
})

// status, isSeek.value
// CLOSE 
// 1. pause false
// 2. pause true

// PlAY
// 1. Play flase
// 2. play true 不做处理

watch(() => musicStatus.value, (status) => {
  if (status === 'pause') {
    togglePlay()
  } else if (status === 'play' && !isSeek.value) {
    setLyric(props.musicChange.current)
  }
  isSeek.value = false
})

watch(() => musicProgressStatus.value, (status) => {
  if (!isSeek.value && musicStatus.value === 'play') {
    togglePlay()
  }
  setLyric(status)
  isSeek.value = true
})

const loop = () => {
  emitter('Loop')
  _lyric.value && _lyric.value.seek(0)
}

const play = () => {
  _lyric.value && _lyric.value.play()
}

const togglePlay = () => {
  _lyric.value && _lyric.value.togglePlay()
}

const stop = () => {
  _lyric.value && _lyric.value.stop()
}

const setLyric = (curTime) => {
  _lyric.value && _lyric.value.seek(curTime * 1000 - props.delay)
}
</script>

<style scoped>
.lyric_bd {
  width: 100%;
  height: .66rem;
  overflow: hidden;
}
.lyric_bd {
  margin-top: .04rem;
}
.lyric-line {
  font-size: .14rem;
  line-height: 1.5;
  height: .21rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, .5);
}
.lyric-line.current {
  color: rgb(255, 255, 255);
  font-size: .16rem;
  height: .24rem;
}
.lyric-scroll {
  transition: transform .3s ease-out 0s;
  transform-origin: 0 0;
}
</style>