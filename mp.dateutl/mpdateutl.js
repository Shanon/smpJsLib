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
                var reg = /^(\d{4}|\d{2})(?:\x2d|\u002f)(\d{2}|\d)(?:\x2d|\u002f)(\d{2}|\d)(?:\s|T|$|\u3000)(\d{2})(?:\x3a|\uff1a)(\d{2})/,
                dateStr,
                year;

                if (typeof obj === 'string' && obj.length <= 10) {
                    obj += ' 00:00';
                }

                dateStr = obj.match(reg);
                year = dateStr[1].length !== 2 ? dateStr[1] : '20' + dateStr[1];

                return new Date(year, dateStr[2] - 1, dateStr[3], dateStr[4], dateStr[5]);
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

            isValid: function(str){
                var date = new Date(str),
                date_reg = /^(\d{4}|\d{2})(?:\x2d|\u002f)(\d{2}|\d)(?:\x2d|\u002f)(\d{2}|\d)/,

                valid = function() {
                    var date_strs = str.match(date_reg),
                    addDateStr = {};

                    addDateStr.date = function() {
                        return (date.getFullYear() - 0) + (date.getMonth() - 0) + (date.getDate() - 0);
                    };

                    addDateStr.str = function() {
                        return (date_strs[1] - 0) + (date_strs[2] - 1) + (date_strs[3] - 0);
                    };

                    if (isNaN(date.getTime()) || !date_strs) return false;

                    return addDateStr.date() === addDateStr.str();
                };

                if (Object.prototype.toString.call(date) !== "[object Date]") return false;

                return valid();
            }

        };
    }());
window.mpdateutl = mpdateutl;


function isValidDate(date_str) {
    var date = new Date(date_str);

    if (Object.prototype.toString.call(date) !== "[object Date]") return false;

    return !isNaN(date.getTime());
}

function isValidDate2(date_str) {
    var date = new Date(date_str),
    date_reg = /^(\d{4}|\d{2})(?:\x2d|\u002f)(\d{2}|\d)(?:\x2d|\u002f)(\d{2}|\d)/,

    valid = function() {
        var date_strs = date_str.match(date_reg),
        addDateStr = {};

        addDateStr.date = function() {
            return (date.getFullYear() - 0) + (date.getMonth() - 0) + (date.getDate() - 0);
        };

        addDateStr.str = function() {
            return (date_strs[1] - 0) + (date_strs[2] - 1) + (date_strs[3] - 0);
        };

        if (isNaN(date.getTime()) || !date_strs) return false;

        return addDateStr.date() === addDateStr.str();
    };

    if (Object.prototype.toString.call(date) !== "[object Date]") return false;

    return valid();
}

}());