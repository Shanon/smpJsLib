(function ($) {
    $.fn["optRemover"] = function(options) {
        var $obj = $(this);

        /*
        *  設定ファイル
        *  @type input || conf
        *  @text array
        */
        var settings = $.extend({
            'type': 'input',
            'txt': []
        }, options);

        var txtLen = settings.txt.length;

        var hideAct = {
            'input': function($obj, index) {
                var $obj_br = $obj.next('br');
                var this_nextSib = $obj[0].nextSibling;

                if (this_nextSib.nodeValue.match(settings.txt[index])) {
                    $obj.hide();
                    this_nextSib.nodeValue = '';
                    $obj_br.hide();
                }
            },
            'conf': function($obj, index) {
                var $parent = $obj.parent();
                var old_html = $parent.html();

                if (!!old_html && old_html.match(settings.txt[index])) {
                    var new_html = old_html.replace(settings.txt[index] + '<br>', '');
                    $parent.html(new_html);
                }
            }
        };

        $obj.each(function() {
            var $this = $(this);

            for (var i = 0; i < txtLen; i++) {
                hideAct[settings.type]($this, i);
            }
        });

        return this;
    };
})(jQuery);
