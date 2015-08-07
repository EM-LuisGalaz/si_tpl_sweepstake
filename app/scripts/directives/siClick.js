(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('siClick', clickTracker);

    clickTracker.$inject = ['$rootScope'];

    function clickTracker($rootScope) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            element.on('click', function(){
                $rootScope.$broadcast('si.click', attrs.title);
            });
        }
    }

})();
