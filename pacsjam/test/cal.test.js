;(function($) {
  /*global strictEqual, test, sampleJson, mpdateutl, PacsJam, PacsCal*/
  'use strict';
  var defalutOption = {
    'gcal': false,
    'tooltip': false,
    'baseDmain': 'https://www.shanon.co.jp/',
    'className': 'mpCal'
  };

  var startDayApply = function() {
    for (var i = 0, l = sampleJson.length; i < l; i++) {
      sampleJson[i].StartDay = mpdateutl.toMpString(mpdateutl.add(new Date(), i, 'd'));
    }
  };

  module('base testing', {
    setup: function() {
      strictEqual($('.mpCal').size(), 0, 'initilize check');
      startDayApply();

      this.htmlNum = 2;
      this.pj = new PacsJam(sampleJson[0]);
      this.htmlPj = new PacsJam(sampleJson[this.htmlNum]);

      var pc = new PacsCal(sampleJson, defalutOption);
      pc.eventMake();
      pc.render($('#calendar'));
    },

    teardown: function() {
      $('#calendar').empty();
    }
  });

  test('calendar info test', function() {
    strictEqual($('.mpCal').size(), sampleJson.length - 1, 'event object check');
    strictEqual($('.mpCal').eq(0).text(), this.pj.get('Title'), 'event text check');
    strictEqual($('.mpCal').eq(0).attr('href'), defalutOption.baseDmain + '/public/seminar/view/' + this.pj.get('Id'), 'link text check');
  });

  test('html option test', function() {
    strictEqual($('.mpCal').eq(this.htmlNum).find('.fc-event-inner').html(), this.htmlPj.get('Title'), 'html string check');
  });

  // ToDo
  // toottip testing

  module('custum event test', {
    setup: function() {
      strictEqual($('.mpCal').size(), 0, 'initilize check');
      startDayApply();

      this.num = 1;
      this.pj = new PacsJam(sampleJson[this.num]);
      var self = this;

      var pc = new PacsCal(sampleJson, defalutOption);
      pc.eventMake(function() {
        return {'title': self.pj.get('Title') + self.pj.get('SubTitle')};
      });
      pc.render($('#calendar'));
    },

    teardown: function() {
      $('#calendar').empty();
    }
  });

  test('calendar info test', function() {
    strictEqual($('.mpCal').eq(this.num).text(), this.pj.get('Title') + this.pj.get('SubTitle'), 'event text check');
    strictEqual($('.mpCal').eq(this.num).attr('href'), defalutOption.baseDmain + '/public/seminar/view/' + this.pj.get('Id'), 'link text check');
  });

  module('event reject test', {
    setup: function() {
      strictEqual($('.mpCal').size(), 0, 'initilize check');
      startDayApply();

      this.num = 1;
      this.pj = new PacsJam(sampleJson[this.num]);
      var self = this;

      var pc = new PacsCal(sampleJson, defalutOption);

      // not today is reject
      pc.reject(function(pj) {
        return (mpdateutl.diff(new Date(), pj.get('StartDay')) < 0);
      });
      pc.eventMake();
      pc.render($('#calendar'));
    },

    teardown: function() {
      $('#calendar').empty();
    }
  });

  test('calendar info test', function() {
    strictEqual($('.mpCal').size(), 1, 'event object check');
  });
}(window.jQuery));
