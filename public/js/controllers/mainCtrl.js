'use strict';

angular.module('mainCtrl', ['toaster', 'ngAnimate'])

.controller('MainController', function(toaster, $scope, $route, $rootScope, $location, Auth){

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(event, next, current){

		vm.loggedIn = Auth.isLoggedIn();

		if (vm.loggedIn){
			if (next.templateUrl === "partials/login.html" || next.templateUrl === "partials/signup.html"){
				Auth.getUser()
				.then(function(data){
					vm.user = data.data;
				});
				$location.path('/dashboard');

			} else {
				Auth.getUser()
				.then(function(data){
					vm.user = data.data;
				});
			}

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
	}


})