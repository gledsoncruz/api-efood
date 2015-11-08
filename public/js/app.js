'use strict';
angular.module('efood', ['appRoutes', 'mainCtrl', 'authService', 'angular-loading-bar', 'ngCpfCnpj', 'ui.mask', 'userService', 'userCtrl', 'menuCtrl'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');

})