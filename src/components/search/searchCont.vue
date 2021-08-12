<template>
  <section class="search-cont">
    <div class="all-search">
      <h2 class="search-title txt-2">{{searchTitle}}</h2>
      <div class="search-tips">
        <span class="search-item bg-2 txt-2" v-for="item in allSearchTips" :key="item">{{item}}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const searchTitle = "热门搜索"
const allSearchTips = [
  "不如", "善变", "放空", "时代少年团 朱雀", "最后的人", "杨洋", "Ring Ring Ring",
  "王靖雯不胖", "红伞伞白杆杆", "Stay", "曾经你说", "怎叹", "踏山河", "热爱105°C的你",
  "BLACKPINK", "目及皆是你", "时光背面的我", "雾里", "半生雪", "大风吹"
]

</script>

<style scoped>
.all-search {
  position: relative;
  overflow: hidden;
}
.search-title {
  margin: .16rem .16rem .12rem;
  font-size: .14rem;
  font-weight: 700;
}
.search-tips {
  margin: 0 .16rem;
  font-size: 0;
}
.search-item {
  vertical-align: top;
  display: inline-block;
  max-width: 2.26rem;
  height: .24rem;
  line-height: .24rem;
  margin: 0 .12rem .12rem 0;
  padding: .02rem .12rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: .14rem;
  border-radius: .24rem;
}
</style>