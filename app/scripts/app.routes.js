
;(function() {
    'use strict';

    angular
        .module('app.core')
        .config(configure);

    configure.$inject = ['$routeProvider'];


    function configure($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/ok', {
                templateUrl: '/views/ok.html',
                controller: 'OkCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
}.call());
