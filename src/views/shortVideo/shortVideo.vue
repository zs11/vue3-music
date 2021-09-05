<template>
  <main class="short-video">
    <section class="video-swiper-container">
      <swiper :direction="'vertical'" class="video-swiper"
        @swiper="swiperHandle" @slideChange="slideChangeHandle">
        <swiper-slide v-for="(video, index) in videos" :key="video.id">
          <div :id="`video${index}`" class="video-wrap" v-if="index === videoIdx">
            <div class="video-right-bar">
              <div class="video-interaction">
                <div class="video-author">
                  <img :src="interaction.authorImg" alt="author" class="author-img">
                </div>
                <div class="video-like">
                  <div class="like-icon">
                    <svg t="1630834294910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2196" width="32" height="32"><path d="M535.9 216.7l-22.9 23-22.9-23.1c-89.2-89.7-234.3-90.1-323.9-0.8l-0.8 0.8c-89.7 90.1-89.7 235.8 0 326L476 859.3c20.1 20.4 52.9 20.7 73.4 0.7l0.7-0.7 310.7-316.7c89.7-90.1 89.7-235.8 0-326-89.2-89.7-234.3-90.1-323.9-0.9l-1 1z" p-id="2197" fill="#ffffff"></path></svg>
                  </div>
                  <div class="like-number">{{interaction.like}}</div>
                </div>
                <div class="video-comment">
                  <div class="comment-icon">
                    <svg t="1630834392571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3075" width="32" height="32"><path d="M379.733333 913.066667h-8.533333c-21.333333-4.266667-38.4-17.066667-46.933333-34.133334l-29.866667-72.533333H226.133333c-76.8 0-140.8-64-140.8-140.8V251.733333C85.333333 170.666667 149.333333 110.933333 226.133333 110.933333h571.733334C874.666667 110.933333 938.666667 170.666667 938.666667 251.733333v413.866667c0 76.8-64 140.8-140.8 140.8h-307.2l-64 85.333333c-8.533333 12.8-25.6 21.333333-46.933334 21.333334zM226.133333 174.933333c-42.666667 0-76.8 34.133333-76.8 76.8v413.866667c0 42.666667 34.133333 76.8 76.8 76.8h110.933334l42.666666 102.4 76.8-102.4h337.066667c42.666667 0 76.8-34.133333 76.8-76.8V251.733333c0-42.666667-34.133333-76.8-76.8-76.8H226.133333z" p-id="3076" fill="#ffffff"></path><path d="M285.866667 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="3077" fill="#ffffff"></path><path d="M512 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="3078" fill="#ffffff"></path><path d="M738.133333 469.333333m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" p-id="3079" fill="#ffffff"></path></svg>
                  </div>
                  <div class="comment-number">{{interaction.comment}}</div>
                </div>
              </div>
            </div>
          </div>
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
import { onMounted, defineEmits, ref, nextTick, reactive, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

SwiperCore.use([Pagination])

// 进入/离开视频页事件
const emitter = defineEmits(['videoEvent'])

emitter('videoEvent', true)

onBeforeRouteLeave(() => {
  emitter('videoEvent', false)
})

// 互动数据 / 处理
const interaction = reactive({
  authorImg: '',
  like: 0,
  comment: 0
})

const formatInteraction = (authorImg, like, comment) => {
  interaction.authorImg = authorImg
  if (like >= 10000) {
    interaction.like = (like / 10000).toFixed(1) + 'w'
  } else {
    interaction.like = like
  }
  if (comment >= 10000) {
    interaction.comment = (comment / 10000).toFixed(1) + 'w'
  } else {
    interaction.comment = comment
  }
}

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
    const { video, author, desc, authorImg, like, comment } = videos.value[0]
    formatInteraction(authorImg, like, comment)
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
  const { video, author, desc, authorImg, like, comment } = videos.value[activeIndex]
  formatInteraction(authorImg, like, comment)
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
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
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
.video-right-bar {
  position: absolute;
  color: #fff;
  right: .16rem;
  bottom: 30%;
}
.video-right-bar .video-interaction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.video-interaction {
  opacity: .9;
}
.video-interaction .icon {
  display: block;
}
.video-interaction .like-icon, .video-interaction .comment-icon, .video-interaction .like-number, .video-interaction .comment-number {
  display: flex;
  align-items: center;
  justify-content: center;
}
.like-icon, .comment-icon {
  margin-bottom: .02rem;
}
.like-number, .comment-number {
  margin-bottom: .16rem;
}
.video-author {
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  border: 1px solid #f1f2f5;
  background-color: #e6e7ee;
  overflow: hidden;
  margin-bottom: .26rem;
}
.video-author .author-img {
  width: 100%;
  height: 100%;
}
</style>