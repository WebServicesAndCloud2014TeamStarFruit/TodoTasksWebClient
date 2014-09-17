"use strict";

App.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$route",
        function ($scope, $rootScope, $http, $location, $route) {
            
            $scope.user = {};

            $scope.login = function () {
                $http.post('http://todotasks.apphb.com/Token', {
                    username: $scope.user.username,
                    password: $scope.user.password
                })
                    .success(function(user){
                        // authentication OK
                        $rootScope.user = user;
                        //$rootScope.$emit('userChanged');
                        //$location.url('/');
                        console.log(user);
                    })
                    .error(function (errors) {
                        console.log(errors)
                    });
            };
        }
    ])
    .controller("RegisterCtrl", ["$scope", "$http", "$location", "$route",
        function ($scope, $http, $location, $route) {
            //delete $http.defaults.headers.common['X-Requested-With'];

            $scope.user = {};

            $scope.register = function () {
                $http.post('http://todotasks.apphb.com/api/Account/register',
                {
                    UserName: $scope.user.username,
                    Password: $scope.user.password,
                    ConfirmPassword: $scope.user.confirmPassword,
                    Email: $scope.user.email
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