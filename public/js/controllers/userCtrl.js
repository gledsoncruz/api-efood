'use strict';

angular.module('userCtrl', ['userService', 'toaster', 'ngPassword', 'ngMessages'])
.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
})

.controller('UserCtrl', function (UserFactory, $location, toaster, $scope) {

	var vm = this;

	vm.getUsers = function(){
		UserFactory.getAllUsers()
			.then(function(data){
				vm.users = data;
				$scope.currentPage = 1;
			    $scope.itemsPerPage = 10;
			    $scope.maxSize = 10;
			    $scope.totalItems = vm.users.length;
			    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

			}, function(error){
				
				console.log('Acesso não permitido.');
				$location.path('/dashboard');
			});
	}


	vm.create = function(){

		if ($scope.formSignup.$valid){

			vm.userData.role = "gerente";

			UserFactory.createUser(vm.userData)
				.success(function(data){
					if (data.success){

						toaster.pop({
			                type: 'success',
			                title: 'Sucesso',
			                body: data.message,
			                showCloseButton: true
		            	});
					} else {
						toaster.pop({
			                type: 'error',
			                title: 'Erro',
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