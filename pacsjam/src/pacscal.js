;(function($, undefined) {
  /*global PacsJam, _ */
  'use strict';
  var PacsCal = window.PacsCal = (function() {
    function PacsCal() {
      this.initialize.apply(this, arguments);
    }

    PacsCal.fn = PacsCal.prototype;

    PacsCal.fn.initialize = function($obj, json, options) {
      this._$obj = $obj;
      this._jsons = json;

      this._events = [];
      this._eventSources = [];
      this._fullCalOpt = {};


      this._setting = $.extend({
        'gcal': true,
        'html': true,
        'status5': false,
        'tooltip': true ,
        'className': 'mp_cal',
        'baseDmain': '',
        'tooltipOpt': {
          'attrName': 'Detail',
          'x': -100,
          'y': 50
        }
      }, options);
    };

    PacsCal.fn.dump = function() {
      var cl = function(msg) {
        console.log(msg);
      };

      cl('json');
      cl(this._jsons);
      cl('json length');
      cl(this._jsons.length);
      cl('events');
      cl(this._events);
      cl('setting');
      cl(this._setting);
    };

    PacsCal.fn.gcal = function() {
      return $.fullCalendar.gcalFeed(
        "https://www.google.com/calendar/feeds/ja.japanese%23holiday@group.v.calendar.google.com/public/basic",
        {className:'holiday'}
      );
    };

    PacsCal.fn.reject = function(cb) {
      this._jsons = _.reject(this._jsons, function(n) {
        var pj = new PacsJam(n);
        return cb(pj);
      });

      return this;
    };

    PacsCal.fn.make = function(cb) {
      this._rejectCalEventDefalut();
      this._events = this.makeEventObjects(this._jsons, cb);

      return this;
    };

    PacsCal.fn.makeEventObjects = function(json, cb) {
      var self = this;
      var thisJsons = [];


      _.each(json, function(n) {
        var pj = new PacsJam(n);

        // default calobj option
        var calObj = {
          'title': pj.get('Title'),
          'start': pj.get('StartDay'),
          'className': self._setting.className,
          'url': pj.getSeminarPath(self._setting.baseDmain),
          'tooltip': self._tooltipMake(pj.get('Title'), pj.get(self._setting.tooltip.attrName))
        };

        // if callback function is exsist, extend calobj
        if (!!_.isFunction(cb)) {
          calObj = self._extendEventObj(calObj, cb(pj));
        }

        thisJsons.push(calObj);
      });

      return thisJsons;
    };

    PacsCal.fn.getEvents = function() {
      return this._events;
    };

    PacsCal.fn.render = function() {
      this._setCalOpt();
      this._$obj.fullCalendar(this._fullCalOpt);
      this.addEventSource(this._events);
    };

    PacsCal.fn.addEventSource = function(sources) {
      this._$obj.fullCalendar('addEventSource', sources);
    };

    PacsCal.fn.removeEventSource = function(sources) {
      this._$obj.fullCalendar('removeEventSource', sources);
    };

    PacsCal.fn.fullCalOptPush = function(obj) {
      this._fullCalOpt = $.extend(this._fullCalOpt, obj);
    };

    PacsCal.fn._tooltipMake = function(title, summary) {
      var titleDom = '<div class="tooltip_title">' + title + '</div>',
      summaryDom = '<div class="tootip_summary">' + summary + '</div>',
      tooltip = '<div id="tooltip">' + titleDom + summaryDom + '</div>';

      return tooltip;
    };


    // PacsCal.fn._setGcalEventSources = function() {
    //   if (!!this._setting.gcal) {
    //     this._eventSources.push(this.gcal());
    //   }

    //   this._eventSources.push(this._events);
    // };

    PacsCal.fn._extendEventObj = function(master, extend) {
      return $.extend(master, extend);
    };

    PacsCal.fn._rejectCalEventDefalut = function() {
      /*
       * status5 setting
       */
      if (!this._setting.status5) {
        this.reject(function(pj) {
          return (pj.get('SeminarStatus') === '5');
        });
      }
    };

    PacsCal.fn._setCalOpt = function() {
      var self = this;
      /*
       *  tooltip setting
       */
      if (!!this._setting.tooltip) {
        this.fullCalOptPush({
          eventMouseover: function(calEvent, jsEvent) {
            $('body').prepend(calEvent.tooltip);
            var xOffset = (self._setting.tooltipOpt.x - 0) + $('#tooltip').height(),
            yOffset = (self._setting.tooltipOpt.y - 0);

            $('#tooltip')
            .css('top', (jsEvent.clientY - xOffset) + 'px')
            .css('left', (jsEvent.clientX + yOffset) + 'px')
            .fadeIn('fast');
          },

          eventMouseout: function(calEvent, jsEvent) {
            $('#tooltip').remove();
          }
        });
      }

      /*
       *  html setting
       */
      if (!!this._setting.html) {
        this.fullCalOptPush({
          eventRender: function(event, $element) {
            var htmlStr = $element.text();

            $element.find('div').html(htmlStr);
          }
        });
      }

      /*
       *   calendar display setting
       */
      this.fullCalOptPush({
        header: {
          left: 'month,basicWeek',
          center: 'title',
          right: 'prev,next today'
        },
        titleFormat: {
          month: 'yyyy年 M月',
          week: '[yyyy年 ]M月 d日{ &#8212;[yyyy年 ][ M月] d日}'
        },
        dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
        dayNamesShort: ['日','月','火','水','木','金','土'],
        buttonText: {prev: '&nbsp;&#9668;&nbsp;', next: '&nbsp;&#9658;&nbsp;', prevYear: '&nbsp;&lt;&lt;&nbsp;', nextYear: '&nbsp;&gt;&gt;&nbsp;', today: '今日', month: '月', week: '週', day: '日'}
      });

      /*
       *  eventsouces setting
       */
      // this._setGcalEventSources();
    };

    return PacsCal;
  }());
}(window.jQuery));
