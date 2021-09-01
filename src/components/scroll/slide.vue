<template>
  <section class="music-slide">
    <div class="slide-wrapper" ref="slideRef" :class="{ 'raduis-slide' : slideConfig.raduis }">
      <div class="slide-content">
        <div v-for="num in slideConfig.nums" class="slide-page" :key="num">
          <img :src="slideConfig.getImgPath(num)" :alt="`slide${num}`" class="slide-img">
        </div>
      </div>
    </div>
    <div class="dots-wrapper" v-if="slideConfig.dot">
      <span
        class="dot"
        v-for="num in slideConfig.nums"
        :key="num"
        :class="{ active: config.currentPageIndex === (num - 1)}"></span>
    </div>
  </section>
</template>

<script setup>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { defineProps, reactive, ref, onMounted } from 'vue'

BScroll.use(Slide)

// Slide配置
const props = defineProps({
  slideConfig: {
    required: true,
    type: Object
  }
})

const slideRef = ref('slideRef')

const config = reactive({
  currentPageIndex: 0,
  slide: null
})

const slideInit = () => {
  config.slide = new BScroll(slideRef.value, {
    scrollX: true,
    scrollY: false,
    slide: {
      loop: true,
      autoplay: true
    },
    momentum: false,
    bounce: false,
    probeType: 3
  })
  config.slide.on('scrollEnd', () => {

  })
  config.slide.on('slideWillChange', (page) => {
    config.currentPageIndex = page.pageX
  })
  config.slide.on('slidePageChanged', (page) => {
    // console.log(page)
  })
}

// 初始化slide
onMounted(() => {
  slideInit()
})
</script>

<style scoped>
.music-slide {
  position: relative;
}
.music-slide .slide-wrapper {
  min-height: 1px;
  overflow: hidden;
}
.music-slide .raduis-slide {
  border-radius: .1rem;
}
.slide-wrapper .slide-content {
  height: 1.42rem;
  white-space: nowrap;
  font-size: 0;
}
.slide-wrapper .slide-content .slide-page {
  display: inline-block;
  height: 1.42rem;
  width: 100%;
  line-height: 1.42rem;
  text-align: center;
  font-size: .26rem;
}
.slide-img {
  width: 100%;
  height: 100%;
}
.dots-wrapper {
  position: absolute;
  bottom: .06rem;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.dots-wrapper .dot {
  display: inline-block;
  margin: 0 .04rem;
  width: .08rem;
  height: .08rem;
  border-radius: 50%;
  background: #eee;
}
.dots-wrapper .dot.active {
  width: .2rem;
  border-radius: .05rem;
}
</style>