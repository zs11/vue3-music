<template>
  <main class="short-video">
    <section class="video-swiper-container">
      <swiper :direction="'vertical'" class="video-swiper"
        @swiper="swiperHandle" @slideChange="slideChangeHandle">
        <swiper-slide v-for="(video, index) in videos" :key="video.id">
          <div :id="`video${index}`" class="video-wrap" v-if="index === videoIdx"></div>
          <div class="video-img-background"></div>
        </swiper-slide>
      </swiper>
    </section>
  </main>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import XGPlayer from 'xgplayer'
import VPlayer from '../../components/videoPlayer'
import request from '../../config/request'
import { onMounted, defineEmits, ref, nextTick, reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

SwiperCore.use([Pagination])

// 进入/离开视频页事件
const emitter = defineEmits(['videoEvent'])

emitter('videoEvent', true)

onBeforeRouteLeave(() => {
  emitter('videoEvent', false)
})

// 视频数据初始化
const videos = ref([])
const baseConfig = {
  width: '100%',
  height: '100%',
  autoplay: true,
  fullScreen: true
}
onMounted(async () => {
  const res = await request({
    url: '/short-video/all-videos',
    method: 'GET'
  })
  videos.value = res.data
  nextTick(() => {
    const videoId = `video0`
    const { video, author, desc } = videos.value[0]
    new VPlayer({
      id: videoId,
      url: video,
      info: {
        author,
        desc
      },
      ...baseConfig
    })
  })
})

// 视频懒加载处理
const videoSwiper = ref(null)
const videoIdx = ref(0)

const swiperHandle = (_videoSwiper) => {
  videoSwiper.value = _videoSwiper
}

const slideChangeHandle = () => {
  const { swipeDirection, activeIndex } = videoSwiper.value
  videoIdx.value = activeIndex
  const videoId = `video${activeIndex}`
  const { video, author, desc } = videos.value[activeIndex]
  nextTick(() => {
    new VPlayer({
      id: videoId,
      url: video,
      info: {
        author,
        desc
      },
      ...baseConfig
    })
  })
}
</script>

<style scoped>
.short-video {
  position: relative;
}
.video-swiper-container {
  height: calc(100vh);
}
.video-swiper {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
}
.video-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: .14rem;
  user-select: none;
  overflow: hidden;
}
.video-wrap video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
}
</style>