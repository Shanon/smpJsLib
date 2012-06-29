;(function() {
    'use strict';

    var mpdateutl = (function() {
        var days_pattern = ["日","月","火","水","木","金","土"],
        isArray = function(input) {
            return Object.prototype.toString.call(input) === '[object Array]';
        },
        zeroBind = function(str) {
            return ('0' + str).slice(-2);
        };

        return {
            date: function(obj) {
                var year, month, day, hour = 0, minute = 0;

                if(isArray(obj) === false) {
                    year = ((obj.match(/^..../, '')[0]) - 0);
                    month = ((obj.match(/-(.*?)-/)[1]) - 1);
                    day = ((obj.match(/-(..)(\s|T|$)/)[1]) - 0);

                    if (obj.length > 10) {
                        hour = ((obj.match(/(..):/)[1]) - 0);
                        minute = ((obj.match(/:(..)/)[1]) - 0);
                    }
                } else {
                    year = obj[0];
                    month = obj[1] - 1;
                    day = obj[2];
                    hour = obj[4];
                    minute = obj[5];
                }

                return new Date(year, month, day, hour, minute);
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
            }
        };
    }());

    window.mpdateutl = mpdateutl;
}());

