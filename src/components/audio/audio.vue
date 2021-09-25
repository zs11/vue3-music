<template>
  <div class="music-audio-source">
    <audio :src="url" height="0" width="0" ref="audioRef"
        @canplay="handleCanplay"
        @timeupdate="handleTimeupdate"></audio>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, defineEmits, watch, reactive } from "vue";
import { useStore } from 'vuex'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const emitter = defineEmits(['canplay', 'timeupdate'])

// store
const store = useStore()
const setAudioRef = (val) => store.commit('setAudioRef', val)

onMounted(() => {
  setAudioRef(audioRef.value)
})

// audio
const audioRef = ref(null)

const handleCanplay = () => {
  const duration = audioRef.value.duration
  emitter('canplay', duration)
}

const handleTimeupdate = (event) => {
  // event.preventDefault()
  const current = audioRef.value.currentTime
  emitter('timeupdate', current)
}
</script>

<style scoped>

</style>