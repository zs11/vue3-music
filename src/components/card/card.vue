<template>
  <div class="music-card">
    <div class="card-box">
      <div class="music-media">
        <img :src="cardData.img" alt="media" class="media-img">
        <div class="media-play"></div>
      </div>
      <div class="music-title">
        <h3 class="tit-txt txt-2">{{cardData.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// cardData = {
//   img: "http",
//   playNum: 0,
//   title: "xxx",
//   cardType: 1,
//   classify: 1
// }

const props = defineProps({
  cardData: {
    required: true
  }
})
</script>

<style scoped>
.music-card {
  display: inline-block;
  vertical-align: top;
  width: auto;
}
.card-box {
  width: 1.09rem;
  margin: 0 .04rem;
}
.music-media {
  position: relative;
}
.music-media .media-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: .08rem;
}
.music-title .tit-txt {
  margin-top: .06rem;
}
.music-title .tit-txt {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: .13rem;
}
.music-card:last-child {
  margin-right: .12rem;
}
</style>