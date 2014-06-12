(function() {

var app = angular.module("GitHubViewer", []);

var MainController = function($scope, $http) {

	var onUserComplete = function(response) {
		$scope.user = response.data;
		$http.get($scope.user.repos_url).then(onRepos, onError);
	};

	var onError = function(reason) {
		$scope.error = "Could not fetch the data";
	};

	var onRepos = function(response) {
		$scope.repos = response.data;
	}

	$scope.search = function(username) {
		$http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
	};

//	$http.get("https://api.github.com/users/angular").then(onUserComplete, onError);

	$scope.username = "angular";
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";

};

app.controller("MainController", ["$scope", "$http", MainController]);

}());