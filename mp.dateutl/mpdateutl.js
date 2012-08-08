;(function() {
    'use strict';

    var mpdateutl = (function() {
        var days_pattern = ['\u65e5', '\u6708', '\u706b', '\u6c34', '\u6728', '\u91d1', '\u571f'],
        isArray = function(input) {
            return Object.prototype.toString.call(input) === '[object Array]';
        },
        zeroBind = function(str) {
            return ('0' + str).slice(-2);
        };

        return {
            date: function(obj) {
                var reg = /^(\d{4})(?:\x2d|\u002f)(\d{2})(?:\x2d|\u002f)(\d{2})(?:\s|T|$|\u3000)(\d{2})(?:\x3a|\uff1a)(\d{2})/,
                dateStr;

                if (typeof obj === 'string' && obj.length <= 10) {
                    obj += ' 00:00';
                }

                dateStr = obj.match(reg);

                return new Date(dateStr[1], dateStr[2] - 1, dateStr[3], dateStr[4], dateStr[5]);
            },

            checkDate: function(obj) {
                if (!!obj.getMonth) {
                    return new Date(obj);
                } else {
                    return new Date(this.date(obj));
                }
            },

            separate: function(date) {
                date = this.checkDate(date);

                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var dates = date.getDate();
                var days = days_pattern[date.getDay()];
                var hours = date.getHours();
                var minutes = date.getMinutes();

                return [year, month, dates, days, hours, minutes];
            },

            toMpString: function(date) {
                var dates = this.separate(date);

                for(var i = 1, l = dates.length; i < l; i++) {
                    dates[i] = zeroBind(dates[i]);
                }

                return dates[0] + '-' + dates[1] + '-' + dates[2] + ' ' + dates[4] + ':' + dates[5];
            },

            add: function(date, num, format) {
                date = this.checkDate(date);

                switch(format) {
                    case 'y':
                        date.setFullYear(date.getFullYear() + num);
                    break;

                    case 'm':
                        date.setMonth(date.getMonth() + num);
                    break;

                    case 'd':
                        date.setDate(date.getDate() + num);
                    break;
                }

                return date;
            },

            diff: function(date1, date2) {
                date1 = this.checkDate(date1);
                date2 = this.checkDate(date2);
                return (date1.getTime() - date2.getTime()) / 86400000;
            },

        };
    }());

    window.mpdateutl = mpdateutl;
}());