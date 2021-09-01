<template>
  <div class="rank-card">
    <div class="rank-box">
      <div class="music-rank flex-box">
        <div class="rank-list-media">
          <img :src="rankData.img" alt="toplist" class="rank-list-img">
        </div>
        <div class="rank-list-cont">
          <div class="list-tit">
            <span class="list-tit-name">{{rankData.title}}</span>
            <span>_</span>
            <span class="list-tit-tag">实时更新</span>
          </div>
          <ul class="list-cont">
            <li class="list-cont-item" v-for="item in rankData.contList" :key="item.id">
              <span class="list-item-rank">{{getSortId(item.sortId)}}</span>
              <span class="list-item-name">{{item.name}}</span>
              <span> - </span>
              <span class="list-item-author">{{item.author}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  rankData: {
    required: true
  }
})

const getSortId = (sortId) => {
  return sortId ? `${sortId}. ` : ''
}
</script>

<style scoped>
.rank-card {
  width: auto;
  margin: 0 .16rem .12rem;
}
.rank-box {
  height: 1.09rem;
}
.music-rank {
  position: relative;
  align-items: center;
}
.music-rank .rank-list-media {
  position: relative;
  width: 1.09rem;
  height: 1.09rem;
  overflow: hidden;
  border-radius: .08rem;
}
.rank-list-img {
  display: block;
  width: 100%;
  height: 100%;
}
.rank-box {
  border-radius: .08rem;
  background-color: #fff;
}
.rank-list-cont {
  flex: 1;
  margin-left: .16rem;
}
.list-tit {
  margin-bottom: .06rem;
}
.list-tit-name {
  font-size: .15rem;
  font-weight: 600;
 }
.list-cont {
  list-style: none;
}
.list-cont-item {
  max-width: 2.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-cont-item:not(:last-child) {
  margin-bottom: .04rem;
}
.list-item-rank {
  font-weight: 600;
}
.list-item-name {
  font-weight: 400;
}
</style>