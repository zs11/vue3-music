<template>
  <section class="tab-cont">
    <search @search-tab-click="handleSearchBarClick"></search>
    <section class="recommend-row" :style="{ display: contShow }">
      <section class="recommend-title flex-box">
        <h2 class="tit-txt txt-2">hi今日为你打造</h2>
        <a class="tit-more txt-2" href="javascript:;">更多</a>
      </section>
      <section class="scroll-wrap">
        <section class="card-scroll">
          <div class="card-list">
            <radio-card></radio-card>
            <card :card-data="cardData1"></card>
            <card :card-data="cardData2"></card>
            <card :card-data="cardData3"></card>
            <card :card-data="cardData4"></card>
            <card :card-data="cardData5"></card>
            <card :card-data="cardData6"></card>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup>
import Search from '../../components/search/search.vue'
import RadioCard from '../../components/card/radioCard.vue'
import Card from '../../components/card/card.vue'
import { ref } from 'vue'

const cardData1 = {
  img: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1",
  playNum: 55860185,
  title: "欧美| 流行节奏控",
  cardType: 1,
  classify: 1
}
const cardData2 = {
  img: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q4X4NiaWS01Fvtn063nqHY2Q/300?n=1",
  playNum: 55860185,
  title: "欧美| 欧美| 流行轻有氧",
  cardType: 1,
  classify: 1
}
const cardData3 = {
  img: "https://qpic.y.qq.com/music_cover/MKjEtF7diatibd6B0iaeF5KguYHTWhScOADLtR9xjUjEEz5uYMCCKOA9w/300?n=1",
  playNum: 55860185,
  title: "最·陈奕迅",
  cardType: 1,
  classify: 1
}
const cardData4 = {
  img: "https://qpic.y.qq.com/music_cover/4pmnRu5sL5QbtO8OS8NKJU7UhBRvQcdookqiaqkurvWR8j7PKeyzcFA/300?n=1",
  playNum: 55860185,
  title: "古典| 美妙心情",
  cardType: 1,
  classify: 1
}
const cardData5 = {
  img: "https://qpic.y.qq.com/music_cover/4pmnRu5sL5QbtO8OS8NKJU7UhBRvQcdookqiaqkurvWR8j7PKeyzcFA/300?n=1",
  playNum: 55860185,
  title: "古典| 美妙心情",
  cardType: 1,
  classify: 1
}
const cardData6 = {
  img: "https://qpic.y.qq.com/music_cover/4pmnRu5sL5QbtO8OS8NKJU7UhBRvQcdookqiaqkurvWR8j7PKeyzcFA/300?n=1",
  playNum: 55860185,
  title: "古典| 美妙心情",
  cardType: 1,
  classify: 1
}

const contShow = ref('block')

const handleSearchBarClick = (show) => {
  contShow.value = show ? 'none' : 'block'
}
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
</style>