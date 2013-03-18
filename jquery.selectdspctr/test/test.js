;(function($) {
  /*global test, module, strictEqual, notStrictEqual, ok */
  'use strict';
  var $target = $('#target select');

  var displayShowLength = function($obj) {
    var count = 0;

    $obj.each(function() {
      if ($(this).css('display') !== 'none') {
        count++;
      }
    });

    return count;
  };

  $('#base').selectdspctr();

  test('init is no display option', function() {
    strictEqual(displayShowLength($target.find('option')), 0);
  });
}(jQuery));
