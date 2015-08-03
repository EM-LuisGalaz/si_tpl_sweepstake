(function () {
'use strict';

  angular
    .module('app.sweepstake')
    .controller('FormController', FormController);

  FormController.$inject = ['$scope', '$rootScope'];

  function FormController($scope, $rootScope) {
    var vm = this;
    vm.message = {
    	show: false,
    	msg: '',
    	type: 'danger'
    };

    $rootScope.$on('si.sweepstake.success', function (event, data) {
      	vm.message = {
    		show: true,
    		msg: 'All good!',
    		type: 'success'
    	};
    });

    $rootScope.$on('si.sweepstake.error', function (event, data) {
      	vm.message = {
    		show: true,
    		msg: data.error.message,
    		type: 'danger'
    	};
    });
  }

})();