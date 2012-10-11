'use strict';

todoWeather.factory( 'addTodoFromIssue', function($rootScope) {

  var  newIssueTodo = {};

  newIssueTodo.prepForBroadcast = function(repo, issue) {
    this.title = "<strong>" + repo.name + " issue: </strong> " + issue.title;
    this.completed = false;
    this.broadcastTodo();
  };

  newIssueTodo.broadcastTodo = function() {
    $rootScope.$broadcast('handleIssueBroadcast');
  };

  return newIssueTodo;

});

