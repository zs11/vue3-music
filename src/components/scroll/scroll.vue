<template>
  <div class="scroll-wrapper" ref="scrollRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, useSlots, watch, defineEmits, defineProps } from "vue";

const scrollRef = ref(null)
const scrollContent = ref(null)
const ele = document.documentElement
const emitter = defineEmits(['refresh', 'loadmore'])

const _scroll = reactive({
  X: 0,
  Y: 0,
  height: 0
})

const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})

const _touch = reactive({
  startX: 0,
  startY: 0,
  pulldown: false,
  refresh: false,
  pullup: false,
  load: false
})

// watch 
watch(() => _touch.refresh, (newStatus, oldStatus) => {
  emitter('refresh', newStatus, oldStatus)
  setTimeout(() => {
    _touch.load = false
  }, 100)
})

watch(() => props.data, () => {
  scrollInY(scrollContent.value, 0, 500)
  setTimeout(() => {
    _touch.load = false
  }, 100)
})

// scroll event
const handleScroll = (event) => {
  event.preventDefault()
  _scroll.Y = ele.scrollTop
  if (!_touch.load) {
    const precent = (ele.clientHeight + ele.scrollTop) / scrollRef.value.clientHeight
    if (precent >= 0.8) {
      _touch.load = true
      emitter('loadmore')
    }
  }
}

const scrollInY = (ele, val, duration = 0) => {
  ele.style = `transform: translateY(${val}px);transition-duration: ${duration}ms;`
}

const handleTouchStart = (event) => {
  if (event.touches[0]) {
    _touch.startY = event.touches[0].clientY
  }
}

const handleTouchMove = (event) => {
  if (event.touches[0]) {
    // pulldown
    const dis = (event.touches[0].clientY - _touch.startY) / 2
    if (_scroll.Y === 0 && dis > 0) {
      scrollInY(scrollContent.value, dis, 0)
      _touch.pulldown = true
      if (dis >= 32) {
        _touch.refresh = true
      }
    }
    // pulldown
  }
}

const handleTouchEnd = (event) => {
  if (_touch.pulldown) {
    if (_touch.refresh) {
      scrollInY(scrollContent.value, 40, 300)
    } else {
      scrollInY(scrollContent.value, 0, 500)
    }
    _touch.pulldown = false
    _touch.refresh = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, false)
  nextTick(() => {
    if (scrollRef.value.children && scrollRef.value.children[0]) {
      scrollContent.value = scrollRef.value.children[0]
      scrollContent.value.addEventListener('touchstart', handleTouchStart, false)
      scrollContent.value.addEventListener('touchmove', handleTouchMove, false)
      scrollContent.value.addEventListener('touchend', handleTouchEnd, false)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false)
  if (scrollContent.value) {
    scrollContent.value.removeEventListener('touchstart', handleTouchStart, false)
    scrollContent.value.removeEventListener('touchmove', handleTouchMove, false)
    scrollContent.value.removeEventListener('touchend', handleTouchEnd, false)
  }
})

</script>

<style scoped>
</style>