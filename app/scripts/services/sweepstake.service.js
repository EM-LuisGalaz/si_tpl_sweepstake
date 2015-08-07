(function () {
  'use strict';

  angular
    .module('app.sweepstake')
    .service('sweepstakeAPIService', sweepstakeAPIService);

  sweepstakeAPIService.$inject = ['$http', '$q', 'CONFIG', '$httpParamSerializer', '$rootScope'];

  function sweepstakeAPIService($http, $q, CONFIG, $httpParamSerializer, $rootScope) {

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

    this.store = function(sweepstakeForm) {
      var def = $q.defer();
      var url = CONFIG.flow.endpoint;

      $http.defaults.useXDomain = true;

      var req = $http({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Authorization' :'Bearer ' + CONFIG.flow.bearer
        },
        url: url + '?' + $httpParamSerializer(sweepstakeForm)
      });

      req.success(function (data) {
        $rootScope.$broadcast('si.sweepstake.success', data);
        def.resolve(data);
      });

      req.error(function (data) {
        $rootScope.$broadcast('si.sweepstake.error', data);
        def.reject(data);
      });

      return def.promise;
    }

  }

})();
