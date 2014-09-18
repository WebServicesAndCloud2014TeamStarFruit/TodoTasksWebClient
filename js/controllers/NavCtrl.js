App.controller("NavCtrl", [
    '$scope', '$location', 'authService',
    function ($scope, $location, authService) {
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/login');
        };

        $scope.authentication = authService.authentication;
    }]);
//# sourceMappingURL=NavCtrl.js.map
