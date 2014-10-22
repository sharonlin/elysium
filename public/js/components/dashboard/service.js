/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory("DashboardService",['$rootScope', 'MessageBus', function($rootScope, MessageBus){

	//Should handle projec list
	function _createProject(project){
		project.creationDate  = Date.now();
		project.lastRunning  = project.creationDate;
		MessageBus.emitMsg('project.create', project);
	}
	function _deleteProject(id){
		MessageBus.emitMsg('project.delete', id);
	}

	return {
		createProject: _createProject,
		deleteProject: _deleteProject
	};

}]);