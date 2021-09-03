import { createDom, addClass, removeClass } from '../utils/util';

let play = function() {
  let player = this
  let root = player.root
  let btn = createDom('div', `<svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0 0 36 36"><path d="M10 10.693c0-1.7 0-2.549.354-3.013A1.729 1.729 0 0111.64 7c.582-.03 1.284.45 2.687 1.409l9.697 6.63c1.097.75 1.646 1.126 1.843 1.598.172.414.177.878.014 1.296-.187.476-.727.863-1.808 1.638l-9.697 6.945c-1.413 1.013-2.12 1.52-2.71 1.498a1.728 1.728 0 01-1.305-.67C10 26.877 10 26.007 10 24.268V10.693z" fill="#fff"></path></svg>`,
                        {}, 'play-controls-wrap')
  root.appendChild(btn)

  function onPlay() {
    player.video.addEventListener('play', (event) => {
      const el = document.querySelector('.play-controls-wrap')
      addClass(el, 'hide')
    })
    player.video.addEventListener('pause', (event) => {
      const el = document.querySelector('.play-controls-wrap')
      removeClass(el, 'hide')
    })  
  }

  function VideoClickEvent () {
    root.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      const nodeName = event.target && event.target.nodeName
      if (nodeName.toUpperCase() === 'VIDEO') {
        if (player.video.paused) {
          player.video.play()
        } else {
          player.video.pause()
        }
      }
    })
    btn.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (player.video.paused) {
        player.video.play()
      }
    })
  }

  VideoClickEvent()
  onPlay()
}

export default play