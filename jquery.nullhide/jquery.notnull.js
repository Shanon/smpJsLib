(function($) {
    var name_space = 'notnull';
    $.fn[name_space] = function(msg) {
        var $this = $(this), $OBJ = $this;

        var isNull = function($obj) {
            var isnull = false;
            var thisType = ($obj[0].tagName !== 'INPUT') ? $obj[0].tagName
                    .toLowerCase() : $obj.attr('type');

            /*
             * input || select のタイプ事にnullかどうかの判別を実施。
             */
            var isnullFunc = (function() {
                return {
                    'radiocheck' : function($obj) {
                        var errFlg = 0;
                        $obj.each(function() {
                            if (!!$(this).attr('checked')) {
                                errFlg++;
                            }
                        });
                        return (errFlg === 0) ? true : false;
                    },
                    'text' : function($obj) {
                        var errFlg = 0;
                        $obj.each(function() {
                            if ($(this).val() !== '') {
                                errFlg++;
                            }
                        });
                        return (errFlg === 0) ? true : false;
                    },
                    'radio' : function($obj) {
                        return this.radiocheck($obj);
                    },
                    'checkbox' : function($obj) {
                        return this.radiocheck($obj);
                    },
                    'select' : function($obj) {
                        var errFlg = 0;
                        $obj.each(function() {
                            if (($(this).find(':selected').val() - 0) !== 0) {
                                errFlg++;
                            }
                        });

                        return (errFlg === 0) ? true : false;
                    }
                };
            }());

            isnull = isnullFunc[thisType]($obj);

            return (isnull === true) ? true : false;
        };

        /*
         * 必須エラーの場合に実行される処理
         */
        function errFunc(msg) {
            alert(msg);
        }

        /*
         * formのsubmitで実行
         */
        $('form').submit(function() {
            if (isNull($OBJ) === true) {
                errFunc(msg);
                return false;
            }
        });
    };
}(jQuery));