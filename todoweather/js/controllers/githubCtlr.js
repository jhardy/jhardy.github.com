'use strict';

todoWeather.controller('GithubCtrl', function($scope, $location, $http, githubStorage, filterFilter, addTodoFromIssue){
  var repoList = $scope.repoList = githubStorage.get(),
      requestURL = 'https://api.github.com/',
      callBack = "?callback=JSON_CALLBACK",
      githubUsername = {};

  $scope.introText = "Track your github issues from your todo list!";
  $scope.githubUserName = "";
  $scope.loadStatus = "";
  $scope.editingAccount = false;

  $scope.getRepos = function() {
    $scope.loadStatus = "loading"

    $http.jsonp(requestURL +  "users/" + $scope.githubUserName + '/repos' + callBack).success(function(r){
      $scope.repoList = r.data;
      $scope.loadStatus = "loaded"
    });

    githubUsername.name = $scope.githubUserName;
    githubStorage.put(githubUsername);
  };

  $scope.getIssues = function(repo, $event) {
    if(!repo.loaded) {
      $http.jsonp(requestURL +  "repos/" + repo.full_name + '/issues' + callBack).success(function(r){
        repo.issue_list = r.data
        repo.loaded = true;

        $scope.showIssues($event);
      });
    } else {
      $scope.showIssues($event);
    }
  };

  $scope.hasIssues = function(repo) {
    return repo.open_issues > 0;
  }

  $scope.showIssues = function($event) {
    var target = $($event.target),
        el = target.hasClass('issue') ? target : target.parents('.issue'),
        targetIsLink = (target.not('a').length > 0) ? false : true;

    if(!targetIsLink) {
      $('.expanded').removeClass('expanded');
      el.toggleClass('expanded');
    }
  };

  $scope.editAccount = function() {
    $scope.introText = "Change Github Account"
     $scope.loadStatus = ""
  }

  $scope.addIssueTodo = function(repo, issue) {
    addTodoFromIssue.prepForBroadcast(repo, issue);
  };

  if(repoList.name) {
    $scope.githubUserName = repoList.name;
    $scope.getRepos();
  }
});

