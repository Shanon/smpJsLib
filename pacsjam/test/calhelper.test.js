;(function($, undefined) {
  /*global ok, strictEqual, test, sampleJson, mpdateutl, PacsJam, PacsCal, pacsCalHelper*/
  'use strict';

  test('getMonthJsonPath', function() {
    var testDate = new Date(2013, 4, 2);
    var static_path = '/2013/04.json';

    var get_path = pacsCalHelper.getMonthJsonPath();

    strictEqual(get_path, static_path);
  });
}(window.jQuery));
