(function () {
  'use strict';

  angular
    .module('app.sweepstake')
    .service('sweepstakeAPIService', sweepstakeAPIService);

  sweepstakeAPIService.$inject = ['$http', '$q', 'CONFIG'];

  function sweepstakeAPIService($http, $q, CONFIG) {

    this.fetch = function() {
      var def = $q.defer();
      var url = CONFIG.flow.endpoint;

      var req = $http({
        method: 'OPTIONS',
        responseType: 'json',
        url: url
      });

      req.success(function (data) {
        def.resolve(data);
      });

      return def.promise;
    };

  }

})();
