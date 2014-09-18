﻿App.service("dataService", [
    "$http",
    function ($http) {
        var url = "http://localhost:56841";

        var dataService = {
            serverUrl: url,
            getAllCategories: function () {
                var promise = $http.get(url + "/api/Categories/All").then(function (result) {
                    return result.data;
                });

                return promise;
            },
            createCategory: function (categoryName) {
                var promise = $http.post(url + "/api/Categories/Create", { Name: categoryName }).then(function (result) {
                    return result.data;
                });

                return promise;
            },
            getTasksByCategory: function (categoryId) {
                var promise = $http.get(url + "/api/Tasks/FilterByCategory?categoryId=" + categoryId).then(function (result) {
                    return result.data;
                });

                return promise;
            },
            getAllTasks: function () {
                var promise = $http.get(url + "/api/Tasks/All").then(function (result) {
                    return result.data;
                });

                return promise;
            },
            createTask: function (taskContent, deadline, categoryId) {
                var promise = $http.post(url + "/api/Tasks/Create", {
                    Content: taskContent,
                    Deadline: deadline,
                    Status: 1,
                    CategoryId: categoryId
                }).then(function (result) {
                    return result.data;
                });

                return promise;
            }
        };

        return dataService;
    }]);
//# sourceMappingURL=DataService.js.map
