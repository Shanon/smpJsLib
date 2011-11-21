(function($) {
   var name_space = 'nullHide';
   $.fn[name_space] = function(options) {
       var elements = this;
       var settings = $.extend({
           'target_obj' : 'tr',
           'not_obj': ''
       }, options);
       var trimJ = function(text) {
           var rtrim = /^(\s|\u00A0|\u3000)+|(\s|\u00A0|\u3000)+$/g;
           return (text || "").replace(rtrim, "");
       };

       console.log(elements);
       elements.each(function() {
           var $this = $(this);
           var pureText = trimJ($this.text());

           if (settings.not_obj !== '') {
               deleteText = $this.find(settings.not_obj).text();

               pureText = pureText.replace(deleteText, '');
           }

           if (pureText === "" && settings.target_obj !== 'this') {
               $this.parents(settings.target_obj).hide();
           } else if (pureText === "" && settings.target_obj === 'this') {
               $this.hide();
           }
       });

       return this;
   };
})(jQuery);
