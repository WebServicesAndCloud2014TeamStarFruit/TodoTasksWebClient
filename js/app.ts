/// <reference path="../scripts/typings/angular-ui/angular-ui-router.d.ts" />
"use strict";

var App = angular.module("todo", ["ui.sortable", "ui.router", "ngRoute", "LocalStorageModule", "angular-loading-bar"]);

//Setting up route
App.config(['$stateProvider', '$urlRouterProvider',
	(
		$stateProvider: ng.ui.IStateProvider,
		$urlRouterProvider: ng.ui.IUrlRouterProvider) => {
		// states for my app
		$stateProvider
			.state('auth', {
				templateUrl: 'index.html'
			})
			.state('auth.login', {
				url: '/login',
				templateUrl: 'login.html'
			})
			.state('auth.register', {
				url: '/register',
				templateUrl: 'register.html'
			})
			.state('auth.home', {
				url: '/home',
				templateUrl: 'home.html'
			})

		$urlRouterProvider.otherwise("/home");
	}
])
	.config(["$httpProvider",
		($httpProvider: ng.IHttpProvider) => {
			$httpProvider.defaults.withCredentials = true;
			$httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
			$httpProvider.interceptors.push('authInterceptorService');
		}
	]);

App.run(['authService', function (authService) {
	authService.fillAuthData();
}]);