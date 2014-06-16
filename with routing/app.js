(function(){
	
	var app = angular.module("GitHubViewer", ["ngRoute"]);

	app.config(function($routeProvider){ //define routes in here
		$routeProvider
			.when("/main", {
				templateUrl: "main.html",
				controller: "MainController"
			})
			.when("/user/:username", {
				templateUrl: "user.html",
				controller: "UserController"
			})
			.otherwise({redirectTo:"/main"});
	});

}());