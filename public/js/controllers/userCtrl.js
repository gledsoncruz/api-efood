'use strict';

angular.module('userCtrl', ['userService', 'toaster', 'ngPassword', 'ngMessages'])

.controller('UserCtrl', function (User, $location, toaster, $scope) {

	var vm = this;

	vm.createUser = function(){


		if ($scope.formSignup.$valid){

			vm.userData.role = "gerente";

			User.createUser(vm.userData)
				.success(function(data){
					var errorCount = Object.keys(data.errors).length;

					if(!errorCount){
						console.log(Object.keys(data.errors).length);
						console.log('success');

					} else {
						console.log(Object.keys(data.errors).length);
						console.log('erro');
						toaster.pop({
			                type: 'error',
			                title: 'Error',
			                body: data.message,
			                showCloseButton: true
			            });
					}
				});
		} else {
			$scope.formSignup.submitted = true;
			console.log('form invalid');
		}

	}

})