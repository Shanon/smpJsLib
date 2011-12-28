/*
*  placeholder属性がないブラウザでもplaceholderを表示するプラグイン
*  @example $(selector).mmplaceholder()
*           || $(selector).mmplaceholder('ss_rightComment')
*           || $(selector).mmplaceholder({selector: 'ss_rightComment', css: {'color': '#000'}})
*  @author murao@shanon.co.jp
*/
(function($) {
    // placeholder属性をサポートしているか判断。
    var isPlaceHolder = !!('placeholder' in document.createElement('input'));
    $.fn['mplaceholder'] = function(options) {
        var $obj = this;
        var settings;

        /*
       引数がオブジェクトか否かで処理を分岐
       <引数がオブジェクトでない場合の処理>
       想定は、引数なし(.ss_upCommentでよい)か、セレクター部分だけ変更する(.ss_leftComment..etc)
        $(selector).mmplaceholder() || $(selector).mmplaceholder('ss_rightComment')

       <引数がオブジェクトの場合>
       css等変更したい事を想定なので、そのままextendに
       $(selector).mmplaceholder({selector: 'ss_rightComment', css: {'color': '#000'}})
        */
        var setOption = function(options) {
            if(typeof(options) !== 'object') {
                _selector = options || '.ss_upComment';

                settings = {
                    selector: _selector,
                    parentTag: 'td',
                    css:{'color': '#999'}
                };
            } else {
                settings = $.extend({
                    selector: '.ss_upComment',
                    parentTag: 'td',
                    css: {'color': '#999'}
                }, options);
            }
        };

        var makePlaceHolder = (function() {
            var $obj, $target;
            var $objs = [], $targets = [];
            var defaultColors = [], placetexts = [];

            return {
                init: function(_$obj) {
                    $obj = _$obj;
                    $target = _$obj.parents(settings.parentTag).find(settings.selector);

                    $objs.push(_$obj);
                    $targets.push($target);

                    this.setPlaceText();
                },

                setPlaceText: function() {
                    placetexts.push($target.text());
                },

                getPlaceText: function(n) {
                    return placetexts[n];
                },

                setdefaultColors: function() {
                    defaultColors.push($obj.css('color'));
                },

                css: function(n, obj) {
                    $objs[n].css(obj);
                },

                addFocus: function(n) {
                    $objs[n].focus(function() {
                        var $this = $(this);

                        if($this.val() === placetexts[n]) {
                            $this.val('');
                        }
                        $this.css({color: defaultColors[n]});
                    });
                },

                addBlur: function(n) {
                    var self = this;
                    $objs[n].blur(function() {
                        var $this = $(this);

                        if($this.val() === '') {
                            self.addInputVal(n);
                        }
                    });
                },

                addAttr: function(n) {
                    $obj.attr('placeholder', this.getPlaceText(n));
                },

                addInputVal: function(n) {
                    this.css(n, settings.css);
                    $objs[n].val(this.getPlaceText(n));
                },

                addSubmit: function() {
                    $('form').submit(function() {
                        for(var i = 0; i < $objs.length; i++) {
                            var $this = $objs[i];

                            if($this.val() === placetexts[n]) {
                                $this.val('');
                            }
                        }
                    });
                }
            }
        }());

        setOption(options);
        $obj.each(function(n) {
            var $this = $(this);

            makePlaceHolder.init($this);

            // 対象セレクタの文字列が空の場合は、次へ
            if(makePlaceHolder.getPlaceText($this) === '') {
                return true;
            }

            /*
             <placeholder属性をサポートしている場合の処理>
             */
            //セレクターのテキストをplaceholder属性に上書きして次へ
            /*
            if (!!isPlaceHolder) {
                makePlaceHolder.addAttr(n);
                return true;
            }
            */

            /*
            <placeholder属性をサポートしていない場合の処理>
             */

            //通常のinputのためにデフォルトのinput colorを取得しておく。
            makePlaceHolder.setdefaultColors();

            // inputにテキストを設置(初期表示)
            makePlaceHolder.addInputVal(n);

            // focus時の処理を追加
            // placetextと同じ場合は空白にする。
            // cssをデフォルトに戻す。
            makePlaceHolder.addFocus(n);

            // blur時の処理を追加
            // inputが空ならplacetextを追加する
            makePlaceHolder.addBlur(n);

        });

        makePlaceHolder.addSubmit();

        return this;
    };
}(jQuery));
