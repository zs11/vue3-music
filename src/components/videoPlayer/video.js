import { createDom } from './utils/util'

class Video {
  constructor(options) {
    this.videoConfig = {
      controls: options.controls,
      autoplay: options.autoplay,
      loop: options.loop,
      muted: options.muted,
    }
    if (options.muted) {
      this.videoConfig.muted = 'muted'
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }
    this.video = createDom('video', '', this.videoConfig, 'video-player')
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