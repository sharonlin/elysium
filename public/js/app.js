/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:06 PM
 * To change this template use File | Settings | File Templates.
 */

var elysiumApp = angular.module('elysiumApp', ['chieffancypants.loadingBar', 'ngRoute', 'ui.date']);

elysiumApp.directive('toggle', function() {
	return function(scope, elem, attrs) {
		scope.$on('event:toggle', function() {
			elem.toggle("slide");
		});
		scope.$on('event:show', function() {
			elem.show("slide");

		});
	};
});

// configure our routes
elysiumApp.config(function($routeProvider, $locationProvider) {

//	$locationProvider.html5Mode(true).hashPrefix('!');
//	$routeProvider
//
//		// route for the home page
//		.when('/', {
//			templateUrl : 'js/components/wizard/wizard.html',
//			controller  : 'WizardController'
//		})
//		.when('/dashboard', {
//			templateUrl : 'js/components/dashboard/dashboard.html',
//			controller  : 'DashboardController'
//		})
//
//		// route for the contact page
//		.when('/reports', {
//			templateUrl : 'js/components/reports/reports.html',
//			controller  : 'ReportsController'
//		})
//		.when('/tab1', {
//			templateUrl : 'js/components/wizard/wizard.html',
//			controller  : 'WizardController'
//		})
//		.when('/tab2', {
//			templateUrl : 'js/components/wizard/wizard.html',
//			controller  : 'WizardController'
//		})
//		.when('/tab3', {
//		templateUrl : 'js/components/wizard/wizard.html',
//		controller  : 'WizardController'
//	}).otherwise({
//		redirectTo: '/bad'
//	});
});