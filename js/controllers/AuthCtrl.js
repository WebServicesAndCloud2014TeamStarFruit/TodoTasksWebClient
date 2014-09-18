"use strict";
App.controller("LoginCtrl", [
    "$scope", "$location", "notificationService", "authService",
    function ($scope, $location, notification, authService) {
        $scope.user = {};

        $scope.login = function () {
            var credentials = {
                userName: $scope.user.email,
                password: $scope.user.password
            };

            authService.login(credentials).then(function (response) {
                return $location.url('/home');
            }, function (error) {
                return notification.addError(error.error_description);
            });
        };
    }
]).controller("RegisterCtrl", [
    "$scope", "$location", "notificationService", "authService", "$timeout",
    function ($scope, $location, notification, authService, $timeout) {
        $scope.user = {};

        $scope.register = function () {
            authService.saveRegistration({
                Email: $scope.user.email,
                Password: $scope.user.password,
                ConfirmPassword: $scope.user.confirmPassword
            }).then(function (response) {
                notification.addInfo("User has been registered successfully, you will be redicted to login page in 2 seconds.");
                startTimer();
            }, function (response) {
                var errorKeys = Object.keys(response.data.ModelState);
                var messages = "";

                for (var key in errorKeys) {
                    if (errorKeys.hasOwnProperty(key)) {
                        messages += response.data.ModelState[errorKeys[key]] + "\n";
                    }
                }

                notification.addError(messages);
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        };
    }
]);
//# sourceMappingURL=AuthCtrl.js.map
