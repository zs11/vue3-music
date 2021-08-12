<template>
  <section class="music-search">
    <section class="search-bar flex-box" :class="{ focus }">
      <div class="search-box bg-2">
        <svg t="1628237165569" class="icon search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2013" width="48" height="48"><path d="M918.94 877.25L760.7 719.01c56.58-66.51 90.93-152.49 90.93-246.45 0-210.13-170.94-381.07-381.07-381.07S89.49 262.44 89.49 472.57s170.94 381.07 381.07 381.07c93.96 0 179.94-34.35 246.45-90.93l158.24 158.24c6.03 6.03 13.94 9.05 21.85 9.05s15.81-3.02 21.85-9.05c12.06-12.07 12.06-31.63-0.01-43.7zM151.29 472.57c0-176.05 143.22-319.28 319.28-319.28s319.28 143.22 319.28 319.28-143.23 319.27-319.29 319.27-319.27-143.22-319.27-319.27z" fill="rgba(26,26,26,.5)" p-id="2014"></path></svg>
        <form action="#">
          <input v-model="searchVal" placeholder="搜索" class="search-input" @focus="handleSearchFocus" @blur="handleSearchBlur" @input="handleSearchInput" ref="searchRef">
        </form>
        <svg t="1628669323945" :style="{ display: isEmptyShow }" class="icon empty-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2222" width="32" height="32" @click="handleEmptyClick"><path d="M286.165333 798.165333L512 572.330667l225.834667 225.834666 60.330666-60.330666L572.330667 512l225.834666-225.834667-60.330666-60.330666L512 451.669333 286.165333 225.834667 225.834667 286.165333 451.669333 512l-225.834666 225.834667z" fill="rgba(26,26,26,.4)" p-id="2223"></path></svg>
      </div>
      <div class="cancel-btn" :style="{ display: isCancelShow }" @click="handleCancelClick">取消</div>
    </section>
    <search-cont :style="{ display: isContShow }"></search-cont>
  </section>
</template>

<script setup>
import SearchCont from './searchCont.vue'
import { ref, defineEmits } from 'vue'

// 搜索框
const searchVal = ref("")
const searchRef = ref(null)

// emit事件
const emitter = defineEmits(['searchTabClick'])

// 输入框聚焦/失焦
const focus = ref(false)
const isEmptyShow = ref('none')
const isContShow = ref('none')
const isCancelShow = ref('none')
const handleSearchFocus = () => {
  focus.value = true
  isCancelShow.value = 'block'
  isContShow.value = 'block'
  emitter('searchTabClick', true)
}
const handleSearchBlur = () => {
  if (searchVal.value === "") {
    focus.value = false
  }
}
const handleSearchInput = () => {
  if (searchVal.value !== "") {
    isEmptyShow.value = 'block'
  } else {
    isEmptyShow.value = 'none'
  }
}
const handleEmptyClick = () => {
  searchVal.value = ""
  searchRef.value.focus()
  isEmptyShow.value = 'none'
}

// 搜索取消
const handleCancelClick = () => {
  isContShow.value = 'none'
  isCancelShow.value = 'none'
  emitter('searchTabClick', false)
}
</script>

<style scoped>
.search-bar {
  position: relative;
  margin-top: .16rem;
}
.search-box {
  position: relative;
  height: .3rem;
  margin: 0 .16rem;
  overflow: hidden;
  border-radius: .3rem;
  flex: 1;
}
.search-icon {
  position: absolute;
  top: .06rem;
  left: 50%;
  width: .18rem;
  height: .18rem;
  margin-left: -.2rem;
}
.search-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: .07rem;
  padding-bottom: 0.02rem;
  padding-left: .36rem;
  font-size: .14rem;
  text-align: center;
  border: none;
  border-radius: 0;
  background: 0 0;
}
input {
  font-weight: inherit;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}
.cancel-btn {
  height: .3rem;
  padding: 0 .16rem;
  line-height: .3rem;
  font-weight: 700;
  font-size: .14rem;
}
.search-bar.focus .search-icon {
  left: .06rem;
  margin-left: 0;
}
.search-bar.focus .search-input {
  padding-left: .28rem;
  padding-right: .4rem;
  text-align: left;
}
.empty-icon {
  position: absolute;
  right: 0;
  transform: scale(.7);
}
</style>