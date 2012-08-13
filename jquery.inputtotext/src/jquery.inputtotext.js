/*
* require smputl
*/
;(function($) {
    'use strict';

    $.fn.inputToText = function(options) {
        var settings = $.extend({
            'parentSelector' : 'div.requiredInput',
            'wrapClassName': 'input_to_text'
        }, options),

        /*
        変換したテキスト部分のスタイルを変更する必要があるときのために
        テキスト部分をくるむ
        */
        build$WrapObj = function(txt) {
            var $wrapObj = $('<div>');
            $wrapObj.attr('class', settings.wrapClassName);
            $wrapObj.text(txt);

            return $wrapObj;
        };

        return this.each(function() {
            var $this = $(this),
            $this_val = window.smputl.getValue($this),
            $parent = $this.parents(settings.parentSelector);

            $parent.hide();
            $parent.after(build$WrapObj($this_val));
        });
    };
}(window.jQuery));