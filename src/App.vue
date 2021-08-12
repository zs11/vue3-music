<template>
  <m-header></m-header>
  <router-view></router-view>
</template>

<script setup>
import MHeader from './views/header/header.vue'

</script>

<style>
html {
  font-size: calc(100vw / 3.75);
}
blockquote, body, dd, dl, figure, form, h1, h2, h3, h4, h5, h6, hr, input, ol, p, td, textarea, th, ul { 
  margin:0;
  padding:0
}
h1, h2, h3, h4, h5, h6 { 
  font-size:100%;
  font-weight:300
}
body {
  font-size: .14rem;
  font: 300 12px/1.5 -apple-system,sans-serif;;
}
a {
  text-decoration: none;
}
.bg-1 {
  background-color: #fafafa;
}
.bg-2 {
  background-color: #fff;
}
.txt-1 {
  color: rgba(26, 26, 26, .5);
}
.txt-2 {
  color: rgba(26, 26, 26, 1);
}
.txt-3 {
  color: rgba(44, 162, 249, 1);
}
.txt-4 {
  color: rgba(255, 255, 255, 1);
}
.flex-box {
  display: flex;
}
</style>
