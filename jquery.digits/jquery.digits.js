/*
 * refer to http://stackoverflow.com/questions/1990512/add-comma-to-numbers-every-three-digits-using-jquery
 */
(function($) {
    $.fn.digits = function() {
        return this.each(function() {
            var $this = $(this);
            var pureText = $this.text();

            $this.text(pureText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        });
    };
}(jQuery));
