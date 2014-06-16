(function() {

var app = angular.module("GitHubViewer", []);

var UserController = function($scope, github) {

	var onUserComplete = function(data) {
		$scope.user = data;
		github.getRepos($scope.user).then(onRepos, onError);
	};

	var onError = function(reason) {
		$scope.error = "Could not fetch the data";
	};

	var onRepos = function(data) {
		$scope.repos = data;
	}

	$scope.username = $routeParams.username;
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	github.getUser($scope.username).then(onUserComplete, onError);

};

app.controller("UserController", UserController);

}());