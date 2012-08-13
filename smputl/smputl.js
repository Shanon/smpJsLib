;(function($) {
    'use strict';
    var smputl = (function() {

        return {
         getValue: function($obj) {
            var tagName, inputType,
            checkbox_join_str = '<br />',

            getNodeTextValue = function(domobj) {
                return domobj.nextSibling.nodeValue;
            },

            getRadioValue = function($obj) {
                var $checked;
                $checked = $obj.filter(':checked');

                if ($checked.size() === 0) {
                    return '';
                }

                return getNodeTextValue($checked[0]);
            },

            getCheckBoxValue = function($obj) {
                var checked_strs = [],
                $checked = $obj.filter(':checked');

                $checked.each(function() {
                    checked_strs.push(getNodeTextValue($(this)[0]));
                });

                return checked_strs.join(checkbox_join_str);
            };

            tagName = $obj[0].tagName;
            if (tagName === 'INPUT') {
                inputType = $obj.attr('type');

                if (inputType === 'text') {
                    return $obj.val();
                }

                if (inputType === 'radio') {
                    return getRadioValue($obj);
                }
                
                if (inputType === 'checkbox') {
                    return getCheckBoxValue($obj);
                }
            }
            
            if (tagName === 'SELECT') {
                return $obj.find(':selected').text();
            }
            
            return $obj.text();
        }

    };
}());

window.smputl = smputl;
}(jQuery));