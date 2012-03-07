(function($) {
   $.fn.pullvalue = function() {
       var $OBJ = this;

       var valUtl = {
           // todo select and textarea and checkbox
           get: function($obj) {
               var tagName = $obj[0].tagName, inputType;
               
               if(tagName === 'INPUT') {
                   inputType = $obj.attr('type');
                   
                   if(inputType === 'text') {
                       return $obj.val();
                   } else if(inputType === 'radio') {
                       return  $obj.filter(':checked')[0].nextSibling.nodeValue;
                   }
               }
           },
           
           set: function($obj, value) {
               var tagName = $obj[0].tagName, inputType;
               
               if(tagName === 'INPUT') {
                   inputType = $obj.attr('type');
                   
                   if(inputType === 'text') {
                       $obj.val(value);
                   } else if(inputType === 'radio') {
                       $obj.each(function() {
                           var $this = $(this);
                           if($this[0].nextSibling.nodeValue.match(value)) {
                               $this.attr('checked', true);
                               return false;
                           }
                       });
                   }
               }
           }
       };
       
       // not test other input...
       var targetSearch = function($obj) {
           if($obj.find('input').size() > 0) {
               return $obj.find('input');
           } else if($obj.find('select').size() > 0) {
               return $obj.find('select');
           } else if($obj.find('textarea').size() > 0) {
               return $obj.find('textarea');
           }
       };

       $OBJ.each(function() {
           var $this = $(this);
           var $mastar = targetSearch($this);
           var pullTargetSelector = $this.data('pullvalue');
           var $pullTarget = $(pullTargetSelector);

           var pullText = valUtl.get($pullTarget);

           valUtl.set($mastar, pullText);
       });

       return this;
   };
}(jQuery));
