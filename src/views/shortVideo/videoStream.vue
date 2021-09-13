<template>
  <main class="video-stream">
    <div class="stream-wrap">
      <scroll
        :data="videos"
        :pulldown="scrollConfig.pulldown"
        :pullup="scrollConfig.pullup"
      >
        <div class="scroll-content">
          <div class="refresh">
            下拉刷新
          </div>
          <div class="video-card bg-1" v-for="(video, index) in videos" :key="video.id">
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
      </scroll>
    </div>
  </main>
</template>

<script setup>
import { onMounted, defineEmits, ref, nextTick, reactive, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Scroll from '../../components/scroll/scroll.vue';
import VPlayer from '../../components/videoPlayer'
import request from '../../config/request'

//config
const baseConfig = {
  width: '100%',
  height: '100%',
}

const scrollConfig = {
  pulldown: true,
  pullup: true
}

// 视频数据初始化
const videos = ref([])
onMounted(async () => {
  const res = await request({
    url: '/short-video/all-videos',
    method: 'GET'
  })
  videos.value = res.data
  // nextTick(() => {
  //   const idx = videoIdx.value
  //   const id = `video${idx}`
  //   const { video } = videos.value[idx]
  //   new VPlayer({
  //     id,
  //     url: video,
  //     ...baseConfig
  //   })
  // })
})

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
  margin-bottom: .1rem;
  overflow: hidden;
}
.refresh {
  height: .42rem;
  line-height: .42rem;
  text-align: center;
  padding-top: .28rem;
}
.video-footer {
  padding: 0 .16rem;
}
.video-footer .video-desc {
  margin-top: .1rem;
  padding-bottom: .1rem;
  font-size: .14rem;
  line-height: .14rem;
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
.video-wrap .video-player {
  
}
</style>