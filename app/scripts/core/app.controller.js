(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'sweepstakeAPIService'];

  function MainCtrl($scope, sweepstakeAPIService) {
    var vm = this;
    var currDate = new Date().toISOString().slice(0, 10).replace('T', ' ');

    $scope.form = {};
    $scope.available = true;

    sweepstakeAPIService.fetch().then( function(data){
      if(!data.data.POST.parameters){
        return;
      } 
      var params = data.data.POST.parameters;
      if(params.title) {
        $scope.form.title = params.title;
      }
      if(params.start_date) {
        $scope.form.start_date = params.start_date;
      }
      if(params.end_date) {
        $scope.form.end_date = params.end_date.slice(0, 10);
        if(currDate > params.end_date.slice(0, 10)){
          $scope.available = false;
        }
      }
      if(params.duplicate_entrants) {
        $scope.form.duplicate_entrants = params.duplicate_entrants;
      }
      if(params.minimum_age) {
        $scope.form.minimum_age = params.minimum_age;
      }
      if(params.privacy_policy) {
        var privacy_policy = params.privacy_policy;
        $scope.form.privacy_policy = privacy_policy;
      }
      if(params.terms_and_conditions) {
        var terms_and_conditions = params.terms_and_conditions;
        $scope.form.terms_and_conditions = terms_and_conditions;
      }
      if(params.legal) {
        var legal = params.legal;
        $scope.form.legal = legal;
      }
      if(params.legal_link) {
        var legal_link = params.legal_link;
        $scope.form.legal_link = legal_link;
      }
      if(params.fields) {
        var fields = [];
        var fieldsRaw = params.fields;
        for(var i = 0; i < fieldsRaw.length; i++) {
          fields[i] = {};
          fields[i].placeholder = fieldsRaw[i].label;
          fields[i].type = fieldsRaw[i].type;
          fields[i].isRequired = fieldsRaw[i].required;
          fields[i].nameClass = fieldsRaw[i].name;
        }
        $scope.form.fields = fields;
      }
    });

  }
})();
