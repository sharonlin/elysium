/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('ReportsController', ['$scope','$timeout','MessageBus' ,function($scope, $timeout, MessageBus) {

	var d3gfx;
	$scope.toggle = function() {
		$scope.$broadcast('event:toggle');
	}
	$scope.init = function() {
//		MessageBus.onMsg('tab.report', $scope, function (event, project) {
//			$timeout(function () {
//				$scope.project = project;
				$scope.project = {results:[
					{moduleName:'A', prediction:50, recommendation:'Add 2 developers', x:85, y:57, complexity:15}
					,{moduleName:'R', prediction:56, recommendation:'Add 2 developers', x:10, y:50, complexity:15}
					,{moduleName:'O', prediction:68, recommendation:'Add 2 developers', x:80, y:30, complexity:22}
					,{moduleName:'K', prediction:43, recommendation:'Add 2 developers', x:80, y:64, complexity:18}
					,{moduleName:'E', prediction:20, recommendation:'Add 2 developers', x:30, y:28, complexity:19}
					,{moduleName:'F', prediction:11, recommendation:'Add 2 developers', x:70, y:86, complexity:17}
					,{moduleName:'UU', prediction:59, recommendation:'Add 2 developers', x:54, y:65, complexity:25}
					,{moduleName:'R', prediction:45, recommendation:'Add 2 developers', x:70, y:48, complexity:22}
					,{moduleName:'J', prediction:11, recommendation:'Add 2 developers', x:78, y:50, complexity:19}
					,{moduleName:'D', prediction:42, recommendation:'Add 2 developers', x:80, y:20, complexity:17}
				]};
				$scope.selectedItem = $scope.project.results[0];
				InitChart();

//			});
//		});
		//Mock data

		var a = {
			     "modules" :
			      [
				          {
			              "name": "Installation",
				              "size": "56",
				              "score": "0.56",
				              "currentStatus": "BAD",
				              "recommendation": "too much developers",
				            "afterImprovement": "0.76"
			        },
				      {
					      "name": "Installation",
					      "size": "56",
					      "score": "0.56",
					      "currentStatus": "BAD",
					      "recommendation": "too much developers",
					      "afterImprovement": "0.76"
				      }
			      ]
		};
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
				if(feature.moduleName === featureName) {
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

	$scope.init();
}]);