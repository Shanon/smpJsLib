(function() {
    'use strict';

    var mpdateutl = window.mpdateutl,
    baseDate = mpdateutl.date('2012-01-01'),
    baseDateStr = '2012-01-01';

    module('mpdateutl.add testing');

    test('base add test', function() {
        var dateCheckYear = mpdateutl.add(baseDateStr, +1, 'y'),
        dateCheckMonth = mpdateutl.add(baseDateStr, +1, 'm'),
        dateCheckDate = mpdateutl.add(baseDateStr, +1, 'd');

        ok(dateCheckYear.getFullYear(), 'add year check date obj');
        ok(dateCheckMonth.getMonth(), 'add month check date obj');
        ok(dateCheckMonth.getMonth(), 'add date check date obj');
    });

    test('add year', function() {
        var yearAddDatePlus = mpdateutl.add(baseDate, +1, 'y'),
        yearAddDateMinus = mpdateutl.add(baseDate, -1, 'y');

        strictEqual(
            yearAddDatePlus.getFullYear(),
            2013,
            'date add year plus'
        );

        strictEqual(
            yearAddDateMinus.getFullYear(),
            2011,
            'date add year minus'
        );
    });

    test('add month', function() {
        var monthAddDatePlus = mpdateutl.add(baseDate, +1, 'm'),
        monthAddDateMinus = mpdateutl.add(baseDate, -1, 'm');

        strictEqual(
            monthAddDatePlus.getMonth(),
            1,
            'date add year plus'
        );

        strictEqual(
            monthAddDateMinus.getMonth(),
            11,
            'date add year minus'
        );

        strictEqual(
            monthAddDateMinus.getFullYear(),
            2011,
            'date add year minus check year'
        );
    });

    test('add date', function() {
        var dateAddDatePlus = mpdateutl.add(baseDate, +1, 'd'),
        dateAddDateMinus = mpdateutl.add(baseDate, -1, 'd');

        strictEqual(
            dateAddDatePlus.getDate(),
            2,
            'date add date plus'
        );

        strictEqual(
            dateAddDateMinus.getDate(),
            31,
            'date add date minus'
        );

        strictEqual(
            dateAddDateMinus.getMonth(),
            11,
            'date add date minus check month'
        );

        strictEqual(
            dateAddDateMinus.getFullYear(),
            2011,
            'date add date minus check year'
        );
    });

    module('mpdateutl.toMpString testing');
    test('toMpString', function() {
        var baseString = '2012-06-29 16:00',
        baseDate = mpdateutl.date(baseString);

        strictEqual(mpdateutl.toMpString(baseDate), baseString);
    });
}());
