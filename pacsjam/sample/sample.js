;(function($, undefined) {
  'use strict';

  /**
   *
   */
  var fetch = function() {
    var url = 'https://app.shanon.co.jp/pacsjam/static/output/Iclde54Txdgr4KwT/seminars.js';
    $.ajax({
      url:url,
      scriptCharset:"UTF-8",
      type: 'GET',
      dataType : 'jsonp'
    });
  };

  var onLoadSeminarDatas = window.onLoadSeminarDatas = function(json) {
    console.log(json);
  };


  $(function() {
    fetch();
  });
}(jQuery));
