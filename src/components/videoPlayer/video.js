import { createDom } from './utils/util'

class Video {
  constructor(options) {
    this.videoConfig = {
      controls: options.controls,
      autoplay: options.autoplay,
      loop: options.loop,
      muted: options.muted,
      preload: options.preload,
      "playsinline": "true",
      "x5-playsinline": "true",
      "webkit-playsinline": "true",
    }
    if (options.muted) {
      this.videoConfig.muted = 'muted'
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }
    this.video = createDom('video', '', this.videoConfig, 'video-player')
    if (options.poster) {
      this.video.setAttribute('poster', options.poster)
    }
    this.events = ['play', 'pause', 'progress'].map(item => {
      return {
        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`
      }
    })
    let self = this
    this.events.forEach(ev => {
      // console.log(Object.keys(ev)[0])
    })
  }
}

export default Video