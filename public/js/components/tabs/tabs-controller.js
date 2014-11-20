/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('TabsController', function ($scope, MessageBus,$location){
	$scope.init = function (){
		$scope.tab = "dashboard";

		MessageBus.onMsg('tab.dashboard', $scope, function(data) {
            $location.path('dashboard');
		});
        MessageBus.onMsg('tab.wizard', $scope, function(event, data) {
            $location.path('wizard');
        });
		MessageBus.onMsg('tab.report', $scope, function(event, data) {
			$location.path('report');
		});
	}


    $scope.$on('$locationChangeStart', function (event, newLoc, oldLoc){
        if(newLoc.indexOf("dashboard") !== -1){
            $scope.selectTab("dashboard");
        }
        else if(newLoc.indexOf("wizard") !== -1){
            $scope.selectTab("wizard");
        }
        else if(newLoc.indexOf("report") !== -1){
	        $scope.selectTab("reports");
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