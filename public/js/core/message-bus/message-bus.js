/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 3:19 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory('MessageBus', ['$rootScope', function($rootScope) {
		var msgBus = {};
		msgBus.emitMsg = function(msg, data) {
			$rootScope.$emit(msg, data);
		};
		msgBus.onMsg = function(msg, scope, func) {
			var unbind = $rootScope.$on(msg, func);
			scope.$on('$destroy', unbind);
		};
		return msgBus;
	}]);
