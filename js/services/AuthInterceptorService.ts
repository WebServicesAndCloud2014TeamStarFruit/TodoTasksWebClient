interface IAuthInterceptorService {
    request: any;
    responseError: any;
};

App.service('authInterceptorService', ['$q', '$location', '$window',
    function (
        $q: any,
        $location: ng.ILocationService,
        $window: ng.IWindowService) {

    var authInterceptorServiceFactory : IAuthInterceptorService;

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = $window.sessionStorage.getItem('todoAppAuthUserData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;

}]); 