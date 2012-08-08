;(function($) {
	'use strict';
	var smputl = window.smputl;
	var $input_text = $('#input_text'),
	$select = $('#select'),
	$radio = $('#radios input'),
	$checkbox = $('#checkbox input');

	module('getValue testing', {
		setup: function() {
			this.text_input_val = 'text_input';

			$input_text.val(this.text_input_val); 
			$('#select').find('option:eq(0)').attr('selected', true);
			$radio.filter(':eq(0)').attr('checked', true);

			$checkbox.filter(':eq(0)').attr('checked', true);
			$checkbox.filter(':eq(1)').attr('checked', true);
		}
	});
	test('input text testing', function() {
		strictEqual(smputl.getValue($input_text), this.text_input_val);
	});
	test('select testing', function() {
		strictEqual(smputl.getValue($select), 'select1');
	});
	test('radio testing', function() {
		strictEqual(smputl.getValue($radio), 'radio1');
	});
	test('checkbox testing', function() {
		strictEqual(smputl.getValue($checkbox), 'check1<br />check2');
	});
}(jQuery));