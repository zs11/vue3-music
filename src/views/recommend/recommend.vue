<template>
  <section class="tab-cont">
    <search @search-tab-click="handleSearchBarClick"></search>
    <section class="recomment-cont" :style="{ display: contShow }">
      <section class="recommend-row">
        <div class="recommend-slide">
          <slide :slideConfig="slideConfig"></slide>
        </div>
      </section>
      <section class="recommend-row">
        <section class="recommend-title flex-box">
          <h2 class="tit-txt txt-2">hi今日为你打造</h2>
          <a class="tit-more txt-2" href="javascript:;">更多</a>
        </section>
        <section class="scroll-wrap">
          <section class="card-scroll">
            <div class="card-list">
              <radio-card></radio-card>
              <card v-for="card in recommendCard" :key="card.id" :card-data="card"></card>
            </div>
          </section>
        </section>
      </section>
      <section class="recommend-row">
        <section class="recommend-title flex-box">
          <h2 class="tit-txt txt-2">歌单补给站</h2>
          <a class="tit-more txt-2" href="javascript:;">更多</a>
        </section>
        <section class="scroll-wrap">
          <section class="card-scroll">
            <div class="card-list">
              <card v-for="card in supplyCard" :key="card.id" :card-data="card"></card>
            </div>
          </section>
        </section>
      </section>
      <section class="recommend-row">
        <section class="recommend-title flex-box">
          <h2 class="tit-txt txt-2">大家都在听</h2>
          <a class="tit-more txt-2" href="javascript:;">更多</a>
        </section>
        <section class="scroll-wrap">
          <section class="card-scroll">
            <div class="card-list gird-box gird-list">
              <single-card v-for="card in singleCard" :key="card.id" :card-data="card"></single-card>
            </div>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup>
import Search from '../../components/search/search.vue'
import Card from '../../components/card/card.vue'
import RadioCard from '../../components/card/radioCard.vue'
import SingleCard from '../../components/card/singleCard.vue'
import Slide from '../../components/scroll/slide.vue'
import request from '../../config/request'
import { reactive, ref, onMounted, computed } from 'vue'

const contShow = ref('block')

const cardData = ref([])

// slide配置，其中 nums, getImgPath为必填配置
const slideConfig = reactive({
  nums: 6,
  raduis: true,
  dot: true,
  getImgPath: (num) => {
    const path = `../../assets/img/homeSlide/slide${num}.png`
    const modules = import.meta.globEager("../../assets/img/homeSlide/slide*.png")
    return modules[path].default
  } 
})

const handleSearchBarClick = (show) => {
  contShow.value = show ? 'none' : 'block'
}

// 请求card数据
onMounted(async () => {
  const res = await request({
    url: '/recommend/cards',
    method: 'GET',
  })
  cardData.value = res.data
})

const recommendCard = computed(() => {
  return cardData.value.filter(val => val.classify === 1)
})

const supplyCard = computed(() => {
  return cardData.value.filter(val => val.classify === 2)
})

const singleCard = computed(() => {
  return cardData.value.filter(val => val.classify === 3)
})


</script>

<style scoped>
.recommend-row {
  position: relative;
  margin-top: .2rem;
}
.recommend-title {
  align-items: center;
  height: .3rem;
  margin: 0 .16rem .1rem;
}
.recommend-title .tit-txt {
  font-size: .16rem;
  font-weight: 600;
}
.recommend-title .tit-more {
  margin-left: auto;
}
.scroll-wrap {
  overflow: hidden;
}
.card-scroll {
  padding-bottom: .1rem;
  margin-bottom: -.1rem;
  overflow-x: auto;
  overflow-y: hidden;
}
.card-list {
  margin-left: .12rem;
  white-space: nowrap;
}
.recommend-slide {
  margin: 0 .2rem;
}
.gird-list {
  grid-template-columns: 2.8rem 2.8rem 2.8rem;
  grid-template-rows: .52rem .52rem .52rem;
  row-gap: .2rem;
}
</style>