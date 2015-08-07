;(function () {
    'use strict';

    angular
        .module('app.controllers')
        .controller('OkCtrl', OkCtrl);

    OkCtrl.$inject = ['$scope', 'CONFIG'];

    function OkCtrl($scope, CONFIG) {
        $scope.acknowledgementText = CONFIG.acknowledgementText;
        $scope.expiredText = CONFIG.expiredText;
        $scope.social = CONFIG.social;
        $scope.showSocialNav = CONFIG.showSocialNav;
    }
})();
