;(function($) {
    'use strict';

    var class_selector = '.input_to_text',

    getTargetText = function($obj) {
        return $obj.parents('tr:first').find(class_selector).text();
    };

    test('input text testing', function() {
        var test_value = 'testvalue',
        $test_target = $('#ss_admin_VisitorData_D__1__D_email_value input');

        $test_target.val(test_value);
        $test_target.inputToText();

        strictEqual(getTargetText($test_target), test_value);
    });

    test('input radio testing', function() {
        var $test_target = $('#ss_admin_visitordata_d__1__d_sub_email_valid_row input'),
        $text_target;
    });
}(window.jQuery));