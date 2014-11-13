/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('ReportsController', ['$scope','$timeout','MessageBus' ,function($scope, $timeout, MessageBus) {

	$scope.init = function() {
//		MessageBus.onMsg('tab.report', $scope, function (event, project) {
//			$timeout(function () {
//				$scope.project = project;
//			});
//		});
		//Mock data
		$scope.project = {results:[
		 {moduleName:'A', prediction:50, recommendation:'Add 2 developers'}
		,{moduleName:'RRER', prediction:98, recommendation:'Add 2 developers'}
		,{moduleName:'OAPFA', prediction:68, recommendation:'Add 2 developers'}
		,{moduleName:'KFA kas', prediction:43, recommendation:'Add 2 developers'}
		,{moduleName:'D', prediction:42, recommendation:'Add 2 developers'}
		,{moduleName:'E', prediction:20, recommendation:'Add 2 developers'}
		,{moduleName:'F', prediction:11, recommendation:'Add 2 developers'}]}
	}

	$scope.init();
}]);