(function () {
  'use strict';
  angular
      .module('app.common')
      .service('trackEvents', trackEvents);

  trackEvents.$inject = ['Angularytics','CONFIG'];

  function trackEvents(Angularytics,CONFIG) {

    var service = {
      record: record
    };
    return service;

    function record(action,label) {
      Angularytics.trackEvent(CONFIG.gaCat, action, label);
    }
  }

})();
