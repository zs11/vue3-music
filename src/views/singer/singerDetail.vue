<template>
  <div class="singer-detail-wrap">
    <div class="singer-cover">
      <img :src="singer.singer_info.singer_img" alt="singer" class="singer-cover-img">
      <div class="singer-name txt-4">
        <h2 class="name-txt">{{singer.singer_info.singer_name}}</h2>
        <h3 class="other-name-txt" v-if="singer.singer_info.other_name">- {{singer.singer_info.other_name}}</h3>
      </div>
    </div>
    <div class="singer-tabs flex-box">
      <div class="tab-item" :class="{'active': activeTab === 'music'}" @click="handleTabClick('music')">
        <span>歌曲</span>
        <span class="music-number">{{singer.singer_musics.length}}</span>
      </div>
      <div class="tab-item" :class="{'active': activeTab === 'about'}" @click="handleTabClick('about')">
        <span>关于TA</span>
      </div>
    </div>
  </div>
  <div class="singer-detail-content">
    <div class="music-content" v-if="activeTab === 'music'">
      <ul class="music-list">
        <li v-for="music in singer.singer_musics" :key="music.id" class="music-item flex-box">
          <div class="music-detail">
            <h3 class="music-name txt-5">{{music.name}}</h3>
            <div class="music-desc">
              <span class="music-author">{{music.author}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="about-content" v-else-if="activeTab === 'about'">
      <div class="about-basis">
        <div class="basis-title">歌手资料</div>
        <p class="basis-txt">
          {{singer.singer_info.basis}}
        </p>
      </div>
      <div class="about-article">
        <div class="article-title">相关文章</div>
        <div class="article-list">
          <div class="article-item flex-box" v-for="article in singer.singer_articles" :key="article.id">
            <div class="article-cover">
              <img :src="article.img" alt="article" class="article-img">
            </div>
            <div class="article-desc">
              <h3 class="main-title">{{article.title}}</h3>
              <h3 class="sub-title">{{article.subtitle}}</h3>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useStore } from "vuex"
import request from "../../config/request";

const router = useRouter()

const store = useStore()
const setHeaderStatus = (val) => store.commit('setHeaderStatus', val)

setHeaderStatus(false)
onBeforeRouteLeave(() => {
  setHeaderStatus(true)
})

const singer = ref({
  singer_info: {},
  singer_musics: [],
  singer_articles: []
})

const activeTab = ref('music')

onMounted(async () => {
  const { id } = router.currentRoute.value.query
  if (id) {
    const res = await request({
      url: '/music/singer-musics',
      method: 'GET',
      params: {
        sid: id
      }
    })
    const { data } = res
    singer.value.singer_info = data.singer_info
    singer.value.singer_musics = data.singer_musics
    singer.value.singer_articles = data.singer_articles
  }
})

const handleTabClick = (tab) => {
  activeTab.value = tab
}
</script>

<style scoped>
.singer-cover {
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: .3rem;
  border-bottom-right-radius: .3rem;
  height: 2.8rem;
}
.singer-cover .singer-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center -.2rem;
}
.singer-cover .singer-name {
  position: absolute;
  left: 0;
  padding: 0 .16rem;
  bottom: .3rem;
  width: 100%;
}
.singer-cover .name-txt {
  font-size: .3rem;
  font-weight: 400;
}
.singer-cover .other-name-txt {
  font-size: .16rem;
  font-weight: 400;
}
.singer-tabs {
  margin: .16rem 0 .1rem;
  font-size: .18rem;
  color: rgba(26, 26, 26, .5);
  padding: 0 .2rem;
  overflow: hidden;
}
.singer-tabs .tab-item {
  margin-right: .22rem;
  position: relative;
  height: .32rem;
}
.music-number {
  font-size: .16rem;
}
.tab-item.active {
  color: rgba(44, 162, 249, 1);
}
.tab-item.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: .03rem;
  background-color: currentColor;
}
.music-list {
  list-style: none;
}
.music-list .music-item {
  padding: 0 .2rem;
  height: .6rem;
  align-items: center;
}
.music-detail {
}
.music-detail .music-name {
  font-size: .16rem;
}
.music-detail .music-author {
  font-size: .14rem;
  color: rgba(0, 0, 0, .6);
}
.about-basis, .about-article {
  padding: 0 .2rem;
  overflow: hidden;
}
.about-basis {
  margin-bottom: .2rem;
}
.about-basis .basis-title, .about-article .article-title {
  font-size: .16rem;
  font-weight: 600;
  margin-bottom: .08rem;
}
.about-basis .basis-txt {
  font-size: .14rem;
  color: rgba(0, 0, 0, .6);
}
.article-list {
  position: relative;
}
.article-list .article-item {
  align-items: center;
  margin-bottom: .16rem;
}
.article-item .article-cover {
  width: 1rem;
  height: 1rem;
  border-radius: .08rem;
  overflow: hidden;
}
.article-item .article-cover .article-img {
  width: 100%;
  height: 100%;
}
.article-item .article-desc {
  margin-left: .1rem;
  flex: 1;
}
.article-item .article-desc .main-title {
  font-size: .16rem;
  margin-bottom: .06rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: normal;
  word-wrap: break-word;
}
.article-item .article-desc .sub-title {
  color: rgba(0, 0, 0, .6);
}
</style>