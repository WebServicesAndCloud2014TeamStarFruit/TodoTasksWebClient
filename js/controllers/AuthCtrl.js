"use strict";

App.controller("LoginCtrl", ["$scope", "$http", "$location", "$route",
        function ($scope, $http, $location, $route) {
            
            $scope.user = {};

            $scope.login = function () {
                
            };
        }
    ])
    .controller("RegisterCtrl", ["$scope", "$http", "$location", "$route",
        function ($scope, $http, $location, $route) {

            $scope.user = {};

            $scope.checkUsernameAvailability = function () {

            };

            $scope.register = function () {

            };
        }
    ]);