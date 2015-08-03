(function () {
  'use strict';

  angular
    .module('app.sweepstake')
    .service('buttonAPIService', buttonAPIService);

  buttonAPIService.$inject = ['$http', '$q', 'CONFIG', '$httpParamSerializer', '$rootScope'];

  function buttonAPIService($http, $q, CONFIG, $httpParamSerializer, $rootScope) {
    var vm = this;

    vm.fetch = function(sweepstakeForm) {
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
