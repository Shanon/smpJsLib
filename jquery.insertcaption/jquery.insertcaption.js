(function($) {
    $.fn.insertCaption = function() {
        var $OBJ = this;
        $OBJ.each(function() {
            var $this = $(this);

            if(!!$this.data('insertCaption')) {
                $this.before($this.data('insertCaption'));
            }
        });

        return this;
    };
}(jQuery));
