(function () {
'use strict';

  angular
    .module('app.sweepstake')
    .directive('sweepstakeForm', sweepstakeForm);

  sweepstakeForm.$inject = ['buttonAPIService'];

  function sweepstakeForm(buttonAPIService) {

    var directive = {
      controllerAs:'vm',
      scope: {
        form: '=data'
      },
      restrict: 'E',
      templateUrl: 'scripts/sweepstake/form.html',
      controller: 'FormController',
      link: link
    };

    return directive;
    
    function link(scope, element, attrs) {

      scope.submitForm = function(isValid) {
        
        if(isValid){
          var submittedData = {};
          angular.forEach(scope.form.fields, function(v, k) {
            submittedData[v.nameClass] = v.value;
          });

          buttonAPIService.fetch(submittedData)
            .then(function(data){
              console.log('fetched POST', data);
            }, function(reason) {
              console.log('Failed: ', reason);
          });
        }
      };
    }
  }

})();