;(function($) {
	'use strict';
	var testHide = function(selector) {
		var $blank_td = $(selector);
		$blank_td.nullHide();

		strictEqual($blank_td.parents('tr').is(':visible'), false);
	},

	testShow = function(selector) {
		var $blank_td = $(selector);
		$blank_td.parents('tr').show();
		$blank_td.text('test');
		$blank_td.nullHide();
		strictEqual($blank_td.parents('tr').is(':visible'), true, 'hide');
	};

	module('table nullhide testing', {
		setup: function() {
		}
	});
	test('blank testing', function() {
		var selector = '#blank_test';
		testHide(selector);
		testShow(selector);
	});

	test('hankaku space testing', function() {
		var selector = '#hankaku_space_test';
		testHide(selector);
		testShow(selector);
	});

	test('zenkaku space testing', function() {
		var selector = '#zenkaku_space_test';
		testHide(selector);
		testShow(selector);
	});

	test('space char testing', function() {
		var selector = '#space_char_test';
		testHide(selector);
		testShow(selector);
	});

	test('image tag testing hide', function() {
		var selector = '#image_tag_test_hide';
		testHide(selector);
		testShow(selector);
	});

	test('image tag testing show', function() {
		var selector = '#image_tag_test_show',
		$show_td = $(selector);
		$show_td.nullHide();

		strictEqual($show_td.parents('tr').is(':visible'), true, 'hide');
	});
}(jQuery));