;(function () {
    'use strict';

    angular.module('app.directives')
        .directive('onFinishRepeat', onFinishRepeat);

    onFinishRepeat.$inject = ['$timeout'];

    function onFinishRepeat($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRepeat);
                    });
                }
            }
        }
    }
})();