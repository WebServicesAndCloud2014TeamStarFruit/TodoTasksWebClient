"use strict";

var App = angular.module("todo", ["ui.sortable", "ui.router", "ngRoute", "LocalStorageModule"]);

//Setting up route
App.config(['$stateProvider',
    function ($stateProvider) {
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
            });
    }
])
.config(["$httpProvider",
    function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);