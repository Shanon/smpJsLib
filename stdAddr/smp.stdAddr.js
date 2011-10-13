var smp_stdAddr = (function() {
    // aタグの中から指定されたクラスを探して戻します。
    var getAClassObj = function (className) {
        var arr = [];
        var elem = document.getElementsByTagName('a');
        for ( var i = 0; i<elem.length; i++ ) {
            if ( elem[i].className === className ) {
                arr.push( elem[i] );
            }
        }
        return arr;
    };
    var strAddr = function(dom, addStr) {
        var nowHref = dom.href;
        owHref = nowHref + '&' + 'start_day_start=' + addStr;
        dom.href = owHref;
    };
    // 現在日付を YYYY-MM-DD の文字列に変換する
    // 現在は今日のみをサポート
    var dateStrBuilder = function() {
        var nowDate = new Date();
        var rY, rM, rD;
        rY = nowDate.getFullYear();
        rM = nowDate.getMonth() + 1;
        rD = nowDate.getDate();

        return rY + '-' + rM + '-' + rD;
    };

    return {
        add: function(className) {
            var targetObjs = getAClassObj(className);
            var addStr = dateStrBuilder();

            for ( var i = 0; i < targetObjs.length; i++) {
                strAddr(targetObjs[i], addStr);
            }
        }
    };
}());
