/// <reference path="../../scripts/typings/angularlocalstorage/angularlocalstorage.d.ts" />
"use strict";

App.controller("TodoCtrl", ["$scope", "dataService", "localStorageService", "notificationService",
    function (
        $scope: any,
        dataService: IDataService,
        localStorageService: ng.localStorage.ILocalStorageService,
        notification: INotificationService) {

        $scope.model = [];

        $scope.init = () => {
            var buildedCategories = [];

            dataService
                .getAllCategories()
                .then(function (categories) {
                    categories = categories || [];

                    for (var i = 0; i < categories.length; i += 1) {
                        buildedCategories[i] = {
                            id: categories[i].Id,
                            name: categories[i].Name,
                            list: []
                        }
                    }
                })
                .then(function () {
                    dataService.getAllTasks()
                        .then(function (tasks) {
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

        $scope.addTodo = () => {
            if ($scope.model.length === 0) {
                notification.addError("You have to add categories first");
                return;
            }

            dataService
                .createTask($scope.newTodo, $scope.newTodoDate, $scope.model[$scope.currentShow].id)
                .then(function (task) {
                    var newTask = {
                        id: task.Id,
                        taskName: task.Content,
                        isDone: task.Status === 1 ? false : true,
                        deadLine: task.Deadline
                    }

                    $scope.model[$scope.currentShow].list.unshift(newTask);

                    $scope.newTodo = "";
                    $scope.newTodoDate = "";
                });
        };

        $scope.addCategory = () => {
            dataService
                .createCategory($scope.newCategory)
                .then(function (category) {
                    var newCategory = {
                        id: category.Id,
                        name: category.Name,
                        list: []
                    }

                    $scope.model.push(newCategory);
                    $scope.newCategory = "";
                });
        };

        $scope.deleteTodo = (index) => {
            dataService
                .deleteTask($scope.model[$scope.currentShow].list[index].id)
                .then(function () {
                    $scope.model[$scope.currentShow].list.splice(index, 1);
                });
        };

        $scope.deleteCategory = (index) => {
            dataService
                .deleteCategory($scope.model[index].id)
                .then(function () {
                    $scope.model.splice(index, 1);
                });
        };

        $scope.changeStatus = (index) => {
            var taskForUpdate = {
                Id: $scope.model[$scope.currentShow].list[index].id,
                Content: $scope.model[$scope.currentShow].list[index].taskName,
                Status: $scope.model[$scope.currentShow].list[index].isDone === true ? 0 : 1,
                CategoryId: $scope.model[$scope.currentShow].id
            };

            dataService.changeTask(taskForUpdate);
        };

        $scope.todoSortable = {
            containment: "parent",//Dont let the user drag outside the parent
            cursor: "move",//Change the cursor icon on drag
            tolerance: "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
        };

        $scope.changeTodo = (i) => {
            $scope.currentShow = i;
        };

        /* Filter Function for All | Incomplete | Complete */
        $scope.showFn = todo => {
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

        $scope.$watch("model", (newVal, oldVal) => {
            if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
                localStorageService.set("todoList", angular.toJson(newVal));
            }
        }, true);
    }
]);