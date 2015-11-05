'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/login', {
      templateUrl: 'partials/login.html'
    })
    .when('/dashboard', {
    	templateUrl: 'partials/dashboard.html'
    })
    .when('/signup', {
    	templateUrl: 'partials/signup.html'
    })
    .when('/404', {
    	templateUrl: 'partials/404.html'
    })
    .otherwise({
        redirectTo: '/dashboard'
      });

    //$locationProvider.html5Mode(false);

})