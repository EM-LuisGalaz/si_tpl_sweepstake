;(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('sweepstakeInput', sweepstakeInput);

    sweepstakeInput.$inject = ['$rootScope', "$compile", '$http', "$templateCache"];

    function sweepstakeInput($rootScope, $compile, $http, $templateCache) {

        var getTemplate = function(type) {
            var templateLoader,
                baseUrl = '/views/input/',
                templateMap = {
                    birthdate: 'birthdate.html',
                    checkbox: 'checkbox.html',
                    date: 'date.html',
                    email: 'email.html',
                    number: 'number.html',
                    tel: 'tel.html',
                    textarea: 'textarea.html',
                    text: 'text.html',
                    url: 'url.html'
                };

            var templateUrl = baseUrl + templateMap[type];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;
        };

        var linker = function(scope, element, attrs) {
            var loader = getTemplate(scope.field.type);

            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });

            scope.onChange = function () {
                scope.field.isValid = !scope.sfIn.$invalid;
                var hasInValidElement = false;

                angular.forEach(scope.fields, function (v, k) {

                    if(v.isValid == false) {
                        hasInValidElement = true;
                        return;
                    }
                });

                $rootScope.formIsValid = !hasInValidElement;
            };


        };

        return {
            scope: {
                fields: '=',
                field: '=',
                index: '='
            },
            restrict: 'E',
            link: linker
        };
    }
})();