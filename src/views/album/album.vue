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
import { useRouter } from "vue-router"
import request from '../../config/request'

// router
const router = useRouter()

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

const handleMusicClick = (event) => {
  let _target = event.target
  if (_target.nodeName.toLocaleLowerCase() === 'div') {
    _target = _target.parentNode
    if (_target.nodeName.toLocaleLowerCase() === 'div') {
      _target = _target.parentNode
    }
  }
  if (_target.nodeName.toLocaleLowerCase() === 'li') {
    const id = _target.dataset.id
    router.push({
      path: '/playmusic',
      query: {
        id
      }
    })
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