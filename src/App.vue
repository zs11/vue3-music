<template>
  <m-header></m-header>
  <router-view></router-view>
</template>

<script setup>
import MHeader from './views/header/header.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html {
  font-size: calc(100vw / 3.75);
}
body {
  margin: 0;
  font-size: .14rem;
}
a {
  text-decoration: none;
}
.bg-1 {
  background-color: #fafafa;
}
.txt-1 {
  color: rgba(26,26,26,.5);
}
.txt-2 {
  color: rgba(26,26,26,1);
}
.txt-3 {
  color: rgba(175,215,237,1);
}
</style>
