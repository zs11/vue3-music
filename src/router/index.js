import { createRouter, createWebHistory } from "vue-router"
import Recommend from '../views/recommend/recommend.vue'
import Singer from '../views/singer/singer.vue'
import TopList from '../views/topList/topList.vue'

const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'current txt-3'
})

export default router