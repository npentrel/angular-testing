(function() {

var app = angular.module("GitHubViewer", []);

var MainController = function($scope, github, $interval, $log) {

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
		github.getUser(username).then(onUserComplete, onError);
		$scope.countdown = 0;
	};

	$scope.username = "angular";
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.countdown = 5;
	startCountdown();

};

app.controller("MainController", MainController);

}());