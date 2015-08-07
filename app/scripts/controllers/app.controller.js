;(function () {
    'use strict';

    angular
        .module('app.controllers')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$rootScope', 'sweepstakeAPIService', '$location', 'CONFIG'];

    function MainCtrl($scope, $rootScope, sweepstakeAPIService, $location, CONFIG) {

        var currDate = new Date().toISOString().slice(0, 10).replace('T', ' ');

        $scope.submitText = CONFIG.submitText;
        $scope.legalOpenText = CONFIG.legalOpenText;
        $scope.legalTitle = CONFIG.legalTitle;
        $scope.legalCloseText = CONFIG.legalCloseText;
        $scope.privacyText = CONFIG.privacyText;
        $scope.termsText = CONFIG.termsText;

        $rootScope.formIsValid = false;
        $rootScope.available = true;

        $scope.form = {};
        $scope.ready = false;

        $rootScope.$on('si.click', function (event, data) {
            trackEvents.record('[Click]', data);
        });

        $scope.submitForm = function (isValid) {

            if (isValid) {
                var submittedData = {};
                angular.forEach($scope.form.fields, function (v, k) {
                    submittedData[v.nameClass] = v.value;
                });

                sweepstakeAPIService.store(submittedData)
                    .then(function (data) {
                        console.log('fetched POST', data);
                        $location.path('/ok');

                    }, function (reason) {
                        console.log('Failed: ', reason);
                    });
            }
        };

        $scope.$on('onFinish', function(e) {
            $scope.ready = true;
        });


        sweepstakeAPIService.fetch().then(function (data) {
            if (!data.data.POST.parameters) {
                return;
            }
            var params = data.data.POST.parameters;
            if (params.title) {
                $scope.form.title = params.title;
            }
            if (params.start_date) {
                $scope.form.start_date = params.start_date;
            }
            if (params.end_date) {
                $scope.form.end_date = params.end_date.slice(0, 10);
                if (currDate > params.end_date.slice(0, 10)) {
                    $rootScope.available = false;
                    $location.path('/ok');
                }
            }
            if (params.duplicate_entrants) {
                $scope.form.duplicate_entrants = params.duplicate_entrants;
            }
            if (params.minimum_age) {
                $scope.form.minimum_age = params.minimum_age;
            }
            if (params.privacy_policy) {
                $scope.form.privacy_policy = params.privacy_policy;
            }
            if (params.terms_and_conditions) {
                $scope.form.terms_and_conditions = params.terms_and_conditions;
            }
            if (params.legal) {
                $scope.form.legal = params.legal;
            }
            if (params.legal_link) {
                $scope.form.legal_link = params.legal_link;
            }
            if (params.fields) {
                var fields = [];
                var fieldsRaw = params.fields;
                for (var i = 0; i < fieldsRaw.length; i++) {
                    fields[i] = {};
                    fields[i].placeholder = fieldsRaw[i].label;
                    fields[i].type = fieldsRaw[i].type;
                    fields[i].isRequired = fieldsRaw[i].required;
                    fields[i].nameClass = fieldsRaw[i].name;
                    fields[i].isValid = false;
                }
                $scope.form.fields = fields;
            }
        });
    }
})();
