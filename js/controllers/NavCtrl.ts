App.controller("NavCtrl", ['$scope', '$location', 'authService',
	($scope: any, $location: ng.ILocationService, authService) => {
		$scope.logOut = () => {
			authService.logOut();
			$location.path('/login');
		};

		$scope.authentication = authService.authentication;
	}]);