var mpdateutl = (function() {
    var days_pattern = ["日","月","火","水","木","金","土"];

    return {
        /*
        受け取った文字列を日付型にして返す
        文字列はMP出力もしくはpacsjamを想定
         */
        date: function(str) {
            var year = ((str.match(/^..../, '')[0]) - 0);
            var month = ((str.match(/-(.*?)-/)[1]) - 1);
            var day = ((str.match(/-(..)(\s|T)/)[1]) - 0);
            var hour = ((str.match(/(..):/)[1]) - 0);
            var minute = ((str.match(/:(..)/)[1]) - 0);

            return new Date(year, month, day, hour, minute);
        },

        /*
        受け取ったオブジェクトが日付型ならそのまま返し、文字列なら日付型にして返す。
        ほぼ内部用。
         */
        checkDate: function(obj) {
            if (!!obj.getMonth) {
                return obj;
            } else {
                return this.date(obj);
            }
        },
        /*
        受け取った文字列を分割して返す。
        [year,month,day,hour,minute,days]
        文字列と日付型を考慮
         */
        separate: function(obj) {
            //文字列が渡されている場合は、一度日付型にする。
            //曜日を取得するために必要
            obj = this.checkDate(obj);

            var year = obj.getFullYear();
            var month = obj.getMonth() + 1;
            var date = obj.getDate();
            var days = days_pattern[obj.getDay()];
            var hours = obj.getHours();
            var minutes = obj.getMinutes();

            return [year, month, date, days, hours, minutes];
        },

        /*
        2つの差分を返す。現状は日数を返す。
         */
        diff: function(date1, date2) {
            date1 = this.checkDate(date1);
            date2 = this.checkDate(date2);
            return (date1.getTime() - date2.getTime()) / 86400000;
        }
    }
}());
