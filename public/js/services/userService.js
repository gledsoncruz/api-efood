'use strict';

angular.module('userService', [])

.factory('User', function($http){
	var userFactory = {};

	userFactory.createUser = function(userData){
		return $http.post('/efood/api/signup', userData);
	}

	return userFactory;
})