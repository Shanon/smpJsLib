(function() {
    'use strict';
    /*
     *  this script is shanon marketing platform web plugin utility
     *  require underscore.js 1.3.2 or later
     *  require mpdateutl
     */
    var _ = window._,
    mpdateutl = window.mpdateutl;

    var PacsJam = function() {
        this.initialize.apply(this, arguments);
    };

    PacsJam.prototype.initialize = function(json) {
        this.json = json;
    };

    PacsJam.prototype.dump = function() {
        var cl = function(msg) {
            console.log(msg);
        };
        cl('json');
        cl(this.json);
    };

    PacsJam.prototype.get = function(attribute) {
        var attr = this.json[attribute];

        if (!this.has(attribute) || attr === null) {
            return '';
        }

        if (!!_.isObject(attr)) {
            return attr[attribute + 'Id'];
        }

        return attr;
    };

    PacsJam.prototype.getSeminarPath = function(baseDmain) {
        baseDmain = baseDmain || '';
        var baseUri = '/public/seminar/view/';

        return baseDmain + baseUri + this.get('Id');
    };

    PacsJam.prototype.has = function(attribute) {
        return _.has(this.json, attribute);
    };

    PacsJam.prototype.isCapacity = function() {
        var settingLimit = this.get('LimitUserNum') - 0,
        applications = this.get('NumberOfApplications') - 0,
        limit = settingLimit - applications;

        // "do not set limit" is true
        if (settingLimit === 0) {
            return true;
        }

        return (limit > 0);
    };

    PacsJam.prototype.isApplicationRange = function() {
        var startDay = this.get('ApplicationStartDay'),
        endDay = this.get('ApplicationEndDay'),
        today = new Date(),
        diffStartDay,
        diffEndDay;

        // "do not set startday and endday" is true
        if (startDay === '' && endDay === '') {
            return true;
        }

        diffStartDay = mpdateutl.diff(today, startDay);
        diffEndDay = mpdateutl.diff(today, endDay);
        return ((diffStartDay > 0) && (diffEndDay < 0));
    };

    PacsJam.prototype.isApplication = function() {
        return (this.isCapacity() && this.isApplicationRange());
    };

    window.PacsJam = PacsJam;
}());
