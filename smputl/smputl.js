;(function($) {
  'use strict';

  var FormObjUtl = function() {
    this.initialize.apply(this, arguments);
  };

  FormObjUtl.fn = FormObjUtl.prototype;

  FormObjUtl.fn.initialize = function($obj, separator) {
    this._$obj = $obj;
    this._separator = separator || ':';
    this._obj_info = [];

    this.setObjInfo();
  };

  FormObjUtl.fn.setObjInfo = function() {
    var $obj = this._$obj,
    tag_name = this._$obj[0].tagName;

    if(tag_name === 'INPUT') {
      return this._obj_info = [$obj, tag_name, $obj.attr('type')];

    }

    if (tag_name === 'SELECT') {
      return this._obj_info = [$obj, tag_name, tag_name];
    }
  };

  FormObjUtl.fn.set = function(value, type) {
    this.obj[this._obj_info[1]][this._obj_info[2]].set(this._obj_info[0], value, type);
  };

  FormObjUtl.fn.get = function() {
    return this.obj[this._obj_info[1]][this._obj_info[2]].get(this._obj_info[0], this._separator);
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

          return $checked[0].nextSibling.nodeValue;
        },

        set: function($obj, value, type) {
          type = type || 'text';
          $obj.each(function() {
            var $this = $(this);

            if (type === 'text' && $this[0].nextSibling.nodeValue.match(value)) {
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
        get: function($obj, separator) {
          var checked_strs = [],
          $checked = $obj.filter(':checked');

          $checked.each(function() {
            checked_strs.push($(this)[0].nextSibling.nodeValue);
          });

          return checked_strs.join(separator);
        },

        set: function($obj, value, type) {
          type = type || 'text';
          $obj.each(function() {
            var $this = $(this);

            if (type === 'text' && $this[0].nextSibling.nodeValue.match(value)) {
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

      'hidden': {
        get: function($obj) { 
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



  var smputl = (function() {

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

  window.smputl = smputl;
}(jQuery));