"use strict";

App.factory('authInterceptorService', ['$q', '$location', 'localStorageService',
	($q, $location, localStorageService) => {
		return {
			request: (config) => {
				config.headers = config.headers || {};

				var authData: IAuthData = localStorageService.get('authorizationData');
				if (authData) {
					config.headers.Authorization = 'Bearer ' + authData.token;
				}

				return config;
			},
			responseError: (rejection) => {
				if (rejection.status === 401) {
					$location.path('/login');
				}

				return $q.reject(rejection);
			}
		};
	}]);