(function() {
    var baseDate = mpdateutl.date('2012-01-01');
    var baseDateStr = '2012-01-01';

    module('mpdateutl.add testing');

    test('base add test', function() {
        var dateCheckYear = mpdateutl.add(baseDateStr, +1, 'y'),
        dateCheckMonth = mpdateutl.add(baseDateStr, +1, 'm');
        dateCheckDate = mpdateutl.add(baseDateStr, +1, 'd');

        ok(dateCheckYear.getFullYear(), 'add year check date obj');
        ok(dateCheckMonth.getMonth(), 'add month check date obj');
        ok(dateCheckMonth.getMonth(), 'add date check date obj');
    });

    test('add year', function() {
        var yearAddDatePlus = mpdateutl.add(baseDate, +1, 'y'),
        yearAddDateMinus = mpdateutl.add(baseDate, -1, 'y');

        deepEqual(
            yearAddDatePlus.getFullYear(),
            2013,
            'date add year plus'
        );

        deepEqual(
            yearAddDateMinus.getFullYear(),
            2011,
            'date add year minus'
        );
    });

    test('add month', function() {
        var monthAddDatePlus = mpdateutl.add(baseDate, +1, 'm'),
        monthAddDateMinus = mpdateutl.add(baseDate, -1, 'm');

        deepEqual(
            monthAddDatePlus.getMonth(),
            1,
            'date add year plus'
        );

        deepEqual(
            monthAddDateMinus.getMonth(),
            11,
            'date add year minus'
        );

        deepEqual(
            monthAddDateMinus.getFullYear(),
            2011,
            'date add year minus check year'
        );
    });

    test('add date', function() {
        var dateAddDatePlus = mpdateutl.add(baseDate, +1, 'd'),
        dateAddDateMinus = mpdateutl.add(baseDate, -1, 'd');

        deepEqual(
            dateAddDatePlus.getDate(),
            2,
            'date add date plus'
        );

        deepEqual(
            dateAddDateMinus.getDate(),
            31,
            'date add date minus'
        );

        deepEqual(
            dateAddDateMinus.getMonth(),
            11,
            'date add date minus check month'
        );

        deepEqual(
            dateAddDateMinus.getFullYear(),
            2011,
            'date add date minus check year'
        );
    });
}());
