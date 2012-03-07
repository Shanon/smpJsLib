(function($) {
    $.fn.rbox = function() {
        return this.each(function() {
            var $input = $(this).find('input');
            $input.change(function() {
                if (this.checked === true) {
                    $input.not($(this)).attr('checked', false);
                }
            });
        });
    };
}(jQuery));
