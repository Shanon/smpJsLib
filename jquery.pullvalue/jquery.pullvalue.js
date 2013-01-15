(function($) {
    var getValue = function($obj) {
        var tagName, inputType;

        var getRadioValue = function($obj) {
            var $checked;
            $checked = $obj.filter(':checked');

            if ($checked.size() === 0) {
                return '';
            }

            return $checked[0].nextSibling.nodeValue;
        };

        tagName = $obj[0].tagName;
        if (tagName === 'INPUT') {
            inputType = $obj.attr('type');

            if (inputType === 'text') {
                return $obj.val();
            } else if (inputType === 'radio') {
                return getRadioValue($obj);
            }
        } else if (tagName === 'SELECT') {
            return $obj.find(':selected').text();
        } else {
            return $obj.text();
        }
    };

    var valUtl = (function() {
        var settings;

        return {
            setSettings: function(_settings) {
                settings = _settings;
            },

            get: function($obj) {
                var value, values;
                values = [];

                $obj.each(function() {
                    value = getValue($(this));

                    if (value === '') {
                        return true;
                    }

                    values.push(value);
                });

                return values.join(settings.joinString);
            },

            set: function($obj, value) {
                var tagName = $obj[0].tagName, inputType;

                // value is not override if override option false and now value already exist
                if (valUtl.get($obj) !== '' && settings.overRide === false) {
                    return;
                }


                if (tagName === 'INPUT') {
                    inputType = $obj.attr('type');

                    if (inputType === 'text') {
                        $obj.val(value);
                    } else if (inputType === 'radio') {
                        $obj.each(function() {
                            var $this = $(this);
                            if (value !== '' && $this[0].nextSibling.nodeValue.match(value)) {
                                $this.attr('checked', true);
                                return false;
                            }
                        });
                    }
                } else if (tagName === 'SELECT') {
                    $obj.find('option').each(function() {
                        var $this = $(this);

                        if ($this.text() === value) {
                            $this.attr('selected', true);
                            return false;
                        }
                    });
                }
            }
        };
    }());

    var targetSearch = function($obj) {
        var tagName = $obj[0].tagName;
        if (tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
            return $obj;
        } if ($obj.find('input').size() > 0) {
            return $obj.find('input');
        } else if ($obj.find('select').size() > 0) {
            return $obj.find('select');
        } else if ($obj.find('textarea').size() > 0) {
            return $obj.find('textarea');
        }
    };

    $.fn.pullvalue = function(options) {
        var settings = $.extend({
            'joinString': ':',
            'overRide': true
        }, options);

        // target selector initialize
        if (typeof settings.selectors === 'undefined') {
            settings.selectors = this.data('pullvalue');
        }

        valUtl.setSettings(settings);

        return this.each(function() {
            var $this = $(this),
            $mastar = targetSearch($this),
            pullTargetSelectors = [];
            pullTexts = [];

            if (Object.prototype.toString.call(settings.selectors) !== '[object Array]') {
                pullTargetSelectors.push(settings.selectors);
            } else {
                pullTargetSelectors = settings.selectors;
            }

            for (var i = 0, len = pullTargetSelectors.length; i < len; i++) {
                if ($(pullTargetSelectors[i]).size() === 0) {
                    continue;
                }
                pullTexts.push(valUtl.get($(pullTargetSelectors[i]), settings));
            }

            valUtl.set($mastar, pullTexts.join(settings.joinString));
        });
    };
}(jQuery));