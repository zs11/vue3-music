<template>
  <section class="toplist-cont">
    <section class="music-toplist">
      <rank-card v-for="rank in rankData" :key="rank.id" :rank-data="rank"></rank-card>
    </section>
  </section>
</template>

<script setup>
import RankCard from '../../components/card/rankCard.vue'
import { onMounted, ref } from 'vue'
import request from '../../config/request'

const rankData = ref([])

onMounted(async () => {
  const res = await request({
    url: '/ranklist/all-list',
    method: 'GET',
  })
  rankData.value = res.data
})
</script>

<style scoped>
.toplist-cont {
  position: relative;
}
.music-toplist {
  margin-top: .2rem;
}
</style>