"use strict";
App.controller("LoginCtrl", [
    "$scope", "$rootScope", "$http", "$location", "$route", "$window", "notificationService",
    function ($scope, $rootScope, $http, $location, $route, $window, notification) {
        $scope.user = {};

        $scope.login = function () {
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
            }).success(function (data) {
                // authentication OK
                $rootScope.user = data;
                $rootScope.$emit('userChanged');
                $location.url('/');
                $window.sessionStorage.setItem("user", JSON.stringify(data));
                console.log(data);
            }).error(function (errors) {
                return notification.addError(errors);
            });
        };
    }
]).controller("RegisterCtrl", [
    "$scope", "$http", "notificationService",
    function ($scope, $http, notification) {
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
            }).success(function (user) {
                return console.log(user);
            }).error(function (errors) {
                return notification.addError(errors);
            });
        };
    }
]);
//# sourceMappingURL=AuthCtrl.js.map
