/*
*  特定グループのチェックボックスをラジオボタンのように単一選択にするプラグイン
*  対象セレクタに強制的にクラス名を付与するのでご注意ください。
*
*  @example $(selector).rbox();
*  @author murao@shanon.co.jp
*
*/
(function ($) {
    var name_space = 'rbox';
    $.fn[name_space] = function(options) {
        var $OBJ = $(this);
        var j_cached = {};
        var my_nodeName = ($OBJ[0].nodeName).toLowerCase();

        var settings = $.extend({
            "class_prefix" : my_nodeName + "line"
        }, options);


        // ------------------------------------------------------------------------- //
        /*
        * スペースを取り除いた値を返す。(trim()と違い文中のスペースも除去する
        *  @param {String} text スペースを取り除くべき文字列
        *  @return {String} スペースが取り除かれた文字列
        */
        // ------------------------------------------------------------------------- //
        var trimJ = function(text) {
            var rtrim = /(\s|\u00A0|\u3000)/g;
            return (text || "").replace(rtrim, "");
        };


        // -------------------------------------------------------------------------- //
        /*
        *  セレクタで指定された項目をグルーピングするためにclassを振る
        *  また、グルーピングされたクラス以下のinputをj_cachedにキャッシュする
        *  キャッシュする値は複数クラスを利用している可能性を考慮して、クラス名
        *  から空白値を取り除いた値
        */
        // -------------------------------------------------------------------------- //
        $OBJ.each(function(index) {
            var my_class = settings.class_prefix + ((index - 0) + 1);
            var selector = "." + my_class + " input";
            var cache_key = '';

            my_class += ' rbox';
            // 既にクラスがある場合は、スペースを空けて新規クラスを追加
            // click()で、キャッシュを利用するためaddClass利用不可
            if ($(this).attr("class") !== undefined) {
                my_class += ' ' + $(this).attr("class");
            }
            $(this).attr("class", my_class);

            // ---------------------------------------------------------------------- //

            // キャッシュへjqueryオブジェクトを詰める
            // キャッシュのキーはクラス名から空白を除いた文字列(複数空白対応)
            cache_key = trimJ(my_class);
            j_cached[cache_key] = $(selector);
        });


        // -------------------------------------------------------------------------- //
        /*
        *  セレクタ以下のinputにクリックアクションを追加
        *  自分の親(セレクタのnodeNameまで)以下の自分以外のチェックボックスのチェックを
        *  すべてとる。
        *  という処理
        */
        // -------------------------------------------------------------------------- //
        console.log($OBJ);
        $OBJ.find("input").click(function() {
            var $thisInput = $(this);
            if($thisInput.attr("checked") === 'checked') {
                var cache_key = '';

                // ------------------------------------------------------------------ //

                // inputである自分からセレクタで指定されたnodeNameまでさかのぼって処理
                // divの入れ子等同一タグの入れ子に対応するために、rbox等強制classを指定
                // クラス名がこのライブラリが振っている物を含んでいる場合、
                // クラス名からスペースを取り除いて、キャッシュオブジェクトの
                // キー文字列を作る
                var $group = $thisInput.parents(my_nodeName + '.rbox');
                var $groupClassName = $group.attr('class');

                if ($groupClassName.match(settings.class_prefix)) {
                    cache_key = trimJ($groupClassName);
                }

                // ------------------------------------------------------------------ //

                // キャッシュキーを使って、自分の所属するグループのキャッシュを使う
                // 自分を除くグループのcheckedをfalseにする
                j_cached[cache_key].not($(this)).attr("checked", false);
            }
        });
        return this;
    };
})(jQuery);
