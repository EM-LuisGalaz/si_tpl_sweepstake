(function () {
  'use strict';

  angular
    .module('app.core')
    .config(configure);

  configure.$inject = ['$routeProvider', '$provide', 'urlParametersProvider', '$httpProvider'];

  function configure($routeProvider, $provide, urlParametersProvider, $httpProvider) {
    var parameters = urlParametersProvider.getParameters();

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
      templateUrl: 'scripts/core/main.html',
      controller: 'MainCtrl'
    })
      .otherwise({
      redirectTo: '/'
    });

    $provide.constant('CONFIG', {
      'flow': {
        'endpoint' : 'http://flow.evolvemediallc.dev/api/v1/sweepstakes/-b/entries',
        'bearer' : 'mXoROwBDoRyLHeqGbvKHw6sBGhjYcPA2Kk7vwn0Y'
      }
    });
  }

  // use this as an alternative aproach to bootstraping the app withing the
  // html element, <body ng-app="app" ng-strict-di>
  // angular.element(document).ready(function () {
  //   angular.bootstrap(document.getElementsByTagName('body')[0], ['app'], {
  //     'strictDi': true 
  //   });
  // });

})();
