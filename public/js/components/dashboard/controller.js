/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('DashboardController', ['$rootScope','$scope','MessageBus',function($rootScope, $scope, MessageBus) {
	$scope.init = function() {
		$scope.projects = [{name:'p1', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p1', creator:'Jack Sparrow', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p2', creator:'Jack Jack', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p3', creator:'Jack Kacl', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p4', creator:'Jack Foo', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}
		,{name:'p5', creator:'Jack Boo', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'}];


		MessageBus.onMsg('project.create', $scope, function(event, data) {
			console.dir('DashboardController:'+data);
			$scope.$apply(function(){$scope.projects.unshift(data);});

		});
	}


	$scope.init();
}]);