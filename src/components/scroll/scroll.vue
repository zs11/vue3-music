<template>
  <div class="scroll-wrap wrapper" ref="scrollRef">
    <slot></slot>
  </div>
</template>

<script setup>
import BScroll from 'better-scroll'
import { ref, nextTick, defineProps, onMounted, defineEmits, watch } from 'vue'

// scroll props
const props = defineProps({
  probeType: {
    type: Number,
    default: 1
  },
  click: {
    type: Boolean,
    default: true
  },
  scrollX: {
    type: Boolean,
    defaultf: false
  },
  scrollY: {
    type: Boolean,
    default: true
  },
  listenScroll: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: null
  },
  pullup: {
    type: Boolean,
    default: false
  },
  pulldown: {
    type: Boolean,
    default: false
  },
  beforeScroll: {
    type: Boolean,
    default: false
  },
  refreshDelay: {
    type: Number,
    default: 20
  }
})

// scroll ref
const scrollRef = ref(null)
const _scroll = ref(null)

// scroll methods
const emitter = defineEmits(['scroll', 'scrollToEnd', 'touchToEnd', 'beforeScroll'])

const initScroll = () => {
  if (!scrollRef.value) {
    return
  }
  _scroll.value = new BScroll(scrollRef.value, {
    probeType: props.probeType,
    click: props.click,
    scrollX: props.scrollX,
    scrollY: props.scrollY
  })

  // listen scroll
  if (props.listenScroll) {
    _scroll.value.on('scroll', (pos) => {
      console.log(pos.y);
      emitter('scroll', pos)
    })
  }

  // listen pullup(上拉)
  if (props.pullup) {
    _scroll.value.on('scrollEnd', () => {
      emitter('scrollToEnd')
    })
  }

  // listen pulldown(下拉)
  if (props.pulldown) {
    _scroll.value.on('touchEnd', (pos) => {
      console.log(pos.y);
    })
  }

  // listen beforeScroll
  if (props.beforeScroll) {
    _scroll.value.on('beforeScrollStart', () => {
      emitter('beforeScroll')
    })
  }
}

const disable = () => {
  _scroll.value && _scroll.value.disable()
}

const enable = () => {
  _scroll.value && _scroll.value.enable()
}

const refresh = () => {
  _scroll.value && _scroll.value.refresh()
}

const scrollTo = (...rest) => {
  _scroll.value && _scroll.value.scrollTo.call(_scroll.value, ...rest)
}

const scrollToElement = (...rest) => {
  _scroll.value && _scroll.value.scrollToElement.call(_scroll.value, ...rest)
}

// scroll init
onMounted(() => {
  nextTick(() => {
    initScroll()
  })
})

// watch data change
watch(() => props.data, () => {
  setTimeout(() => {
    refresh()
  }, props.refreshDelay)
})
</script>

<style scoped>
.scroll-wrap {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>