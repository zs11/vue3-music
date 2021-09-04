import { getDom, createDom, addClass, removeClass } from "../utils/util"

let progress = function() {
  let player = this
  let root = player.root
  let container = createDom('div', `<div class="player-progress">
                                      <div class="progress-inner">
                                        <div class="progress-played"></div>
                                      </div>
                                      <div class="progress-btn"></div>
                                    </div>
                                    <div class="progress-move-info hide">
                                      <span class="video-current"></span>
                                      <span class="divide">/</span>
                                      <span class="video-duration"></span>
                                    </div>`, {}, 'progress-control progress-container')

  root.appendChild(container)
  const playEl = container.querySelector('.progress-played')
  const btnEl = container.querySelector('.progress-btn')
  const progressEl = container.querySelector('.player-progress')
  const videoMoveInfoEl = container.querySelector('.progress-move-info')
  const videoCurrentEl = container.querySelector('.video-current')
  const videoDurationEl = container.querySelector('.video-duration')
  const videoInfoEl = getDom(document, '.video-info')
  let s_progress = 0
  
  function onProgress() {
    player.video.addEventListener('timeupdate', (event) => {
      const current = player.video.currentTime
      const duration = player.video.duration
      s_progress = (current / duration).toFixed(4) * 100 + '%'
      playEl && (playEl.style.width = s_progress)
      btnEl && (btnEl.style.left = s_progress)
    })
  }

  function onProgressTouch() {
    let startX = 0, dis = 0, startTime = 0, duration = 0
    let newProgress = 0
    progressEl.addEventListener('touchstart', (event) => {
      startX = event.touches && event.touches[0].clientX
      dis = 0
      startTime = player.video.currentTime
      duration = player.video.duration
      setInfoTime(startTime, duration)
      removeClass(videoMoveInfoEl, 'hide')
      addClass(videoInfoEl, 'opacity-hide')
      addClass(progressEl, 'touched')
      player.video.pause()
    })
    progressEl.addEventListener('touchmove', (event) => {
      const clientX = event.touches && event.touches[0].clientX
      dis = clientX - startX
      newProgress = countDis('progress', dis)
      const newCurrent = countDis('duration', dis, startTime, duration)
      setInfoTime(newCurrent, duration)
      playEl && (playEl.style.width = newProgress)
      btnEl && (btnEl.style.left = newProgress)
    })
    progressEl.addEventListener('touchend', (event) => {
      const newCurrent = countDis('duration', dis, startTime, duration)
      addClass(videoMoveInfoEl, 'hide')
      removeClass(videoInfoEl, 'opacity-hide')
      removeClass(progressEl, 'touched')
      player.video.currentTime = newCurrent
      player.video.play()
    })
  }

  function getInfoTime(_time) {
    const unit = 60
    let minute = Math.floor(_time / unit)
    let second = Math.ceil(_time % 60)
    minute = minute < 10 ? `0${minute}` : `${minute}`
    second = second < 10 ? `0${second}` : `${second}`
    return `${minute}:${second}`
  }

  function setInfoTime(_current, _duration) {
    const currentInfoTime = getInfoTime(_current)
    const durationInfoTime = getInfoTime(_duration)
    videoCurrentEl.innerHTML = currentInfoTime
    videoDurationEl.innerHTML = durationInfoTime
  }

  function countDis(type, dis, startTime, duration = 0) {
    const width = progressEl.clientWidth
    const disWidth = (dis / width).toFixed(4)
    if (type === 'duration') {
      const disNum = disWidth * duration
      return Math.max(Math.min(startTime + disNum, duration), 0)
    } else if (type === 'progress') {
      const progressDis = disWidth * 100
      return Math.max(Math.min(parseFloat(s_progress) + progressDis, 100), 0) + '%'
    }
  }

  onProgress()
  onProgressTouch()
}

export default progress