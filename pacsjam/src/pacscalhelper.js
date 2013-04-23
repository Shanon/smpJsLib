;(function($, undefined) {
  /*global PacsJam, _, mpdateutl */
  'use strict';
  var pacsCalHelper = window.pacsCalHelper = {};

  pacsCalHelper.getMonthJsonPath = function(date) {
    var dates = mpdateutl.separate(date);
    var path = '/seminar/month/' + dates[0] + '/' + mpdateutl.zeroBind(dates[1]) + '.js';

    return path;
  };
}(jQuery));
