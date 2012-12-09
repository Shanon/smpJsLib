(function() {
    'use strict';

    var mpdateutl = window.mpdateutl,
    baseDate = mpdateutl.date('2012-01-01'),
    baseDateStr = '2012-01-01';

    module('hyphen string test', {
        setup: function() {
            this.dateStr = '2012-01-02 03:04';
            this.dateStr2 = '2012-02-03　04:05';
            this.dateStr3 = '2012-03-04　05：06';
        }
    });

    test('date check', function() {
        var date = mpdateutl.date(this.dateStr);
        strictEqual(date.getFullYear(), 2012);
        strictEqual(date.getMonth(), 0);
        strictEqual(date.getDate(), 2);
        strictEqual(date.getHours(), 3);
        strictEqual(date.getMinutes(), 4);
    });

    test('zenkaku space', function() {
        var date = mpdateutl.date(this.dateStr2);
        strictEqual(date.getFullYear(), 2012);
        strictEqual(date.getMonth(), 1);
        strictEqual(date.getDate(), 3);
        strictEqual(date.getHours(), 4);
        strictEqual(date.getMinutes(), 5);
    });

    test('zenkaku koron', function() {
        var date = mpdateutl.date(this.dateStr3);
        strictEqual(date.getFullYear(), 2012);
        strictEqual(date.getMonth(), 2);
        strictEqual(date.getDate(), 4);
        strictEqual(date.getHours(), 5);
        strictEqual(date.getMinutes(), 6);
    });

    module('slash string test', {
        setup: function() {
            this.dateStr = '2012/01/01 00:00';
        }
    });

    test('date check', function() {
        var date = mpdateutl.date(this.dateStr);

        strictEqual(date.getFullYear(), 2012);
        strictEqual(date.getMonth(), 0);
        strictEqual(date.getDate(), 1);
        strictEqual(date.getHours(), 0);
        strictEqual(date.getMinutes(), 0);
    });

    module('yy/m/d', {
        setup: function() {
            this.dateStr = '12/1/1 00:00';
        }
    });

    test('date check', function() {
        var date = mpdateutl.date(this.dateStr);

        strictEqual(date.getFullYear(), 2012);
        strictEqual(date.getMonth(), 0);
        strictEqual(date.getDate(), 1);
        strictEqual(date.getHours(), 0);
        strictEqual(date.getMinutes(), 0);
    });

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

        strictEqual(mpdateutl.toMpString(baseDate, true), baseString, 'minute flg true');

        baseString = baseString.substr(0, 10);
        strictEqual(mpdateutl.toMpString(baseDate), baseString, 'minute flg true');
    });

    module('mpdateutl.isValid testing');
    test('isValid wrong texd', function() {
        var wrong_str = 'in valid str';
        ok(!mpdateutl.isValid(wrong_str));
    });
    test('isValid over2days', function() {
        var wrong_str = '2012/04/32';
        ok(!mpdateutl.isValid(wrong_str));
    });

    test('isValid over1days', function() {
        var wrong_str = '2012/04/31';
        ok(!mpdateutl.isValid(wrong_str));
    });

    test('isValid over1year', function() {
        var wrong_str = '2012/04/366';
        ok(!mpdateutl.isValid(wrong_str));
    });

    test('isValid correct texd', function() {
        var correct_str = '2012/08/20';
        ok(mpdateutl.isValid(correct_str));
    });
}());
