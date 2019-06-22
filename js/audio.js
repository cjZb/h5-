$(document).ready(function(){
    autoPlayMusic();
    audioAutoPlay();
  var audio = document.getElementById('bg-music');
  var voice = document.getElementById('voice');
  $('#img_video').click(function () {
    if ($(this).hasClass('stop_video')) {
      $('#img_video').removeClass('stop_video');
      audio.play();
      voice.pause();
    } else {
      $('#img_video').addClass('stop_video');
      audio.pause();
    }
  });
  $("#img_audio").click(function () {
    $('#img_video').addClass('stop_video');
    audio.pause();
    voice.play();
  });
  // 音频播放完成,背景音乐继续播放
  voice.onended = function () {
    $('#img_video').removeClass('stop_video');
    audio.play();
  }
});
function audioAutoPlay() {
    var audio = document.getElementById('bg-music');
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
}
// 音乐播放
function autoPlayMusic() {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    function musicInBrowserHandler() {
        musicPlay(true);
        document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);
    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(true);
        }, false);
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}
function musicPlay(isPlay) {
    var media = document.querySelector('#bg-music');
    if (isPlay && media.paused) {
        media.play();
    }
    if (!isPlay && !media.paused) {
        media.pause();
    }
}