<template>
  <div class="single-card">
    <div class="single-box">
      <div class="music-single flex-box">
        <img :src="cardData.img" alt="single" class="single-img">
        <div class="single-music-intro">
          <h2 class="single-music-name">{{cardData.title}}</h2>
          <span class="single-music-author">{{cardData.author}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  cardData: {
    required: true
  }
})


</script>

<style scoped>
.single-card {
  display: inline-block;
  vertical-align: top;
  width: auto;
}
.single-box {
  width: 2.8rem;
  margin: 0 .04rem;
}
.music-single {
  position: relative;
  align-items: center;
}
.music-single .single-img {
  display: block;
  width: .52rem;
  height: .52rem;
  border-radius: .08rem;
}
.music-single .single-img {
  display: block;
  width: .52rem;
  height: .52rem;
  border-radius: .08rem;
}
.music-single .single-music-intro {
  margin-left: .12rem;
}
.single-music-intro .single-music-name {
  color: #000;
  font-weight: 600;
  font-size: .14rem;
  margin-bottom: .04rem;
}
.single-music-intro .single-music-author {
  display: block;
}
.single-music-intro .single-music-name, .single-music-intro .single-music-author {
  max-width: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>