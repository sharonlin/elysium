/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('ReportsController', ['$scope','$timeout','MessageBus' ,function($scope, $timeout, MessageBus) {

	var d3gfx;
	$scope.isRecommendationVisible = false;
	$scope.toggle = function() {
		$scope.isRecommendationVisible = !$scope.isRecommendationVisible;
		$scope.$broadcast('event:toggle');
	}
	$scope.init = function() {
//				MessageBus.onMsg('tab.report', $scope, function (event, results) {
//								$timeout(function () {
//									console.log('Before Normalized');
//									console.dir(results.modules);
//									results.modules = results.modules.slice(0,10).map(function(module){
//										module.name
//										module.predictedQuality = Math.floor(module.predictedQuality); //y1
//										module.predictedQualityAfterRecommendations = Math.floor(parseFloat(module.predictedQualityAfterRecommendations) * 100); //y2
//										module.previousReleaseScore = isNaN(module.previousReleaseScore) ? 25 : Math.floor(module.previousReleaseScore); //x
//										module.size = Math.floor(module.size);
//										return module;
//									});
//									console.log('After Normalized');
//									console.dir(results.modules);
//									$scope.project = {results:results.modules};
//									$scope.selectedItem = $scope.project.results[0];
//									InitChart();
//								});
//				});

		MessageBus.onMsg('tab.report', $scope, function (event, results) {
			$timeout(function () {
				var mockResults = [
				{"name": "A","size": "19","previousReleaseScore": "10","predictedQuality": "0.36","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.76"},
				{"name": "B","size": "18","previousReleaseScore": "52","predictedQuality": "0.60","recommendation": "too much developers 2","predictedQualityAfterRecommendations": "0.87"},
				{"name": "C","size": "16","previousReleaseScore": "80","predictedQuality": "0.18", "recommendation": "too much developers 3","predictedQualityAfterRecommendations": "0.56"},
				{"name": "T","size": "15","previousReleaseScore": "27","predictedQuality": "0.24","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.76"},
				{"name": "D","size": "18","previousReleaseScore": "58","predictedQuality": "0.42","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.83"},
				{"name": "E","size": "17","previousReleaseScore": "43","predictedQuality": "0.33","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.65"},
				{"name": "F","size": "16","previousReleaseScore": "75","predictedQuality": "0.51","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.73"},
				{"name": "R","size": "14","previousReleaseScore": "86","predictedQuality": "0.45","recommendation": "too much developers","predictedQualityAfterRecommendations": "0.86"}
				];

				mockResults = mockResults.map(function(module){
					module.name
					module.predictedQuality = Math.floor(parseFloat(module.predictedQuality) * 100); //y1
					module.predictedQualityAfterRecommendations = Math.floor(parseFloat(module.predictedQualityAfterRecommendations) * 100); //y2
					module.previousReleaseScore = Math.floor(module.previousReleaseScore); //x
					module.size = Math.floor(parseFloat(module.size));
					return module;
				});
				console.log('Normalized data');
				console.dir(mockResults);
				$scope.project = {results:mockResults};
				$scope.selectedItem = $scope.project.results[0];
				InitChart();
			});
		});

	}

	$scope.selectItem = function(item) {
		$scope.selectedItem = item;
	}

	function InitChart(){
		d3gfx = new D3GFX({elSvg:'#riskChart'});
		d3gfx.setFeatureClickedListener(function(featureName){
			console.log('Feature '+featureName+' Clicked');
			//Find it in the array and set it as active
			angular.forEach($scope.project.results, function(feature){
				if(feature.name === featureName) {
					$timeout(function(){
						$scope.selectedItem = feature;
						$scope.$broadcast('event:show');
					},0);
					return true;
				}
			});
		});
		d3gfx.renderGraph($scope.project.results);
	}

//	$scope.init();
}]);