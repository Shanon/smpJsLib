(function($) {
    $.fn.pullvalue = function() {
        var joinString = ':';
        var valUtl = {
            // todo select and textarea and checkbox
            get: function($obj) {
                var tagName = $obj[0].tagName, inputType;

                if (tagName === 'INPUT') {
                    inputType = $obj.attr('type');

                    if (inputType === 'text') {
                        return $obj.val();
                    } else if (inputType === 'radio') {
                        return $obj.filter(':checked')[0].nextSibling.nodeValue;
                    }
                } else if (tagName === 'SELECT') {
                    return $obj.find(':selected').text();
                }
            },

            set: function($obj, value) {
                var tagName = $obj[0].tagName, inputType;

                if (tagName === 'INPUT') {
                    inputType = $obj.attr('type');

                    if (inputType === 'text') {
                        $obj.val(value);
                    } else if (inputType === 'radio') {
                        $obj.each(function() {
                            var $this = $(this);
                            if ($this[0].nextSibling.nodeValue.match(value)) {
                                $this.attr('checked', true);
                                return false;
                            }
                        });
                    }
                }
            }
        };

        // not test other input...
        var targetSearch = function($obj) {
            if ($obj.find('input').size() > 0) {
                return $obj.find('input');
            } else if ($obj.find('select').size() > 0) {
                return $obj.find('select');
            } else if ($obj.find('textarea').size() > 0) {
                return $obj.find('textarea');
            }
        };

        return this.each(function() {
            var $this = $(this),
            $mastar = targetSearch($this),
            dataPullValue = $this.data('pullvalue'),
            pullTargetSelectors = [];
            pullTexts = [];


            if (Object.prototype.toString.call(dataPullValue) !== '[object Array]') {
                pullTargetSelectors.push(dataPullValue);
            } else {
                pullTargetSelectors = dataPullValue;
            }

            for (var i = 0, len = pullTargetSelectors.length; i < len; i++) {
                if ($(pullTargetSelectors[i]).size() === 0) {
                    continue;
                }
                pullTexts.push(valUtl.get($(pullTargetSelectors[i])));
            }

            valUtl.set($mastar, pullTexts.join(joinString));
        });
    };
}(jQuery));
