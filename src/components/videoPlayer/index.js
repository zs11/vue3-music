import Video from './video'
import { createDom, deepCopy, getDom, getType } from './utils/util'
import videoControls from './controls'
import './index.css'

class VideoPlayer extends Video {
  constructor (options) {
    super(options)
    this.id = options.id
    this.root = getDom(document, `#${this.id}`)
    this.config = deepCopy({
      width: 720,
      height: 576,
      controls: true,
      autoplay: false,
      loop: false,
      muted: 'muted',
    }, options)
    if (typeof this.config.width === 'number') {
      this.root.style.width = `${this.config.width}px`
    } else {
      this.root.style.width = this.config.width
    }
    if (typeof this.config.height === 'number') {
      this.root.style.height = `${this.config.height}px`
    } else {
      this.root.style.height = this.config.height
    }
    if (this.config.fullScreen) {
      this.video.className += ' full-screen'
    }
    this.videoInfoInit(this.config.info)
    this.start()
    videoControls.call(this)
  }

  start(url = this.config.url) {
    if (!this.video) return
    if (!url) return
    if (getType(url) !== 'Array') {
      if (getType(url) === 'String' && url.indexOf('blob:') > -1) {
        // 避免错误
      } else {
        this.video.src = url
      }
    } else {
      url.forEach(item => {
        const source = createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        })
        this.video.appendChild(source)
      })
    }
    this.attachVideo()
    this.attachVideoInfo()
  }

  attachVideo() {
    this.root.insertBefore(this.video, this.root.firstChild)
  }

  videoInfoInit(info = null) {
    if (!info) return
    const { author, desc } = info
    const authorEl = createDom('div', `@<span>${author}</span>`, {}, 'video-author')
    const descEl = createDom('div', `<span>${desc}</span>`, {}, 'video-desc')
    this.videoInfo = createDom('div', '', {}, 'video-info')
    this.videoInfo.appendChild(authorEl)
    this.videoInfo.appendChild(descEl)
  }

  attachVideoInfo() {
    if (!this.videoInfo) return
    this.root.appendChild(this.videoInfo)
  }
}

export default VideoPlayer