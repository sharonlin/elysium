/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/13/14
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.directive('countUp', ['$compile',function($compile,$timeout) {
	return {
		restrict: 'E',
		replace: false,
		scope: {
			countTo: "=countTo",
			interval: "=interval",
			units: '=units'
		},
		controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
			$scope.millis = 0;
			if ($element.html().trim().length === 0) {
				$element.append($compile('<span>{{millis}}</span>')($scope));
			} else {
				$element.append($compile($element.contents())($scope));
			}

			var i=0;
			function timeloop () {
				$timeout(function () {
					$scope.millis++;
					//$scope.$digest();
					i++;
					if (i<$scope.countTo) {
						timeloop();
					}
				}, $scope.interval)
			}
			timeloop();
		}]
	}}]);