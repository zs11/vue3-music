<template>
  <div class="music-album">
    <header class="album-top">
      <div class="album-cover">
        <img :src="albumData.info.img" alt="album" class="ablum-img" >
      </div>
    </header>
    <div class="album-option">
      <div class="desc">
        <p class="title txt-3">My Music歌单</p>
        <p>{{albumData.info.desc}}</p>
      </div>
    </div>
    <main class="ablum-musics">
      <ul class="music-list" @click="handleMusicClick">
        <li class="music-list-item" v-for="(music, index) in albumData.musics" :key="music.id" :data-id="music.id">
          <div class="music-item-content">
            <div class="music-name">{{music.name}}</div>
            <div class="music-author">{{music.author}}</div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRouter, onBeforeRouteLeave } from "vue-router"
import { useStore } from "vuex"
import request from '../../config/request'

// router
const router = useRouter()

// store
const store = useStore()
const setMusicBasic = (key, val) => store.commit('setMusicBasic', { key, val })
const setMusicStatus = (val) => store.commit('setMusicStatus', val)
const setHeaderStatus = (val) => store.commit('setHeaderStatus', val)

// 进入和离开album页面
setHeaderStatus(false)

onBeforeRouteLeave(() => {
  setHeaderStatus(true)
})

const albumData = reactive({
  info: {},
  musics: []
})

onMounted(async () => {
  const { id } = router.currentRoute.value.query
  if (id) {
    const res = await request({
      url: '/music/album',
      method: 'GET',
      params: {
        id: 1
      }
    })
    albumData.info = res.data.info
    albumData.musics = res.data.musics
  }
})

const handleMusicClick = async (event) => {
  let _target = event.target
  if (_target.nodeName.toLocaleLowerCase() === 'div') {
    _target = _target.parentNode
    if (_target.nodeName.toLocaleLowerCase() === 'div') {
      _target = _target.parentNode
    }
  }
  if (_target.nodeName.toLocaleLowerCase() === 'li') {
    const id = _target.dataset.id
    const res = await request({
      url: '/music/info',
      method: 'GET',
      params: {
        id
      }
    })
    const { data } = res
    setMusicBasic('id', data.id)
    setMusicBasic('name', data.name)
    setMusicBasic('author', data.author)
    setMusicBasic('imgUrl', data.imgUrl)
    setMusicBasic('musicUrl', data.musicUrl)
    setMusicStatus('pause')
  }
}
</script>

<style scoped>
.album-top {
  position: relative;
  height: 2.4rem;
  overflow: hidden;
}
.album-cover {
  height: 100%;
}
.album-cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.album-option {
  position: relative;
  margin: -.08rem .2rem .12rem;
  background: #fff;
  border-radius: .04rem;
  box-shadow: 0 0 .12rem 0 rgba(0, 0, 0, 6%);
  z-index: 2;
}
.album-option .desc {
  padding: .08rem .16rem .1rem;
  font-size: .14rem;
}
.album-option .desc .title {
  margin-bottom: .06rem;
}
.music-list {
  list-style: none;
}
.music-list-item {
  position: relative;
}
.music-list-item .music-item-content {
  display: flex;
  flex-direction: column;
  padding: .1rem .2rem;
}
.music-item-content .music-name {
  font-size: .16rem;
}
.music-item-content .music-author {
  font-size: .14rem;
  color: #888;
}
</style>