(function() {

var app = angular.module("GitHubViewer", []);

var MainController = function($scope, $http, $interval, $log) {

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

	var decrementCountdown = function(){
		$scope.countdown -= 1;
		if($scope.countdown < 1){
			$scope.search($scope.username);
		}
	};

	var countdownInterval = null;

	var startCountdown = function() {
		countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
	};

	$scope.search = function(username) {
		$log.info("Searching for " + username);
		$http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
		$scope.countdown = 0;
	};

//	$http.get("https://api.github.com/users/angular").then(onUserComplete, onError);

	$scope.username = "angular";
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.countdown = 5;
	startCountdown();

};

app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

}());