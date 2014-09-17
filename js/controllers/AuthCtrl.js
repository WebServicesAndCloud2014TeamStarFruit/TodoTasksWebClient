"use strict";

App.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$route", "$window",
        function ($scope, $rootScope, $http, $location, $route, $window) {
        	$scope.user = {};

        	$scope.login = function () {
        		debugger;
        		$http.post('http://localhost:56841/Token', {
        			username: $scope.user.email,
        			password: $scope.user.password,
        			grant_type: "password"
        		}, {
        			transformRequest: function (obj) {
        				var str = [];
        				for (var p in obj)
        					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        				return str.join("&");
        			},
        			headers: {
        				'Content-Type': 'application/x-www-form-urlencoded'
        			}
        		})
                .success(function (data) {
                	// authentication OK
                	//$rootScope.user = user;
                	//$rootScope.$emit('userChanged');
                	//$location.url('/');
                	console.log(data);
                })
                .error(function (errors) {
                	console.log(errors)
                });
        	};
        }
])
    .controller("RegisterCtrl", ["$scope", "$http", "$location", "$route",
        function ($scope, $http, $location, $route) {
        	$scope.user = {};

        	$scope.register = function () {
        		$http({
        			url: 'http://localhost:56841/api/Account/register',
        			method: "POST",
        			data: {
        				UserName: $scope.user.username,
        				Password: $scope.user.password,
        				ConfirmPassword: $scope.user.confirmPassword,
        				Email: $scope.user.email
        			},
        			withCredentials: false
        		})
                .success(function (user) {
                	console.log(user);
                })
                .error(function (errors) {
                	console.log(errors);
                });
        	};
        }
    ]);