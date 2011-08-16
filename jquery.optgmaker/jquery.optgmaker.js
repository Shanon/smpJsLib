/*
*  指定したoptinの範囲をoptgroupで囲むプラグイン
*  引数は配列で指定。
*
*  引数の配列の書式は
*  [グループ化する最初の要素番号， グループ化する最後の要素番号, optgroupのラベル名]
*  で指定します。
*  このグループを配列でくくり複数指定してください。
*  ※ 要素番号はoptionを0から数えてください。
*
*  @example $(selector).optgmaker([[start, end, label],[star, end, label]]);
*
*/
(function ($) {
    var name_space = 'optgmaker';
    $.fn[name_space] = function(array_options) {
        var $OBJ = $(this);
        var aro = array_options;

        // -------------------------------------------------------------------------- //
        /*
        *  引数の配列を回して、指定されたオブジェクト(option要素)をいったんスライスする
        *  戻ってきた要素をwrapAllを使ってoptgroupで囲む
        */
        // -------------------------------------------------------------------------- //

        for (var i = 0, len = aro.length; i < len; i++) {
            var optHtml = '<optgroup label=' + aro[i][2] + '>' + '</optgroup>';
            $OBJ.slice((aro[i][0] - 0), (aro[i][1] + 1)).wrapAll(optHtml);
        }

        return this;
    };
})(jQuery);
