;(function($) {
  'use strict';
  var mptrackHelper = {};

  mptrackHelper.gaCrossDomainClickApply = function() {
    var cross_domain_link_selector = '.mptrack_cross_domain';
    var $click_target = $(cross_domain_link_selector),

    clickAction = function(href, is_blank) {
      is_blank = is_blank || false;

      if (!is_blank) {
        window.open(href);
        return;
      }

      location.href = href;
    };

    $click_target.each(function() {
      $(this).click(function() {
        var href = _gat._getTrackerByName()._getLinkerUrl(_cam.link($(this).attr('href')));
        clickAction(href);
        return false;
      });
    });
  };

window.mptrackHelper = mptrackHelper;

}(jQuery));