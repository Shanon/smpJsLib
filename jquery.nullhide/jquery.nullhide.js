;(function($) {
	'use strict';
	$.fn.nullHide = function(options) {
		var settings = $.extend({
			'target_obj' : 'tr'
		}, options),

		trimJ = function(text) {
			var rtrim = /^(\s|\u00A0|\u3000)+|(\s|\u00A0|\u3000)+$/g;
			return (text || "").replace(rtrim, "");
		},

        trimScrioptText = function($obj) {
            var $script = $obj.find('script'),
            no_script_text = $obj.text();

            if ($script.size() > 0) {
                no_script_text = no_script_text.replace($script.text(), '');
            }

            return no_script_text;
        },

        trim = function($obj) {
            var trimed_text = '';
            trimed_text = trimScrioptText($obj);
            trimed_text = trimJ(trimed_text);

            return trimed_text;
        };

		return this.each(function() {
			var $this = $(this),
			pureText = trim($this);

            if (pureText === "" && settings.target_obj !== 'this') {
                $this.parents(settings.target_obj).hide();
            }
            else if (pureText === "" && settings.target_obj === 'this') {
                $this.hide();
            }
        });
	};
}(jQuery));