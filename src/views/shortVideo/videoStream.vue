<template>
  <main class="video-stream" ref="videoRef">
    <div class="stream-wrap">
      <scroll
        :data="videos"
        :pulldown="scrollConfig.pulldown"
        :pullup="scrollConfig.pullup"
        :listenScroll="scrollConfig.listenScroll"
        :probeType="scrollConfig.probeType"
        :momentumLimitTime="scrollConfig.momentumLimitTime"
        :refreshDelay="scrollConfig.refreshDelay"
        :update="update"
        @scrollToEnd="handleScrollEnd"
        @scroll="handleScroll"
      >
        <div class="scroll-content">
          <div class="refresh">
            下拉刷新
          </div>
          <div class="video-card" v-for="(video, index) in videos" :key="video.id">
            <div class="bg-1">
              <div class="video-top flex-box">
                <div class="avatar-box">
                  <img :src="video.authorImg" alt="avatar" class="avatar-img">
                </div>
                <div class="author-box">
                  <h3 class="author-name">{{video.author}}</h3>
                  <h4 class="author-intro">{{'优质视频博主'}}</h4>
                </div>
                <div class="follow-share-box">
                  <svg t="1631517865008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2601" width="22" height="22"><path d="M206.116734 596.023523c46.398166-0.727906 83.429277-38.940285 82.701371-85.336645-0.717069-46.40539-38.927642-83.438308-85.325808-82.710401-46.407197 0.7261-83.438308 38.927642-82.710402 85.334838 0.727906 46.409003 38.927642 83.429277 85.334839 82.712208zM820.51854 596.023523c46.396359-0.727906 83.427471-38.940285 82.699565-85.336645-0.717069-46.40539-38.927642-83.438308-85.325808-82.710401-46.407197 0.7261-83.438308 38.927642-82.710402 85.334838 0.729713 46.409003 38.927642 83.429277 85.336645 82.712208zM513.313122 596.023523c46.407197-0.727906 83.438308-38.940285 82.710401-85.336645-0.729713-46.40539-38.927642-83.438308-85.336645-82.710401-46.396359 0.7261-83.427471 38.927642-82.710401 85.334838 0.729713 46.409003 38.929448 83.429277 85.336645 82.712208z" fill="#939393" p-id="2602"></path></svg>
                </div>
              </div>
              <div class="video-main">
                <div :id="`video${index}`" class="video-wrap"></div>
              </div>
              <div class="video-footer">
                <div class="video-desc">{{video.desc}}</div>
                <div class="video-interaction flex-box">
                  <div class="video-comment flex-box">
                    <div class="comment-icon">
                      <svg t="1631534778013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4256" width="18" height="18"><path d="M176 193c-17.673 0-32 14.327-32 32v481c0 17.673 14.327 32 32 32h27c51.915 0 94 42.085 94 94v45.5a1.94 1.94 0 0 0 3.293 1.388l117.045-114.176A94 94 0 0 1 482.976 738H848c17.673 0 32-14.327 32-32V225c0-17.673-14.327-32-32-32H176z m0-80h672c61.856 0 112 50.144 112 112v481c0 61.856-50.144 112-112 112H482.976a14 14 0 0 0-9.776 3.978L356.156 936.154c-32.394 31.6-84.271 30.956-115.87-1.437A81.94 81.94 0 0 1 217 877.5V832c0-7.732-6.268-14-14-14h-27c-61.856 0-112-50.144-112-112V225c0-61.856 50.144-112 112-112z m336 438c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z m228 0c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z m-456 0c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64z" p-id="4257" fill="#515151"></path></svg>
                    </div>
                    <div class="comment-number">{{formatInteraction(video.comment)}}</div>
                  </div>
                  <div class="video-like flex-box">
                    <div class="like-icon">
                      <svg t="1631534587556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2206" width="18" height="18"><path d="M598.354747 67.542626c-48.148687 0-90.130101 32.905051-98.960808 79.437576 0 0-14.312727 72.882424-21.798787 99.090101-12.308687 43.196768-55.363232 90.944646-86.522829 106.188283-23.531313 11.636364-110.99798 11.765657-116.350707 11.765656H155.707475c-32.762828 0-59.384242 26.479192-59.384243 59.384243v475.022222c0 32.762828 26.479192 59.384242 59.384243 59.384242h548.033939c88.126061 0 163.025455-64.452525 176.135758-151.647676l45.873131-305.713132c10.834747-71.809293-44.8-136.274747-117.423838-136.274747H673.254141s20.066263-66.469495 30.228687-178.669899c5.081212-56.837172-35.167677-110.99798-94.280404-117.152323-3.620202-0.54303-7.227475-0.814545-10.847677-0.814546zM333.705051 898.288485V421.533737c38.917172-2.534141 66.999596-8.016162 83.574949-16.316767 43.726869-21.669495 99.633131-81.040808 117.281616-143.088485 7.899798-27.681616 21.39798-96.155152 23.001212-104.184243 3.47798-17.92 20.596364-31.159596 40.649697-31.159596 1.603232 0 3.206465 0.129293 4.822627 0.271516 28.211717 2.947879 43.326061 29.698586 41.32202 52.686868-9.360808 103.912727-27.823838 166.503434-28.082425 166.904243l-23.130505 76.489697h215.182223c17.519192 0 33.564444 7.356768 45.071515 20.596363 11.507071 13.239596 16.316768 30.228687 13.640404 47.618586L821.294545 797.052121c-8.830707 58.569697-58.181818 101.094141-117.423838 101.094142h-370.165656v0.142222z m-177.997576 0v-475.022222h118.626262v475.022222H155.707475z m0 0" p-id="2207" fill="#515151"></path></svg>
                    </div>
                    <div class="like-number">{{formatInteraction(video.like)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="loading load-anim" :class="{hide: !loading}">
            <svg t="1631634924896" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2546" width="32" height="32"><path d="M512 337.322667a26.666667 26.666667 0 0 1-26.666667-26.666667V197.333333a26.666667 26.666667 0 1 1 53.333334 0v113.322667c0 14.762667-11.946667 26.666667-26.666667 26.666667z" fill="#000000" p-id="2547"></path><path d="M424.661333 360.746667a26.666667 26.666667 0 0 1-36.394666-9.728l-56.661334-98.133334a26.666667 26.666667 0 0 1 46.122667-26.666666l56.661333 98.133333a26.624 26.624 0 0 1-9.728 36.394667z" fill="#000000" opacity=".9" p-id="2548"></path><path d="M360.746667 424.661333a26.624 26.624 0 0 1-36.394667 9.728l-98.133333-56.661333a26.624 26.624 0 1 1 26.666666-46.122667l98.133334 56.661334c12.714667 7.338667 17.066667 23.68 9.728 36.394666z" fill="#000000" opacity=".85" p-id="2549"></path><path d="M337.322667 512c0 14.72-11.946667 26.666667-26.666667 26.666667H197.333333a26.666667 26.666667 0 1 1 0-53.333334h113.322667c14.762667 0 26.666667 11.946667 26.666667 26.666667z" fill="#000000" opacity=".8" p-id="2550"></path><path d="M360.746667 599.338667a26.666667 26.666667 0 0 1-9.728 36.394666l-98.133334 56.661334a26.666667 26.666667 0 0 1-26.666666-46.122667l98.133333-56.661333a26.624 26.624 0 0 1 36.394667 9.728z" fill="#000000" opacity=".75" p-id="2551"></path><path d="M424.661333 663.253333a26.624 26.624 0 0 1 9.728 36.394667l-56.661333 98.133333a26.624 26.624 0 1 1-46.122667-26.666666l56.661334-98.133334a26.666667 26.666667 0 0 1 36.394666-9.728z" fill="#000000" opacity=".7" p-id="2552"></path><path d="M512 686.677333c14.72 0 26.666667 11.946667 26.666667 26.666667v113.322667a26.666667 26.666667 0 1 1-53.333334 0v-113.322667c0-14.762667 11.946667-26.666667 26.666667-26.666667z" fill="#000000" opacity=".65" p-id="2553"></path><path d="M599.338667 663.253333a26.666667 26.666667 0 0 1 36.394666 9.728l56.661334 98.133334a26.666667 26.666667 0 0 1-46.122667 26.666666l-56.661333-98.133333a26.624 26.624 0 0 1 9.728-36.394667z" fill="#000000" opacity=".6" p-id="2554"></path><path d="M663.253333 599.338667a26.624 26.624 0 0 1 36.394667-9.728l98.133333 56.661333a26.624 26.624 0 1 1-26.666666 46.122667l-98.133334-56.661334a26.666667 26.666667 0 0 1-9.728-36.394666z" fill="#000000" opacity=".55" p-id="2555"></path><path d="M686.677333 512c0-14.72 11.946667-26.666667 26.666667-26.666667h113.322667a26.666667 26.666667 0 1 1 0 53.333334h-113.322667a26.666667 26.666667 0 0 1-26.666667-26.666667z" fill="#000000" opacity=".5" p-id="2556"></path><path d="M663.253333 424.661333a26.666667 26.666667 0 0 1 9.728-36.394666l98.133334-56.661334a26.666667 26.666667 0 0 1 26.666666 46.122667l-98.133333 56.661333a26.624 26.624 0 0 1-36.394667-9.728z" fill="#000000" opacity=".4" p-id="2557"></path><path d="M599.338667 360.746667a26.624 26.624 0 0 1-9.728-36.394667l56.661333-98.133333a26.624 26.624 0 1 1 46.122667 26.666666l-56.661334 98.133334a26.666667 26.666667 0 0 1-36.394666 9.728z" fill="#000000" opacity=".3" p-id="2558"></path></svg>
            <!-- <svg t="1631634968278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2704" width="32" height="32"><path d="M351.6 671.7c-20.1-20.1-35.6-39.9-56.4-39.9-12.3 0-26.5 7-44.6 25.1-48.6 48.6-106.9 158.7-74.9 190.7 6.4 6.4 15.8 9.2 27.3 9.2 46.1 0 124.5-45.1 163.4-84 48.6-48.7 17.2-69.1-14.8-101.1zM243.7 779.5c11.8-25 30.3-54.8 50.1-75.3 1 1.1 2 2.1 3 3.1 3.1 3.2 6.2 6.4 9.5 9.7 3.3 3.3 6.5 6.4 9.7 9.5 1 0.9 2 1.9 3.1 3-19.8 18.9-49.8 37.9-75.4 50zM686.2 236c-56.4 0-102.1 45.7-102.1 102.1 0 56.4 45.7 102.1 102.1 102.1 56.4 0 102.1-45.7 102.1-102.1 0-56.4-45.7-102.1-102.1-102.1z m0 140.1c-21 0-38-17.1-38-38s17.1-38 38-38c21 0 38 17.1 38 38s-17 38-38 38z" fill="#ff8200" p-id="2705"></path><path d="M865.7 157.5c-20.1-20.1-54.7-29.4-97.1-29.4-109.4 0-270.8 62-369.8 161-16.5 16.5-30.7 33-42.9 49.3l-77.3-25c-1.7-0.6-3.5-0.8-5.2-0.8-5.5 0-10.7 2.6-14 7.3L139.7 490.7c-6.6 9.4-2.2 22.5 8.7 26l163 52.6c12.1 31.2 31.4 60 56.9 85.5 25.4 25.4 54.1 44.6 85.1 56.7L506 874.3c2.4 7.4 9.2 11.8 16.2 11.8 3.3 0 6.7-1 9.7-3.1l171-119.7c6.1-4.3 8.7-12 6.4-19.1l-24.8-76.7c16.5-12.3 33-26.5 49.6-43.1 137.4-137.3 206.6-391.9 131.6-466.9zM646.3 616.2l-36.7 27.4 14.1 43.6 14.1 43.7-90.3 63.2-33-102.2-9.3-28.9-28.3-11.1c-22.6-8.8-43.9-23.1-63.1-42.3-19.3-19.3-33.6-40.7-42.4-63.4l-11-28.4-29-9.4-102.5-33.1 63.2-90.3 44.3 14.3 43.6 14.1 27.4-36.7c10.8-14.4 23.2-28.7 36.9-42.4 89-89 234.9-142.2 324.5-142.2 32.6 0 48.2 7 51.8 10.7 33.3 33.3-1.1 245.9-131.6 376.3-13.9 13.8-28.3 26.3-42.7 37.1z" fill="#ff8200" p-id="2706"></path></svg> -->
          </div>
          <div class="no-more" :class="{hide: !(end && !loading)}">
            <span>没有更多内容了... ( •̀ ω •́ )y</span>
          </div>
        </div>
      </scroll>
    </div>
  </main>
</template>

<script setup>
import { onMounted, defineEmits, ref, nextTick, reactive, watch, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Scroll from '../../components/scroll/scroll.vue';
import VPlayer from '../../components/videoPlayer'
import request from '../../config/request'

//config
const baseConfig = {
  width: '100%',
  height: '100%',
  preload: 'none'
}

const scrollConfig = {
  pulldown: true,
  pullup: true,
  listenScroll: true,
  probeType: 1,
  momentumLimitTime: 100,
  refreshDelay: 100
}

// 视频数据初始化
const videos = ref([])
const videosHeight = ref([0])
const requestConfig = reactive({
  skip: 0,
  take: 5,
})

onMounted(async () => {
  const res = await request({
    url: '/short-video/all-videos',
    method: 'GET',
    params: {
      skip: requestConfig.skip,
      take: requestConfig.take
    }
  })
  const { data } = res
  const len = data.length
  videos.value = data
  requestConfig.skip = requestConfig.skip + len
  nextTick(() => {
    data.forEach((val, index) => {
      const id = `video${index}`
      const { video, img } = videos.value[index]
      new VPlayer({
        id,
        url: video,
        poster: img,
        ...baseConfig
      })
      setTimeout(() => {
        videoHeightCount(`#${id}`, true)
      }, 100)
    })
  })
})

const videoHeightCount = (selector, needLoad) => {
  const startHeight = videosHeight.value[videosHeight.value.length - 1]
  const dom = document.querySelector(selector)
  const wrapper = dom && dom.parentNode.parentNode.parentNode
  if (wrapper) {
    const height = wrapper.clientHeight
    if (needLoad) {
      turnToLoad(dom, startHeight)
    }
    videosHeight.value.push(startHeight + height)
  }
}


// 视频播放idx
const videoIdx = ref(0)


// 视频页进入事件
const emitter = defineEmits(['videoEvent'])
emitter('videoEvent', true)

onBeforeRouteLeave(() => {
  emitter('videoEvent', false)
})


// 格式化互动数量
const formatInteraction = (num) => {
  return num >= 10000 ? (num / 10000).toFixed(1) + 'w' : num
}

// 视频初始化


// 下拉加载处理 / 上拉刷新处理
const loading = ref(false)
const end = ref(false)
const update = ref(false)

const handleScrollEnd = async () => {
  loading.value = true
  update.value = true
  const res = await request({
    url: '/short-video/all-videos',
    method: 'GET',
    params: {
      skip: requestConfig.skip,
      take: requestConfig.take
    }
  })
  loading.value = false
  update.value = false
  const { data } = res
  if (data && data.length > 0) {
    videos.value = videos.value.concat(data)
    const start = requestConfig.skip
    nextTick(() => {
      data.forEach((val, index) => {
        const id = `video${start + index}`
        const { video, img } = videos.value[start + index]
        new VPlayer({
          id,
          url: video,
          poster: img,
          ...baseConfig
        })
        setTimeout(() => {
          videoHeightCount(`#${id}`)
        }, 100)
      })
    })
    const len = data.length
    requestConfig.skip = requestConfig.skip + len
  } else {
    end.value = true
  }
}

// 处理拖动
const loadIdx = reactive({
  start: 0,
  count: 0
})
const videoRef = ref(null)
const handleScroll = (pos) => {
  let y = Math.abs(pos.y)
  const loc = videosHeight.value[loadIdx.count + 1]
  if (y >= loc) {
    const selector = `#video${loadIdx.start + loadIdx.count} video`
    const video = document.querySelector(selector)
    if (video) {
      video.setAttribute('preload', 'auto')
      loadIdx.count += 1
    }
  }
}

const turnToLoad = (ele, loc) => {
  const height = videoRef.value.clientHeight
  const video = ele.querySelector('video')
  if (loc <= height) {
    video.setAttribute('preload', 'auto')
    loadIdx.start += 1
  }
}
</script>

<style scoped>
.video-stream {
  position: relative;
  background: #f2f2f2;
}
.stream-wrap {
}
.avatar-box {
  width: .36rem;
  height: .36rem;
}
.avatar-box .avatar-img {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.author-box {
  flex: 1;
  margin-left: .08rem;
}
.author-box .author-name {
  color: #333;
  font-weight: 400;
  font-size: .14rem;
  line-height: 1.5;
}
.author-box .author-intro {
  color: #939393;
  line-height: 1.5;
}
.follow-share-box {
}
.video-top {
  align-items: center;
  padding: .12rem;
}
.video-card {
  overflow: hidden;
  padding-bottom: .1rem;
  background: #f2f2f2;
}
.refresh {
  height: .42rem;
  line-height: .42rem;
  text-align: center;
  padding-top: .28rem;
}
.video-footer {
  padding: 0 .16rem;
  margin-top: .1rem;
}
.video-footer .video-desc {
  overflow: hidden;
  padding-bottom: .1rem;
  font-size: .14rem;
  line-height: 1.5;
  height: auto;
  border-bottom: .01rem solid #e6e6e6;
}
.video-interaction {
  align-items: center;
  justify-content: flex-end;
  padding-bottom: .1rem;
}
.video-interaction svg {
  display: block;
}
.video-comment, .video-like {
  align-items: center;
  margin-top: .08rem;
}
.comment-icon, .like-icon {
  margin-right: .04rem;
}
.video-comment {
  margin-right: .2rem;
}
.video-wrap {
  position: relative;
}
.video-main {
  overflow: hidden;
}
.video-wrap .video-player {
  
}
.loading {
  background-color: #f2f2f2;
  text-align: center;
}
.load-anim svg {
  animation: rotate 1s linear infinite;
  /* animation: rocket 1s linear infinite; */
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rocket {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(.06rem, -.06rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.no-more {
  background-color: #f2f2f2;
  text-align: center;
  padding: .1rem 0;
}
.no-more span {
  font-size: .14rem;
  line-height: .14rem;
}
</style>