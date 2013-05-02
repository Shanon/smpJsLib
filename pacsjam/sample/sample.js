/*global PacsJam, Hogan*/
;(function($, undefined) {
  'use strict';

  /**
   *  jsonp形式で指定されたURLに接続して下さい。
   *  関数名は固定値となります。
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

  /**
   *  sampleでは、viewのためにhogan.jsを利用しています。
   */
  var render = function(obj) {
    var tmpl = Hogan.compile($('#tmpl').text());
    $('#output').append(tmpl.render(obj));
  };

  /**
   *  セミナー一覧用の関数名は、onLoadSeminarDatas固定となります。
   */
  var onLoadSeminarDatas = window.onLoadSeminarDatas = function(jsons) {
    var renderObjs = {};
    renderObjs.seminars = [];

    // 引数で渡されるjsonは、セミナー情報が全て配列で入っております。
    // そのため、配列をまわしてセミナー個別にご利用ください。
    $.each(jsons, function(i, json) {
      var seminarObj = {};
      // web pluginをご利用頂くために、PacsJamにセミナー毎のjsonデータを渡してインスタンスを作成して下さい。
      var pj = new PacsJam(json);

      // getメソッドに項目名を指定すると値を取得できます。
      // テキスト、オブジェクト、配列にかかわらず汎用的に取得できます。
      // 項目名はAPIマニュアルに準拠します。
      seminarObj.title = pj.get('Title');
      seminarObj.startDayDisplay = pj.get('StartDayDisplay');
      seminarObj.summary = pj.get('Summary');

      // getSeminarPathメソッドをご利用頂くと、セミナー詳細ページへのリンクを得られます。
      seminarObj.seminarLink = pj.getSeminarPath('http://demo-pacsjam.smktg.jp');

      console.log(pj);
      renderObjs.seminars.push(seminarObj);
    });
    render(renderObjs);
  };


  $(function() {
    fetch();
  });
}(jQuery));
