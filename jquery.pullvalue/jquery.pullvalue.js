(function($) {
   $.fn.pullvalue = function() {
       var $OBJ = this;

       var textGet = function($obj) {
           var type = $obj.attr('type');
           var returnText = '';

           if(type === 'text' || $obj[0].tagName === 'TEXTAREA') {
               return $obj.val();
           } else if(type === 'radio') {
               $obj.each(function() {
                   var $this = $(this);
                   if($this.attr('checked') === 'checked') {
                       returnText = $this[0].nextSibling.nodeValue;
                   }
               });

               return returnText;
           }
       };

       $('form').submit(function() {
           $OBJ.each(function() {
               var $this = $(this);
               var $mastar = $this.find('input');
               var pullTargetSelector = $this.data('pullvalue');
               var $pullTarget = $(pullTargetSelector);

               var pullText = textGet($pullTarget);

               $mastar.val(pullText);
           });
       });

       return this;
   };
}(jQuery));
