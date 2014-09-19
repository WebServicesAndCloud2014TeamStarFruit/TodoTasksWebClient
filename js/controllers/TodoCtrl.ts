/// <reference path="../../scripts/typings/angularlocalstorage/angularlocalstorage.d.ts" />
"use strict";

App.controller("TodoCtrl", ["$scope", "dataService", "localStorageService",
	function (
        $scope: any,
        dataService: IDataService,
        localStorageService: ng.localStorage.ILocalStorageService) {

        $scope.categories = [];
        $scope.tasks = [];

        dataService.getAllCategories().then(function (data) {
            $scope.categories = data;
            console.log($scope.categories);
        });

        //test getting tasks form category 1
        dataService.getTasksByCategory(1).then(function (data) {
            $scope.tasks = data;
            console.log($scope.tasks);
        });

		$scope.init = () => {
			if (localStorageService.get("todoList") === null) {
				$scope.model = [
					{
						name: "Primary", list: [
							{ taskName: "Create an Angular-js TodoList", isDone: false },
							{ taskName: "Understanding Angular-js Directives", isDone: true }
						]
					},
					{
						name: "Secondary", list: [
							{ taskName: "Build an open-source website builder", isDone: false },
							{ taskName: "BUild an Email Builder", isDone: false }
						]
					}
				];
			} else {
				$scope.model = localStorageService.get("todoList");
			}
			$scope.show = "All";
			$scope.currentShow = 0;
		};

		$scope.addTodo = () => {
			/*Should prepend to array*/
			$scope.model[$scope.currentShow].list.splice(0, 0, { taskName: $scope.newTodo, isDone: false });
			/*Reset the Field*/
			$scope.newTodo = "";
		};

		$scope.deleteTodo = (index) => {
			$scope.model[$scope.currentShow].list.splice(index, 1);
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