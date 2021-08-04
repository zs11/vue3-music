<template>
  <tab :tabs="tabs"></tab>
</template>

<script setup>
import Tab from '../../components/tab/tab.vue'

const tabs = [
  {
    name: "推荐",
    path: '/recommend'
  },
  {
    name: "排行",
    path: '/top-list',
  },
  {
    name: "歌手",
    path: '/singer'
  }
]
</script>

<style scoped>

</style>