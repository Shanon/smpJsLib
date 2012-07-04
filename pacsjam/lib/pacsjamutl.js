(function() {
    'use strict';
    /*
     *  this script is shanon marketing platform web plugin utilyty
     */
    var pacsjamUtl = (function() {
        var pacsjamBaseUri = 'https://app.shanon.co.jp/pacsjam/static/output/';

        return {
            load: function(key, path, file) {
                var jsonpScript = document.createElement('script'),
                s = document.getElementsByTagName('script')[0],
                dateStr = Date.parse(new Date()),
                filePath = file? '/' + file: '';

                jsonpScript.type = 'text/javascript';
                jsonpScript.src = pacsjamBaseUri + key + '/' + path + filePath + '?' + dateStr;
                s.parentNode.insertBefore(jsonpScript, s);
            }
        };
    }());
    window.pacsjamUtl = pacsjamUtl;
}());
