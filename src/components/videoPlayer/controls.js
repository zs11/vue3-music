import Play from './controls/play'
import Progress from './controls/progress'

let controls = function() {
  Play.call(this)
  Progress.call(this)
//   this.video.addEventListener('loadstart', function(e) {
//     console.log('提示视频的元数据已加载')
//   })

//   // 2、durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
//   this.video.addEventListener('durationchange', function(e) {
//     console.log('提示视频的时长已改变')
//   })

//   // 3、loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
//   this.video.addEventListener('loadedmetadata', function(e) {
//     console.log('提示视频的元数据已加载')
//   })

//   // 4、loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
//   this.video.addEventListener('loadeddata', function(e) {
//     console.log('提示当前帧的数据是可用的')
//   })

//   // 5、progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
//   this.video.addEventListener('progress', function(e) {
//     console.log('提示视频正在下载中')
//   })

//   // 6、canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
//   this.video.addEventListener('canplay', function(e) {
//     console.log('提示该视频已准备好开始播放')
//   })

//   // 7、canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
//   this.video.addEventListener('canplaythrough', function(e) {
//     console.log('提示视频能够不停顿地一直播放')
//   })

//   // 8、play：播放监听
//   this.video.addEventListener('play', function(e) {
//     console.log('播放开始')
//   })

//   // 9、pause：暂停监听
//   this.video.addEventListener('pause', function(e) {
//     console.log('暂停播放')
//   })

//   // 10、seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
//   this.video.addEventListener('seeking', function(e) {
//     console.log('开始移动进度条')
//   })

//   // 11、seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
//   this.video.addEventListener('seeked', function(e) {
//     console.log('进度条已经移动到了新的位置')
//   })

//   // 12、waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
//   this.video.addEventListener('waiting', function(e) {
//     console.log('视频加载等待')
//   })

//   // 13、playing：当视频在已因缓冲而暂停或停止后已就绪时触发
//   this.video.addEventListener('playing', function(e) {
//     console.log('playing')
//   })

//   // 14、timeupdate：目前的播放位置已更改时，播放时间更新
//   this.video.addEventListener('timeupdate', function(e) {
//     console.log('timeupdate')
//   })

//   // 15、ended：播放结束
//   this.video.addEventListener('ended', function(e) {
//     console.log('视频播放完了')
//   })

//   // 16、error：播放错误
//   this.video.addEventListener('error', function(e) {
//     console.log('视频出错了')
//   })

//   // 17、volumechange：当音量更改时
//   this.video.addEventListener('volumechange', function(e) {
//     console.log('volumechange')
//   })

//   // 18、stalled：当浏览器尝试获取媒体数据，但数据不可用时
//   this.video.addEventListener('stalled', function(e) {
//     console.log('stalled')
//   })

//   // 19、ratechange：当视频的播放速度已更改时
//   this.video.addEventListener('ratechange', function(e) {
//     console.log('ratechange')
//   })
}

export default controls