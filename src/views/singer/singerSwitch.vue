<template>
  <section class="singer-switch" @click="handleTagClick">
    <div class="scroll-wrap">
      <div class="singer-switch-row">
        <ul class="singer-tag-list">
          <li class="singer-tag-item bg-2 txt-5" v-for="item in SINGERSWITCH.AREA" :key="item.id" :data-id="item.id" data-type="area" :class="{'active': active.area === item.id}">
            {{item.type}}
          </li>
        </ul>
      </div>
    </div>
    <div class="scroll-wrap">
      <div class="singer-switch-row">
        <ul class="singer-tag-list">
          <li class="singer-tag-item bg-2 txt-5" v-for="item in SINGERSWITCH.CATEGORY" :key="item.id" :data-id="item.id" data-type="category" :class="{'active': active.category === item.id}">
            {{item.type}}
          </li>
        </ul>
      </div>
    </div>
    <div class="scroll-wrap">
      <div class="singer-switch-row">
        <ul class="singer-tag-list">
          <li class="singer-tag-item bg-2 txt-5" v-for="item in SINGERSWITCH.GENRE" :key="item.id" :data-id="item.id" data-type="genre" :class="{'active': active.genre === item.id}">
            {{item.type}}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { SINGERSWITCH } from '../../config/global'
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  active: {
    type: Object
  }
})

const emitter = defineEmits(['switch'])

const handleTagClick = (event) => {
  if (event.target.nodeName.toLocaleLowerCase() === 'li') {
    const { type, id } = event.target.dataset
    emitter('switch', { type, id })
  }
}

</script>

<style scoped>
.singer-switch {
  position: relative;
  margin-top: .1rem;
}
.scroll-wrap {
  overflow: hidden;
}
.singer-switch-row {
  overflow-y: hidden;
  overflow-x: auto;
  padding: .1rem .16rem;
  margin-bottom: -.1rem;
}
.singer-tag-list {
  list-style: none;
  white-space: nowrap;
}
.singer-tag-item {
  display: inline-block;
  vertical-align: top;
  margin-right: .16rem;
  text-align: center;
  width: .44rem;
  height: .26rem;
  line-height: .26rem;
  border-radius: .1rem;
}
.singer-tag-item:last-child {
}
.singer-tag-item.active {
  background-color: rgb(44, 162, 249);
  color: #fff;
}
</style>