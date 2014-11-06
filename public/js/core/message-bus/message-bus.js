/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 3:19 PM
 */
elysiumApp.factory('MessageBus', ['$rootScope', function($rootScope) {
		var msgBus = {};
		msgBus.emitMsg = function(msg, data) {
			console.log('emitMsg '+msg);
			$rootScope.$emit(msg, data);
		};
		msgBus.onMsg = function(msg, scope, func) {
			var unbind = $rootScope.$on(msg, func);
			scope.$on('$destroy', unbind);
		};
		return msgBus;
	}]);
