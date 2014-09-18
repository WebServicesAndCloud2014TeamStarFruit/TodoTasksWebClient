"use strict";

App.controller("LoginCtrl", ["$scope", "$location", "notificationService", "authService",
	(
		$scope: any,
		$location: ng.ILocationService,
		notification: INotificationService,
		authService) => {
		$scope.user = {};

		$scope.login = function () {
			var credentials: ICredentials = {
				userName: $scope.user.email,
				password: $scope.user.password
			};

			authService.login(credentials).then(
				response => $location.url('/home'),
				error => notification.addError(error.error_description));
		};
	}
]).controller("RegisterCtrl", ["$scope", "$location", "notificationService", "authService", "$timeout",
		(
			$scope: any,
			$location: ng.ILocationService,
			notification: INotificationService,
			authService,
			$timeout: ng.ITimeoutService) => {
			$scope.user = {};

			$scope.register = () => {
				authService.saveRegistration({
					Email: $scope.user.email,
					Password: $scope.user.password,
					ConfirmPassword: $scope.user.confirmPassword,
				}).then(
					(response) => {
						notification.addInfo("User has been registered successfully, you will be redicted to login page in 2 seconds.");
						startTimer();
					},
					(response) => {
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
			}
	}
	]);