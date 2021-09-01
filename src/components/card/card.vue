<template>
  <div class="music-card">
    <div class="card-box">
      <div class="music-media">
        <img :src="cardData.img" alt="media" class="media-img">
        <div class="media-play">
          <img src="../../assets/img/play.png" alt="play" class="play-btn">
          <span class="paly-num-count">{{playnum}}</span>
        </div>
      </div>
      <div class="music-title">
        <h3 class="tit-txt txt-2">{{cardData.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  cardData: {
    required: true
  }
})

const playnum = computed(() => {
  const num = props.cardData.playnum
  let res = 0
  if (num < 10000) {
    res = (1).toFixed(1)
  } else {
    res = (num / 10000).toFixed(1)
  }
  return `${res}万`
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
.media-play {
  position: absolute;
  bottom: -.05rem;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(206, 206, 206, .9);
  backdrop-filter: blur(2px);
  padding: 0 .07rem;
  border-radius: .09rem;
}
.media-play .play-btn {
  width: .1rem;
  height: .1rem;
}
.media-play .paly-num-count {
  margin-left: .02rem;
  color: #fff;
}
</style>