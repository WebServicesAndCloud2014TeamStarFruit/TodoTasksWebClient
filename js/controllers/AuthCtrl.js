"use strict";

App.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$route",
        function ($scope, $rootScope, $http, $location, $route) {
            
            $scope.user = {};

            $scope.login = function () {
                $http.post('/api/users/login', {
                    login: $scope.user.login,
                    password: $scope.user.password
                })
                    .success(function (user) {
                        // authentication OK
                        $rootScope.user = user;
                        //$rootScope.$emit('userChanged');
                        $location.url('/');

                    })
                    .error(function () {
                        Notification.showErrors(StringTable.authErr);
                    });
            };
        }
    ])
    .controller("RegisterCtrl", ["$scope", "$http", "$location", "$route",
        function ($scope, $http, $location, $route) {

            $scope.user = {};

            $scope.checkUsernameAvailability = function () {

            };

            $scope.register = function () {
                console.log("test register");
            };
        }
    ]);