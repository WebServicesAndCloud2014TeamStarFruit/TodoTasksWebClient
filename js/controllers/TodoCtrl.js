/// <reference path="../../scripts/typings/angularlocalstorage/angularlocalstorage.d.ts" />
"use strict";
App.controller("TodoCtrl", [
    "$scope", "dataService", "localStorageService",
    function ($scope, dataService, localStorageService) {
        $scope.model = [];

        $scope.init = function () {
            var buildedCategories = [];

            dataService.getAllCategories().then(function (categories) {
                categories = categories || [];

                for (var i = 0; i < categories.length; i += 1) {
                    buildedCategories[i] = {
                        id: categories[i].Id,
                        name: categories[i].Name,
                        list: []
                    };
                }
            }).then(function () {
                dataService.getAllTasks().then(function (tasks) {
                    tasks = tasks || [];

                    for (var i = 0; i < tasks.length; i += 1) {
                        for (var j = 0; j < buildedCategories.length; j += 1) {
                            if (tasks[i].CategoryId === buildedCategories[j].id) {
                                var newTask = {
                                    taskName: tasks[i].Content,
                                    isDone: tasks[i].Status === 1 ? false : true,
                                    deadLine: tasks[i].Deadline
                                };

                                buildedCategories[j].list.push(newTask);
                            }
                        }
                    }
                    $scope.model = buildedCategories;
                });
            });

            $scope.show = "All";
            $scope.currentShow = 0;
        };

        $scope.addTodo = function () {
            /*Should prepend to array*/
            $scope.model[$scope.currentShow].list.splice(0, 0, { taskName: $scope.newTodo, isDone: false });

            /*Reset the Field*/
            $scope.newTodo = "";
        };

        $scope.deleteTodo = function (index) {
            $scope.model[$scope.currentShow].list.splice(index, 1);
        };

        $scope.todoSortable = {
            containment: "parent",
            cursor: "move",
            tolerance: "pointer"
        };

        $scope.changeTodo = function (i) {
            $scope.currentShow = i;
        };

        /* Filter Function for All | Incomplete | Complete */
        $scope.showFn = function (todo) {
            if ($scope.show === "All") {
                return true;
            } else if (todo.isDone && $scope.show === "Complete") {
                return true;
            } else if (!todo.isDone && $scope.show === "Incomplete") {
                return true;
            } else {
                return false;
            }
        };

        $scope.$watch("model", function (newVal, oldVal) {
            if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
                localStorageService.set("todoList", angular.toJson(newVal));
            }
        }, true);
    }
]);
//# sourceMappingURL=TodoCtrl.js.map
