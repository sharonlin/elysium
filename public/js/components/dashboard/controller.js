/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('DashboardController', ['$rootScope', '$scope', '$interval', '$timeout', 'MessageBus', 'TabsService', 'cfpLoadingBar', 'ElysiumService', function ($rootScope, $scope, $interval, $timeout, MessageBus, TabsService, cfpLoadingBar, ElysiumService) {
	$scope.init = function () {
		$scope.projects =
			[
//		 {name:'p1', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
//		,{name:'p2', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		];


		MessageBus.onMsg('project.create', $scope, function (event, project) {
			$timeout(function () {
				ElysiumService.configure(project, function (error, modelId) {
					if (!error) {
						project.modelId = modelId;
						$scope.projects.unshift(project);
					}
				});

			});
		});
	};

	$scope.openReport = function (project) {
		TabsService.switchToReport(project);
	};

	$scope.runPredict = function (project) {
		ElysiumService.startPrediction(project.modelId, '1/1/2014', function (error, predictionId) {
			console.log('cfpLoadingBar start');
			cfpLoadingBar.start();
			if (!error) {
				//Poll results 5 times per 5 seconds
				var pollHandler = $interval(function () {
					ElysiumService.getPredictionResults(predictionId, function (error, predictionResults) {
						if (!error) {
							if (predictionResults) {
								$interval.cancel(pollHandler);
								project.results = predictionResults;
								TabsService.switchToReport(project);
								console.log('cfpLoadingBar complete');
								cfpLoadingBar.complete();
							}
						}else {
							//Stop since we got error
							$interval.cancel(pollHandler);
						}
					});
				}, 5000, 5);
			}
		});
	};

	$scope.runTrain = function (project) {
		cfpLoadingBar.start();
		$timeout(function () {
			TabsService.switchToReport(project);
			cfpLoadingBar.complete();
		}, 10000);
	};

	$scope.init();
}]);