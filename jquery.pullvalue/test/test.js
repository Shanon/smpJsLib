(function($) {
    var $from_text = $('#from_text'),
    $to_text = $('#to_text'),
    $to_text_div = $('#to_text_div'),
    $dataAttr = $('#data_attr');

    module('text to text', {
        setup: function(){
            $from_text.val('testvalue');
        },
        teardown: function(){
            $from_text.val('');
            $to_text.val('');
        }
    });
    test('input tag test', function() {
        $to_text.pullvalue({'selectors': '#from_text'});
        strictEqual($to_text.val(), 'testvalue', 'Is copy');
    });
    test('div tag test (serach input', function() {
        $to_text.pullvalue({'selectors': '#from_text'});
        strictEqual($to_text.val(), 'testvalue', 'Is copy');
    });


    module('custom data value version', {
        setup: function(){
            $from_text.val('testvalue');
        },
        teardown: function(){
            $from_text.val('');
            $to_text.val('');
        }
    });
    test('pull Down tag test', function() {
        $dataAttr.pullvalue();
        strictEqual($dataAttr.find('input').val(), 'testvalue', 'Is copy');
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
        $to_text.pullvalue({'selectors': '#from_text'});

        strictEqual($to_text.val(), 'testvalue1', 'first copy');

        $from_text.val('testvalue2');
        $to_text.pullvalue({'selectors': '#from_text'});

        strictEqual($to_text.val(), 'testvalue2', 'second copy');
    });

    test('override option false', function() {
        $from_text.val('testvalue1');

        $to_text_div.pullvalue({'selectors': '#from_text', 'overRide': false});

        strictEqual($to_text.val(), 'testvalue1', 'first copy');

        $from_text.val('testvalue2');
        $to_text_div.pullvalue({'selectors': '#from_text', 'overRide': false});

        strictEqual($to_text.val(), 'testvalue1', 'second copy');
    });
}(jQuery));
