"use strict";

App.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$route", "$window", "notificationService",
	(
		$scope: any,
		$rootScope: any,
		$http: ng.IHttpService,
		$location: ng.ILocationService,
		$route: ng.route.IRouteService,
		$window: ng.IWindowService,
		notification: INotificationService) => {
		$scope.user = {};

		$scope.login = () => {
			$http.post('http://localhost:56841/Token', {
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
					$location.url('/');
					$window.sessionStorage.setItem("user", JSON.stringify(data));
					console.log(data);
				})
				.error(errors => notification.addError(errors));
		};
	}
])
	.controller("RegisterCtrl", ["$scope", "$http", "notificationService",
		(
			$scope: any,
			$http: ng.IHttpService,
			notification: INotificationService) => {
			$scope.user = {};

			$scope.register = () => {
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
					.success(user => console.log(user))
					.error(errors => notification.addError(errors));
			};
		}
	]);