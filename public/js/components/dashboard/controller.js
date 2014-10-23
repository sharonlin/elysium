/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('DashboardController', ['$rootScope','$scope','$timeout','MessageBus', 'TabsService','cfpLoadingBar',function($rootScope, $scope, $timeout, MessageBus, TabsService, cfpLoadingBar) {
	$scope.init = function() {
		$scope.projects =
			[
		 {name:'p1', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p2', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		    ];


		MessageBus.onMsg('project.create', $scope, function(event, data) {
			console.dir('DashboardController:'+data);
			$scope.$apply(function(){$scope.projects.unshift(data);});

		});
	}

	$scope.openReport = function(project) {
		TabsService.switchToReport(project);
	}
	$scope.runPredict= function(project) {
		cfpLoadingBar.start();
		$timeout(function(){
			TabsService.switchToReport(project);
			cfpLoadingBar.complete();
		}, 5000);
	}
	$scope.runTrain= function(project) {
		cfpLoadingBar.start();
		$timeout(function(){
			TabsService.switchToReport(project);
			cfpLoadingBar.complete();
		}, 10000);
	}
	$scope.init();
}]);