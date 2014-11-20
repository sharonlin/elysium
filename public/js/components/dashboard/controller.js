/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('DashboardController', ['$scope', '$interval', '$timeout', 'MessageBus', 'TabsService', 'cfpLoadingBar', 'ElysiumService', 'DashboardService', function ($scope, $interval, $timeout, MessageBus, TabsService, cfpLoadingBar, ElysiumService, DashboardService) {

	$scope.showModal = false;
	$scope.showLoadingData = function(){
			$scope.$broadcast('showLoadingData');
	};
	$scope.hideLoadingData = function(){
		$scope.$broadcast('hideLoadingData');
	};
	$scope.progressMessage = function (message){
		$scope.$broadcast('progressMessage', message);
	}

	$scope.init = function () {
		$scope.projects = DashboardService.getAllProjects();
//			[
//		 {name:'p1', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
//		,{name:'p2', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
//		];


		MessageBus.onMsg('project.created', $scope, function (event, project) {
			$timeout(function () {
				$scope.projects = DashboardService.getAllProjects();
			});
		});
	};

	$scope.openReport = function (project) {
		TabsService.switchToReport(project);
	}

	$scope.runPredict = function (project) {
		$scope.showLoadingData();
		$timeout(function(){
			$scope.progressMessage('Processing Data ...');
			$timeout(function(){
				$scope.progressMessage('Calculating Quality Scores ...');

				$timeout(function(){

					$scope.progressMessage('Processing Recommendations ...');
					$timeout(function(){
						$scope.progressMessage('');
						TabsService.switchToReport(project);
						$scope.hideLoadingData();
					},3000);
				}, 3000);
			}, 3000);
		}, 0);





					//project.results = predictionResults;

//		ElysiumService.almLogin(project, function(error){
//			if(!error){
//				ElysiumService.almSession(project, function(error){
//					if(!error){
//						ElysiumService.syncPrediction(project, function (error, predictionResults) {
//							if (!error) {
//								console.dir(predictionResults);
//								$timeout(function(){
//									project.results = predictionResults;
//								});
//								TabsService.switchToReport(predictionResults);
//
//							} else {
//								console.dir(error);
//							}
//						});
//					}
//				});
//
//			}
//		});



//		ElysiumService.syncPrediction(project, function(error, predictionResults) {
//			cfpLoadingBar.start();
//			if (!error) {
//				if (predictionResults) {
//					TabsService.switchToReport(project);
//					console.dir(predictionResults);
//					project.results = predictionResults;
//					cfpLoadingBar.complete();
//				}
//			}
//		});
	}
//	$scope.runPredict = function (project) {
//		ElysiumService.startPrediction(project.modelId, '1/1/2014', function (error, predictionId) {
//			cfpLoadingBar.start();
//			if (!error) {
//				//Poll results 5 times per 5 seconds
//				var pollHandler = $interval(function () {
//					ElysiumService.getPredictionResults(predictionId, function (error, predictionResults) {
//						if (!error) {
//							if (predictionResults) {
//								$interval.cancel(pollHandler);
//								project.results = predictionResults;
//								TabsService.switchToReport(project);
//								cfpLoadingBar.complete();
//							}
//						}else {
//							//Stop since we got error
//							$interval.cancel(pollHandler);
//						}
//					});
//				}, 5000, 5);
//			}
//		});
//	}

	$scope.runTrain = function (project) {
		cfpLoadingBar.start();
		$timeout(function () {
			TabsService.switchToReport(project);
			cfpLoadingBar.complete();
		}, 10000);
	};

	$scope.init();
}]);