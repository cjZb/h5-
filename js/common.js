$(function () {
  /**
   * 语音导览的播放与停止
   */
  // $('#img_audio').click(function () {
  //   bf();
  //
  // });
  // function bf(){
  //   var voice = document.getElementById('voice');
  //   if(voice!==null){
  //     if(voice.paused) {
  //       voice.play(); // 播放
  //     } else {
  //       voice.pause(); // 暂停
  //     }
  //   }
  // }
  /**
   * 语音导览
   */
  // $('#img_audio').click(function () {
  //   alert('暂未开放')
  // });
  /**
   * 科技厅视频
   */
  $('#video').click(function () {
    var video = document.getElementById('video');
    video.play()
  });
  /**
   * 影像厅视频
   */
  // $('#promotional1').click(function () {
  //   var promotional1 = document.getElementById('promotional1');
  //   promotional1.play()
  // });
  // $('#promotional2').click(function () {
  //   var promotional2 = document.getElementById('promotional2');
  //   promotional2.play()
  // });
  /**
   * 返回展厅
   */
  $('.select').click(function () {
    window.location = 'entry.html'
  });
  /**
   * 分享
   */
  $('.share').click(function () {
    window.location = 'share.html'
  });
  /***
   * 获取底图宽度
   */
  $('.slide-container').width($('.common-bg').width());
  // $('.common-bg').on('load',function () {
  //   $('.slide-container').width($('.common-bg').width());
  // });

})