;(function($) {
  /*global test strictEqual ok PacsJam _ sampleJson*/
  'use strict';
  module('base testing', {
    setup: function() {
      this.pacsJam = new PacsJam(sampleJson);
    }
  });

  test('get', function() {
    var pj = this.pacsJam;

    strictEqual(pj.get('Title'), sampleJson.Title, 'text type');
    strictEqual(pj.get('Attribute80'), sampleJson.Attribute80[0].Attribute80Id, 'list type no arrg');
    strictEqual(pj.get('Attribute80', 'Name'), sampleJson.Attribute80[0].Attribute80Name, 'list type name');
    strictEqual(pj.get('PortalPublicationType'), sampleJson.PortalPublicationType.PortalPublicationTypeId, 'object type');
    strictEqual(pj.get('PortalPublicationType', 'Name'), sampleJson.PortalPublicationType.PortalPublicationTypeName, 'object type');
    // file path
    strictEqual(pj.get('Attribute14'), sampleJson.Attribute14.FilePath, 'object type');
  });
}(window.jQuery));
