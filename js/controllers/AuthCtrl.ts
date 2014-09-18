"use strict";

App.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$route", "$window", "notificationService", "dataService",
	(
		$scope: any,
		$rootScope: any,
		$http: ng.IHttpService,
		$location: ng.ILocationService,
		$route: ng.route.IRouteService,
		$window: ng.IWindowService,
        notification: INotificationService,
        dataService: IDataService) => {

		$scope.user = {};

		$scope.login = () => {
			$http.post(dataService.serverUrl + '/Token', {
				username: $scope.user.email,
				password: $scope.user.password,
				grant_type: "password"
			}, {
					transformRequest: obj => {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
				.success(data => {
					// authentication OK
					$rootScope.user = data;
					$rootScope.$emit('userChanged');
					$location.url('/home');
                    $window.sessionStorage.setItem("todoAppAuthUserData", JSON.stringify(data));
					console.log(data);
				})
				.error(errors => notification.addError(errors.error_description));
		};
	}
])
    .controller("RegisterCtrl", ["$scope", "$http", "notificationService", "dataService",
		(
			$scope: any,
			$http: ng.IHttpService,
            notification: INotificationService,
            dataService: IDataService) => {
			$scope.user = {};

			$scope.register = () => {
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
				})
					.success(user => console.log(user))
					.error(errors => {
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
	]);