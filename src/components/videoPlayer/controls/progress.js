import { getDom, createDom } from "../utils/util"

let progress = function() {
  let player = this
  let root = player.root
  let container = createDom('div', `<div class="player-progress">
                                      <div class="progress-inner">
                                        <div class="progress-played"></div>
                                      </div>
                                      <div class="progress-btn"></div>
                                    </div>`, {}, 'progress-control progress-container')

  root.appendChild(container)
  
  function onProgress() {
    player.video.addEventListener('timeupdate', (event) => {
      const el = getDom(document, '.progress-played')
      const current = player.video.currentTime
      const duration = player.video.duration
      const s_progress = (current / duration).toFixed(4) * 100 + '%'
      el.style.width = s_progress
    })
  }

  onProgress()
}

export default progress