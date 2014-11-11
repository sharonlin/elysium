/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('ReportsController', ['$scope','$timeout','MessageBus' ,function($scope, $timeout, MessageBus) {

	$scope.init = function() {
		MessageBus.onMsg('tab.report', $scope, function (event, project) {
			$timeout(function () {
				$scope.project = project;
			});
		});
	}

	$scope.init();
}]);