/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory("TabsService",['$rootScope', 'MessageBus', function($rootScope, MessageBus){

	function _switchToDashboard(){
		console.log('switchToDashboard');
		MessageBus.emitMsg('tab.dashboard');
	}

    function _switchToWizard(){
        MessageBus.emitMsg('tab.wizard');
    }
	function _switchToReport(project){
		MessageBus.emitMsg('tab.report', project);
	}

	return {
		switchToDashboard: _switchToDashboard,
        switchToWizard: _switchToWizard,
        switchToReport: _switchToReport
	};

}]);