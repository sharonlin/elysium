/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('MainController', ['$scope',function($scope) {

	$scope.selectedTabName = 'wizard';
	$scope.selectTab = function (tabName) {
		$scope.selectedTabName = tabName;
	}
	$scope.isTabSelected = function (tabName) {
		return $scope.selectedTabName === tabName;
	}
}]);