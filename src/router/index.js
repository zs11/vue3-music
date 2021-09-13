import { createRouter, createWebHistory } from "vue-router"
import Recommend from '../views/recommend/recommend.vue'
import Singer from '../views/singer/singer.vue'
import TopList from '../views/topList/topList.vue'
import VideoStream from '../views/shortVideo/videoStream.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/top-list',
    component: TopList
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/video',
    component: VideoStream
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router