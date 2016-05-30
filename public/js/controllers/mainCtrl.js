'use strict';

angular.module('mainCtrl', ['toaster', 'ngAnimate'])

.controller('MainController', function($window, toaster, $scope, $route, $rootScope, $location, Auth){

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(event, next, current){

		vm.loggedIn = Auth.isLoggedIn();

		if (vm.loggedIn){

			Auth.getUser()
				.then(function(data){

				vm.user = data.data;
			},
			function(error){
				Auth.logout();
				vm.user = '';
				$location.path('/login');
				$window.location.reload();
				console.log('ERROR');
			});

		} else {
			if (next.templateUrl === "partials/signup.html"){
				$location.path('/signup');
			} else {
				$location.path('/login');
			}
		}
	});

	vm.doLogin = function(){
		vm.processing = true;

		if ($scope.loginForm.$valid){
			vm.error = '';
		Auth.login(vm.loginData.email, vm.loginData.password)
			.success(function(data){
				vm.processing = false;

				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
						//console.log(vm.user.role);
					});
				if (data.success){
					$location.path('/dashboard');
				} else {
					vm.error = data.message;
					console.log(vm.error);
			        toaster.pop({
		                type: 'error',
		                title: 'Error',
		                body: vm.error,
		                showCloseButton: true
		            });
				}
			});

		} else {
			$scope.loginForm.submitted = true;
		}


	}

	vm.doLogout = function(){
		Auth.logout();
		$window.location.reload();
	}

});