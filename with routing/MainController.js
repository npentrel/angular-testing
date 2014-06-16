(function() {

var app = angular.module("GitHubViewer");

var MainController = function($scope, $interval, $location) {

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
		$scope.countdown = 0;
		$location.path("/user/" + username);
	};

	$scope.username = "angular";
	$scope.countdown = 5;
	startCountdown();

};

app.controller("MainController", MainController);

}());