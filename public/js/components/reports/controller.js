/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('ReportsController', ['$scope','$timeout','MessageBus' ,function($scope, $timeout, MessageBus) {

	var d3gfx;
	$scope.init = function() {
//		MessageBus.onMsg('tab.report', $scope, function (event, project) {
//			$timeout(function () {
//				$scope.project = project;
//			});
//		});
		//Mock data
		$scope.project = {results:[
		 {moduleName:'A', prediction:50, recommendation:'Add 2 developers', x:50, y:0, complexity:10}
			,{moduleName:'Rt', prediction:56, recommendation:'Add 2 developers', x:40, y:50, complexity:15}
			,{moduleName:'OAPFA', prediction:68, recommendation:'Add 2 developers', x:60, y:30, complexity:22}
			,{moduleName:'KFA kas', prediction:43, recommendation:'Add 2 developers', x:80, y:64, complexity:18}
			,{moduleName:'D', prediction:42, recommendation:'Add 2 developers', x:100, y:27, complexity:12}
			,{moduleName:'E', prediction:20, recommendation:'Add 2 developers', x:70, y:28, complexity:11}
			,{moduleName:'F', prediction:11, recommendation:'Add 2 developers', x:70, y:86, complexity:11}
			,{moduleName:'R', prediction:45, recommendation:'Add 2 developers', x:70, y:48, complexity:11}
			,{moduleName:'et', prediction:59, recommendation:'Add 2 developers', x:54, y:65, complexity:14}
			,{moduleName:'afa', prediction:11, recommendation:'Add 2 developers', x:29, y:86, complexity:16}
		]};
		InitChart();
	}


	function InitChart(){
		d3gfx = new D3GFX({elSvg:'#riskChart'});
		d3gfx.renderGraph($scope.project.results);
	}

	$scope.init();
}]);