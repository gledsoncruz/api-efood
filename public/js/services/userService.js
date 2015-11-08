'use strict';

angular.module('userService', [])

.factory('UserFactory', function($http){
	var userFactory = {};

	userFactory.createUser = function(userData){
		return $http.post('/efood/api/signup', userData);
	}

	userFactory.getAllUsers = function(){
		return $http.get('/efood/api/users');
	}

	return userFactory;
})