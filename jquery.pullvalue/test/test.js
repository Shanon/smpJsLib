(function($) {
    var $from_text = $('#from_text'),
    $to_text = $('#to_text'),
    $to_text_div = $('#to_text_div');

    module('target DOM testing');
    test('sample', function() {
        strictEqual($from_text.size(), 1, 'from text exist');
        strictEqual($to_text.size(), 1, 'to text exist');
    });


    module('text to text', {
        setup: function(){
            $from_text.val('testvalue');
        },
        teardown: function(){
            $from_text.val('');
            $to_text.val('');
        }
    });

    test('pull Down tag test', function() {
        $to_text.pullvalue('#from_text');
        strictEqual($to_text.val(), 'testvalue', 'Is copy');
    });

    test('div tag test (serach input', function() {
        $to_text_div.pullvalue('#from_text');
        strictEqual($to_text.val(), 'testvalue', 'Is copy');
    });


    module('override option test', {
        setup: function(){
        },
        teardown: function(){
            $from_text.val('');
            $to_text.val('');
        }
    });

    test('override option true(not setting)', function() {
        $from_text.val('testvalue1');
        $to_text_div.pullvalue('#from_text');

        strictEqual($to_text.val(), 'testvalue1', 'first copy');

        $from_text.val('testvalue2');
        $to_text_div.pullvalue('#from_text');

        strictEqual($to_text.val(), 'testvalue2', 'second copy');
    });

    test('override option false', function() {
        $from_text.val('testvalue1');
        $to_text_div.pullvalue('#from_text', {'overRide': false});

        strictEqual($to_text.val(), 'testvalue1', 'first copy');

        $from_text.val('testvalue2');
        $to_text_div.pullvalue('#from_text', {'overRide': false});

        strictEqual($to_text.val(), 'testvalue1', 'second copy');
    });

}(jQuery));
