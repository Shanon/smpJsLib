(function($) {
  'use strict';
  /*global smputl, test, strictEqual*/
  var $input_text = $('#input_text'),
  $select = $('#select'),
  $radio = $('#radios input'),
  $checkbox = $('#checkbox input'),
  $hidden = $('#hidden');

  var text_value = 'text_value',
  radio_value = 'radio one',
  check_value = 'check one',
  select_value = 'select2',
  hidden_value = 'hidden',
  hidden_text = 'hiddenText';

  module('setValue testing');
  test('input testing', function() {

    smputl.setInput($input_text, text_value);
    strictEqual($input_text.val(), text_value, 'input text set');

    smputl.setInput($radio, radio_value);
    strictEqual($radio.val(), '1', 'input radio set');

    smputl.setInput($checkbox, check_value);
    strictEqual($checkbox.filter(':checked').val(), '1', 'input checkbox set');

    smputl.setInput($hidden, hidden_value);
    strictEqual($hidden.val(), hidden_value, 'input hidden set');
  });

  test('select testing', function() {
    smputl.setInput($select, select_value);
    strictEqual($select.find(':selected').text(), select_value, 'select set');

    smputl.setInput($checkbox, check_value);
    strictEqual($radio.val(), '1', 'input checkbox set');
  });


  test('input testing val', function() {
    smputl.setInput($radio, 2, 'val');
    strictEqual($radio.filter(':checked').val(), '2', 'input radio set');

    $checkbox.attr('checked', false);
    smputl.setInput($checkbox, 1, 'val');
    strictEqual($checkbox.filter(':checked').val(), '1', 'input checkbox set');
  });

  test('select testing val', function() {
    $('#select').val('1');
    smputl.setInput($select, 2, 'val');
    strictEqual($select.find(':selected').text(), select_value, 'select set');
  });

  module('getValue', {
    setup: function() {
      smputl.setInput($input_text, text_value);
      smputl.setInput($radio, radio_value);
      smputl.setInput($checkbox, check_value);
      smputl.setInput($select, select_value);
      smputl.setInput($hidden, hidden_value);
    }
  });
  test('input testing', function() {
    var it_value = smputl.getInput($input_text),
    ir_value = smputl.getInput($radio),
    ic_value = smputl.getInput($checkbox),
    ih_value = smputl.getInput($hidden);

    strictEqual(it_value, text_value, 'input text get');
    strictEqual(ir_value, radio_value, 'input radio get');
    strictEqual(ic_value, check_value, 'input checkbox get');
    strictEqual(ih_value, hidden_text, 'input hidden get');

    //multi check
    smputl.setInput($checkbox, 'check two');
    ic_value = smputl.getInput($checkbox);
    strictEqual(ic_value, 'check one:check two', 'input multi check get');
  });

  test('select testing', function() {
    var se_value = smputl.getInput($select);

    strictEqual(se_value, select_value, 'select get');
  });

}(jQuery));
