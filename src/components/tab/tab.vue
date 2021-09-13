<template>
  <nav class="music-tab" :class="{'flex-box': tabConfig.divide}" ref="tabRef">
    <router-link
      class="music-tab-item txt-color"
      v-for="(tab, index) in tabs"
      :key="tab.path"
      :to="tab.path"
      :class="{active: activeTab === index}"
      :style="{'color': tabConfig.color}"
    >
      <span class="music-tab-text" :data-idx="index" :style="activeColor(index)">{{tab.name}}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { defineProps, ref, watch, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  config: {
    type: Object
  }
})

const tabConfig = reactive({
  divide: props.config.divide || true,
  router: props.config.router || false,
  color: props.config.color || 'rgba(0, 0, 0, 1)',
  activeColor: props.config.activeColor || 'rgba(128, 128, 128, 1)'
})

watch(() => props.config.color, () => {
  tabConfig.color = props.config.color
})

watch(() => props.config.activeColor, () => {
  tabConfig.activeColor = props.config.activeColor
})

// 区分router和非router模式
const activeTab = ref(0)
const tabRef = ref(null)

const activeColor = (idx) => {
  return idx === activeTab.value ? { 'color': tabConfig.activeColor } : ''
}

const routes =  props.tabs.map(val => {
  return val.path
})

const handleTabClick = (event) => {
  const idx = parseInt(event.target.dataset.idx)
  activeTab.value = idx
}

const handleRouteChange = (path) => {
  const idx = routes.indexOf(path)
  if (idx !== -1) {
    activeTab.value = idx
  }
}

if (props.config.router) {
  const route = useRoute()
  watch(() => route.path, () => {
    handleRouteChange(route.path)
  })
} else {
  onMounted(() => {
    tabRef.value.addEventListener('click', handleTabClick)
  })
}



// active tab
// const activeTab = ref(0)

// const handleTabClick = (event) => {
//   const idx = parseInt(event.target.dataset.idx)
//   activeTab.value = idx
// }


</script>

<style scoped>
.music-tab {
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  font-size: .16rem;
}
.flex-box {
  display: flex;
}
.flex-box .music-tab-item {
  flex: 1;
}
.music-tab-text {
  position: relative;
  display: block;
  height: 100%;
}
.music-tab-item.active .music-tab-text::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: .32rem;
  height: .03rem;
  border-radius: .03rem;
  background: currentColor;
  transform: translate3d(-50%, 0, 0);
}
.txt-color {
  color: rgba(0, 0, 0, 1);
}
</style>