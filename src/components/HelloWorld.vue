<template>
  <div class="a" @click="handle">
    <button class="b"></button>
    <button class="c"></button>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })

const handle = (e) => {
  console.log(e.target);
}
</script>

<style scoped>
.b {
  height: 100px;
}
.c {
  height: 200px;
}
</style>
