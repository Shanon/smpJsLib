var mpdateutl = (function() {
    var days_pattern = ["日","月","火","水","木","金","土"];

    var isArray = function(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    };

    return {
        /*
        受け取った文字列を日付型にして返す
        文字列はMP出力もしくはpacsjamを想定
         */
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

        /*
        受け取ったオブジェクトが日付型ならそのまま返し、文字列なら日付型にして返す。
        ほぼ内部用。
         */
        checkDate: function(obj) {
            if (!!obj.getMonth) {
                return new Date(obj);
            } else {
                return new Date(this.date(obj));
            }
        },
        /*
        受け取った文字列を分割して返す。
        [year,month,day,hour,minute,days]
        文字列と日付型を考慮
         */
        separate: function(date) {
            //文字列が渡されている場合は、一度日付型にする。
            //曜日を取得するために必要
            date = this.checkDate(date);

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dates = date.getDate();
            var days = days_pattern[date.getDay()];
            var hours = date.getHours();
            var minutes = date.getMinutes();

            return [year, month, dates, days, hours, minutes];
        },
        /*
        指定された形式で加算を行う。
         */
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

            // return this.date(date_arr);
            return date;
        },

        /*
        2つの差分を返す。現状は日数を返す。
         */
        diff: function(date1, date2) {
            date1 = this.checkDate(date1);
            date2 = this.checkDate(date2);
            return (date1.getTime() - date2.getTime()) / 86400000;
        }
    };
}());
