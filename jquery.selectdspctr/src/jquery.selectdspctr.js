;(function($, undefined) {
  'use strict';

  var allOptionHide = function($obj) {
    $obj.find('option').hide();
  };

  var showOptions = function(value, setting, $target) {
    allOptionHide($target);

    if (!value || !setting[value]) return;

    $target.find('option').filter(function() {
      return ($.inArray($(this).val(), setting[value]) !== -1);
    }).show();
  };

  $.fn.selectdspctr = function() {
    var $select = this.find('select');
    var $target = $(this.data('target'));
    var click_setting = this.data('setting');

    // load action
    showOptions($select.find(':selected').val(), click_setting, $target);

    return this.each(function() {
      $(this).change(function() {
        var $this = $(this);
        var selected_value = $this.find(':selected').val();

        showOptions(selected_value, click_setting, $target);
      });
    });
  };
}(jQuery));
