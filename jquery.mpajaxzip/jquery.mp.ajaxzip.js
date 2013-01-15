/*
*  dataの置き場所、都道府県の並びをMP用に設定した
*  ajaxzip2.jsを読み込んでおく必要があります。
*  (azip1, apref, aaddr, azip2, astrt, area)

*  @settings Array
*  0:郵便番号1、1:郵便番号2、 2:都道府県、 3:市区、 4:町村
*  の順番で設定した配列を指定してください。
*  指定するのは、jQueryのセレクタです。
*  町村を省略すると、市区欄に町村が入るようにします。
*/
;(function ($) {
  /*global AjaxZip2 */
  'use strict';

  var names= [],

  getInputName = function($obj) {
    return $obj.attr('name');
  },

  eachGetInputName = function(selectors) {
    for (var i = 0; i < selectors.length; i++) {
      names.push(getInputName($(selectors[i])));
    }
  };

  $.fn["mpAjaxZip"] = function(settings, zip_type) {
    zip_type = zip_type || 'double';
    eachGetInputName(settings);

    var myZip2addr = {
      'double': {
        3: function() {
          AjaxZip2.zip2addr(names[0], names[2], names[2], names[1]);
        },

        4: function() {
          AjaxZip2.zip2addr(names[0], names[2], names[3], names[1]);
        },

        6: function() {
          AjaxZip2.zip2addr(names[0], names[2], names[3], names[1], names[5], names[4]);
        }
      },

      'single': {
        3: function() {
          AjaxZip2.zip2addr(names[0], names[1], names[2]);
        },
      }
    };

    this.keyup(function() {
      myZip2addr[zip_type][names.length]();
    });

    return this;
  };
})(jQuery);