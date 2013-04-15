;(function($) {
  'use strict';

  /**
   *  return nextSibling node value
   *  use get text when input is checkbox or radio button or hidden
   *
   *  @param {jQueryObject} $obj target jQuery object
   */
  var getNextSiblingNodeValue = function($obj) {
    return $.trim($obj[0].nextSibling.nodeValue);
  };


  var FormObjUtl = (function() {
    function FormObjUtl() {
      this.initialize.apply(this, arguments);
    }

    FormObjUtl.fn = FormObjUtl.prototype;

    /**
     *  @param {jQueryObject} $obj target jQuery object
     *  @param {Object} options options
     *  @param {String} [options.separator = ':'] separator when return multiple values
     *  @param {Boolean} [options.returnTextHidden = true] return text if input type is hidden
     */
    FormObjUtl.fn.initialize = function($obj, options) {
      // defaluet option setting
      options = $.extend({
        'separator': ':'
        , 'returnTextHidden': true
      }, options);

      this._$obj = $obj;
      this._options = options;
      this._obj_info = [];

      this.setObjInfo();
    };

    FormObjUtl.fn.setObjInfo = function() {
      var $obj = this._$obj,
      tag_name = this._$obj[0].tagName;

      if(tag_name === 'INPUT') {
        this._obj_info = [$obj, tag_name, $obj.attr('type')];
        return;
      }

      if (tag_name === 'SELECT') {
        this._obj_info = [$obj, tag_name, tag_name];
        return;
      }
    };

    FormObjUtl.fn.set = function(value, type) {
      this.obj[this._obj_info[1]][this._obj_info[2]].set(this._obj_info[0], value, type);
    };

    FormObjUtl.fn.get = function() {
      return this.obj[this._obj_info[1]][this._obj_info[2]].get(this._obj_info[0], this._options);
    };

    FormObjUtl.fn.obj = {
      'INPUT': {
        'text': {
          get: function($obj) {
            return $obj.val();
          },

          set: function ($obj, value) {
            $obj.val(value);
          }
        },

        'radio': {
          get: function($obj) {
            var $checked = $obj.filter(':checked');

            if ($checked.size() === 0) {
              return '';
            }

            return getNextSiblingNodeValue($checked);
          },

          set: function($obj, value, type) {
            type = type || 'text';
            $obj.each(function() {
              var $this = $(this);

              if (type === 'text' && getNextSiblingNodeValue($this).match(value)) {
                $this.attr('checked', true);
                return false;
              }

              if (type === 'val' && $this.val() - 0 === value - 0) {
                $this.attr('checked', true);
                return false;
              }

            });
          }

        },

        'checkbox': {
          get: function($obj, options) {
            var checked_strs = [];
            var separator = options.separator;
            var $checked = $obj.filter(':checked');

            $checked.each(function() {
              checked_strs.push(getNextSiblingNodeValue($(this)));
            });

            return checked_strs.join(separator);
          },

          set: function($obj, value, type) {
            type = type || 'text';
            $obj.each(function() {
              var $this = $(this);

              if (type === 'text' && getNextSiblingNodeValue($this).match(value)) {
                $this.attr('checked', true);
                return false;
              }

              if (type === 'val' && $this.val() - 0 === value - 0) {
                $this.attr('checked', true);
                return false;
              }
            });
          }

        },

        /**
         *  if returnTextHidden option is true, return text
         */
        'hidden': {
          /**
           *  @param {jQueryObject} $obj target jQuery object
           *  @param options Constructor option, use returnTextHidden parameters
           *  @param options.returnTextHidden if this options is true, return text
           */
          get: function($obj, options) {
            if (options.returnTextHidden === true) {
              return getNextSiblingNodeValue($obj);
            }
            return $obj.val();
          },

          set: function($obj, value) {
            $obj.val(value);
          }
        }
      },

      'SELECT': {
        'SELECT': {
          get: function($obj) {
            return $obj.find(':selected').text();
          },

          set: function($obj, value, type) {
            type = type || 'text';

            if (type === 'val') {
              $obj.val(value);
              return;
            }

            $obj.find('option').each(function() {
              var $this = $(this);

              if ($this.text() === value) {
                $this.attr('selected', true);
                return false;
              }
            });
          }
        }
      }
    };

    return FormObjUtl;
  }());


  var smputl = window.smputl = (function() {

    return {
      setInput: function($obj, value, type) {
        var fou = new FormObjUtl($obj);
        fou.set(value, type);
      },

      getInput: function($obj) {
        var fou = new FormObjUtl($obj);
        return fou.get($obj);
      }
    };
  }());
}(jQuery));
