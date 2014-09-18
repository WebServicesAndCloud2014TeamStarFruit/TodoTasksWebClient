"use strict";
App.controller("LoginCtrl", [
    "$scope", "$rootScope", "$http", "$location", "$route", "$window", "notificationService", "dataService",
    function ($scope, $rootScope, $http, $location, $route, $window, notification, dataService) {
        $scope.user = {};

        $scope.login = function () {
            $http.post(dataService.serverUrl + '/Token', {
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
                $rootScope.authentication = {
                    IsAuth: true,
                    userName: $scope.user.userName
                };
                $location.url('/home');
                $window.sessionStorage.setItem("todoAppAuthUserData", JSON.stringify(data));
            }).error(function (errors) {
                return notification.addError(errors.error_description);
            });
        };
    }
]).controller("RegisterCtrl", [
    "$scope", "$http", "notificationService", "dataService",
    function ($scope, $http, notification, dataService) {
        $scope.user = {};

        $scope.register = function () {
            $http({
                url: dataService.serverUrl + '/api/Account/register',
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
                var errorKeys = Object.keys(errors.ModelState);
                var messages = "";

                for (var key in errorKeys) {
                    if (errorKeys.hasOwnProperty(key)) {
                        messages += errors.ModelState[errorKeys[key]] + "\n";
                    }
                }

                notification.addError(messages);
            });
        };
    }
]).controller("LogoutCtrl", [
    "$scope", "$rootScope", "$window",
    function ($scope, $rootScope, $window) {
        $scope.logout = function () {
            $window.sessionStorage.removeItem('todoAppAuthUserData');
            $rootScope.authentication = {
                IsAuth: false,
                userName: ""
            };
        };
    }
]);
//# sourceMappingURL=AuthCtrl.js.map
