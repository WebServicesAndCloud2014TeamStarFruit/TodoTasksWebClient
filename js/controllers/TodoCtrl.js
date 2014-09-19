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
                                    id: tasks[i].Id,
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
            dataService.createTask($scope.newTodo, $scope.newTodoDate, $scope.model[$scope.currentShow].id).then(function (task) {
                var newTask = {
                    id: task.Id,
                    taskName: task.Content,
                    isDone: task.Status === 1 ? false : true,
                    deadLine: task.Deadline
                };

                $scope.model[$scope.currentShow].list.push(newTask);

                $scope.newTodo = "";
            });
        };

        $scope.addCategory = function () {
            dataService.createCategory($scope.newCategory).then(function (category) {
                var newCategory = {
                    id: category.Id,
                    name: category.Name,
                    list: []
                };

                $scope.model.push(newCategory);
                $scope.newCategory = "";
            });
        };

        $scope.deleteTodo = function (index) {
            dataService.deleteTask($scope.model[$scope.currentShow].list[index].id).then(function () {
                $scope.model[$scope.currentShow].list.splice(index, 1);
            });
        };

        $scope.deleteCategory = function (index) {
            dataService.deleteCategory($scope.model[index].id).then(function () {
                $scope.model.splice(index, 1);
            });
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
