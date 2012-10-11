'use strict';

todoWeather.controller('TodoCtrl', function($scope, $location, todoStorage, addTodoFromIssue){
  var todoItems = $scope.todoItems = todoStorage.get();

  $scope.newTodo = "";
  $scope.editedTodo = null;

  $scope.$watch('todoItems', function() {
    todoStorage.put(todoItems);
  }, true);

  $scope.addTodo = function() {
    if(!$scope.newTodo.length) {
      return
    }

    todoItems.push({
      title: $scope.newTodo,
      completed: false
    });

    $scope.newTodo = "";
  };

  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
  };

  $scope.doneEditing = function(todo) {
    $scope.editedTodo = null;

    if(!todo.title) {
      $scope.removeTodo(todo);
    }
  };

  $scope.removeTodo = function(todo) {
    todoItems.splice(todoItems.indexOf(todo), 1);
  };

  $scope.clearCompletedTodos = function(index) {
    $scope.todoItems = todoItems = todoItems.filter(function() {
      return !val.completed;
    });
  };


  $scope.$on('handleIssueBroadcast', function() {
    todoItems.push({
      title: addTodoFromIssue.title,
      completed: false
    });
  })
});

