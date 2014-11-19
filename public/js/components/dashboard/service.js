/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 8/24/14
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory("DashboardService",['MessageBus','ElysiumService', function(MessageBus, ElysiumService){

	//Should handle projec list
	var _projects = [{name:'p1', creator:'Jack Sparrow', creationDate:'18/11/2014 8:00', lastRunning:'18/11/2014 10:00', almHost:'http://myd-vm03386.hpswlabs.adapps.hp.com:8080'}];

	function _getAllProjects(){
		return _projects;
	}

	function _createProject(project){
		console.log('DashboardService createProject');
		console.dir(project);
		project.creationDate  = Date.now();
		project.lastRunning  = project.creationDate;
		ElysiumService.configure(project, function (error, modelId) {
				if (!error) {
					project.modelId = modelId;
					_projects.unshift(project);
					MessageBus.emitMsg('project.created', project);
				}
			});
	}

	function _deleteProject(id){
		MessageBus.emitMsg('project.delete', id);
	}

	return {
		getAllProjects:_getAllProjects,
		createProject: _createProject,
		deleteProject: _deleteProject
	};

}]);