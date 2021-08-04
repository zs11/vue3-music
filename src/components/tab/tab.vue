<template>
  <nav class="music-tab txt-1">
    <router-link
      class="music-tab-item"
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span class="music-tab-text">{{tab.name}}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.music-tab {
  display: flex;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
}
.music-tab-item {
  flex: 1;
}
.music-tab-text {
  position: relative;
  display: block;
  height: 100%;
}
.music-tab-item.current .music-tab-text::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: .2rem;
  height: .03rem;
  border-radius: .03rem;
  background: currentColor;
  transform: translate3d(-50%, 0, 0);
}
</style>