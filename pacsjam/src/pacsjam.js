;(function() {
  /*global _, mpdateutl */
  'use strict';
  /*
   *  this script is shanon marketing platform web plugin utility
   *  require underscore.js 1.3.2 or later
   *  require mpdateutl
   */
  var PacsJam = window.PacsJam = (function() {
    function PacsJam() {
      this.initialize.apply(this, arguments);
    }

    /**
     *  @param {Object} json pacsjam's json
     */
    PacsJam.prototype.initialize = function(json) {
      this.json = json;
    };

    /**
     *  debug method
     */
    PacsJam.prototype.dump = function() {
      var cl = function(msg) {
        console.log(msg);
      };
      cl('json');
      cl(this.json);
    };

    /**
     *  @param {String} attribute jsons key name
     *  @param {Strign} [type = 'Id'] list object type
     *  @param {Object} option option
     *  @param {String} [option.separator = ':'] list object separator
     *  @param {String} [option.filePathAdv = true] if this option is true, filepath string is advance
     */
    PacsJam.prototype.get = function(attribute, type, option) {
      //----------  defaluet setting ----------//
      type = type || 'Id';
      option = _.extend({
        'separator': ':'
        , 'filePathAdv': true
      }, option);


      //----------  define variable and function ----------//
      var attr = this.json[attribute]
      , attr_key = attribute + type

      , getObjValue = function(attr, key) {
        if (!!option.filePathAdv && !!attr.FilePath) {
          return attr.FilePath;
        }

        return attr[key];
      }

      , getListValue = function(attrs, key) {
        var selectedValue = [];

        _.each(attrs, function(obj) {
          selectedValue.push(obj[key]);
        });

        return selectedValue.join(option.separator);
      };


      //----------  excecusion ----------//

      if (!this.has(attribute) || attr === null) {
        return '';
      }

      if (!!_.isObject(attr)) {

        if (!!_.isArray(attr)) {
          return getListValue(attr, attr_key);
        }

        return getObjValue(attr, attr_key);
      }

      return attr;
    };

    /**
     *  @param {String} [baseDmain = ''] base domain of seminar lihnk
     */
    PacsJam.prototype.getSeminarPath = function(baseDmain) {
      baseDmain = baseDmain || '';
      var baseUri = '/public/seminar/view/';

      return baseDmain + baseUri + this.get('Id');
    };


    /**
     *  @param {string} attribute json's key name
     */
    PacsJam.prototype.has = function(attribute) {
      return _.has(this.json, attribute);
    };


    /**
     *  replace new line character to br
     *  @param {String} str A stringt that contains a new line character
     */
    PacsJam.prototype.replaceNewLineChar = function(str) {
      return str.replace(/\r?\n/g, '<br />');
    };

    PacsJam.prototype.isCapacity = function() {
      var settingLimit = this.get('LimitUserNum') - 0,
      applications = this.get('NumberOfApplications') - 0,
      limit = settingLimit - applications;

      // "do not set limit" is true
      if (settingLimit === 0) {
        return true;
      }

      return (limit > 0);
    };

    PacsJam.prototype.isApplicationRange = function() {
      var startDay = this.get('ApplicationStartDay'),
      endDay = this.get('ApplicationEndDay'),
      today = new Date(),
      diffStartDay,
      diffEndDay;

      // "do not set startday and endday" is true
      if (startDay === '' && endDay === '') {
        return true;
      }

      diffStartDay = mpdateutl.diff(today, startDay);
      diffEndDay = mpdateutl.diff(today, endDay);
      return ((diffStartDay > 0) && (diffEndDay < 0));
    };

    PacsJam.prototype.isApplication = function() {
      return (this.isCapacity() && this.isApplicationRange());
    };
    return PacsJam;
  }());
}());
