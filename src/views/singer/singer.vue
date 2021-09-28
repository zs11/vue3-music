<template>
  <div class="singer-wrap">
    <singer-switch
      :active="activeTag"
      @switch="handleSwitchChange">
    </singer-switch>
    <div class="singer-container">
      <ul class="singer-list" @click.stop="handleSingerClick">
        <li class="singer-item" v-for="singer in singers" :key="singer.id" :data-singer_id="singer.id">
          <div class="singer-info flex-box">
            <img :src="singer.singer_img" alt="singer" class="singer-img">
            <div class="singer-name">
              {{singer.singer_name}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SingerSwitch from './singerSwitch.vue'
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import request from "../../config/request";

const activeTag = reactive({
  area: -1,
  category: -1,
  genre: -1
})

const router = useRouter()

const singers = ref([])

const handleSwitchChange = ({ type, id }) => {
  activeTag[type] = parseInt(id)
  getSingerList()
}

onMounted(() => {
  getSingerList()
})

const getSingerList = async () => {
  const res = await request({
    url: '/music/singer',
    method: 'GET',
    params: {
      area_id: activeTag.area,
      category_id: activeTag.category,
      genre_id: activeTag.genre
    }
  })
  singers.value = res.data
}

const handleSingerClick = (event) => {
  let _target = event.target
  if (_target.nodeName.toLocaleLowerCase() === 'ul') {
    return
  }
  while(_target.nodeName.toLocaleLowerCase() !== 'li') {
    _target = _target.parentNode
  }
  const { singer_id } = _target.dataset
  router.push({
    path: '/singer-detail',
    query: {
      id: singer_id
    }
  })
}
</script>

<style scoped>
.singer-container {
  
}
.singer-list {
  list-style: none;
  overflow: hidden;
  margin-top: .2rem;
}
.singer-list .singer-item {
  padding: 0 .16rem;
  margin-bottom: .14rem;
}
.singer-info {
  align-items: center;
}
.singer-info .singer-img {
  width: .48rem;
  height: .48rem;
  border-radius: 50%;
}
.singer-info .singer-name {
  font-size: .16rem;
  margin-left: .1rem;
}
</style>