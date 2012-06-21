(function ($) {
    'use strict';
    $.fn["optRemover"] = function(options) {
        var $obj = $(this),

        /*
        *  設定ファイル
        *  @type input || conf
        *  @text array
        */
        settings = $.extend({
            'type': 'input',
            'txt': []
        }, options),

        txtLen = settings.txt.length,

        hideAct = {
            'input': function($obj, index) {
                var $obj_br = $obj.next('br'),
                this_nextSib = $obj[0].nextSibling;

                if (this_nextSib.nodeValue.match(settings.txt[index])) {
                    $obj.hide();
                    this_nextSib.nodeValue = '';
                    $obj_br.hide();
                }
            },
            'select': function($obj, index) {
                var text = $obj.text();

                if (text === settings.txt[index]) {
                    $obj.hide();
                }
            },
            'conf': function($obj, index) {
                var $parent = $obj.parent(),
                old_html = $parent.html(),
                new_html = '';

                if (!!old_html && old_html.match(settings.txt[index])) {
                    new_html = old_html.replace(settings.txt[index] + '<br>', '');
                    $parent.html(new_html);
                }
            }
        };

        $obj.each(function() {
            var $this = $(this), i;

            for (i = 0; i < txtLen; i++) {
                hideAct[settings.type]($this, i);
            }
        });

        return this;
    };
}(window.jQuery));
