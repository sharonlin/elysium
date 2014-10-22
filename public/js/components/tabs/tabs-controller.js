/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('TabsController', function ($scope, MessageBus,$location){
	$scope.init = function (){
		$scope.tab = "wizard";

		MessageBus.onMsg('tab.dashboard', $scope, function(data) {
            $location.path('dashboard');
		});
        MessageBus.onMsg('tab.wizard', $scope, function(data) {
            $location.path('wizard');
        });
	}


    $scope.$on('$locationChangeStart', function (event, newLoc, oldLoc){
        if(newLoc.indexOf("dashboard") !== -1){
            $scope.selectTab("dashboard");
        }
        else if(newLoc.indexOf("wizard") !== -1){
            $scope.selectTab("wizard");
        }
    });

	$scope.selectTab = function (setTab){
		$scope.tab = setTab;
	};
	$scope.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};

	$scope.init();

});