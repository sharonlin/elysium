/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/20/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.controller('WizardController', ['$scope','$timeout', "$location", "TabsService", "DashboardService", "cfpLoadingBar", "ElysiumService", function ($scope,$timeout, $location, TabsService, DashboardService, cfpLoadingBar, ElysiumService) {

	//$scope.project = {name:'p100', dbType:'',creator:'Jack Boo', creationDate:'1/1/2014 8:00', lastRunning:'1/2/2014 10:00'};

	$scope.addRelease = function() {
		$scope.project.releases.push({from:null, to:null, freeze:null});
	}
	$scope.init = function () {
		console.log('WizardController init');
		$scope.project = _initProject();
		_configureWizard();
	};
	$scope.noop = function(){};


	function _almLogin(){
		ElysiumService.almLogin($scope.project, function(error){
			if(!error){
//					ElysiumService.getFields($scope.project, function(fields){
//						$timeout(function(){
//							$scope.project.fields = fields;
//						});
//				});

				ElysiumService.syncPrediction($scope.project, function(error, predictionResults){
					if(!error) {
						console.dir(predictionResults);
					}else {
						console.dir(error);
					}
				});
			}
		});
	}
	function _configureWizard() {

		$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length;
			var $current = index+1;
			var $percent = ($current/$total) * 100;
			$('#rootwizard').find('.bar').css({width:$percent+'%'});

			// If it's the last tab then hide the last button and show the finish instead
			if($current >= $total) {
				$('#rootwizard').find('.pager .next').hide();
				$('#rootwizard').find('.pager .finish').show();
				$('#rootwizard').find('.pager .finish').removeClass('disabled');
			} else {
				$('#rootwizard').find('.pager .next').show();
				$('#rootwizard').find('.pager .finish').hide();
			}

		},
			'onNext': function (tab, navigation, index) {
				console.log('Index:'+index);
				switch (index) {
					case 1:
						_almLogin();
						break;
					case 2:

						break;
					case 3:
						break;
				}
			}
		});
	}
	function _initProject (){
		return {creator:'Jfk',almHost:'http://myd-vm03386.hpswlabs.adapps.hp.com:8080',fieldsMapping:[{logicalFieldName:'A'}, {logicalFieldName:'B'}, {logicalFieldName:'C'}], releases:[{from:null, to:null, freeze:null}]};
	}

	$scope.onWizardFinish = function(){
		//cfpLoadingBar.start();
		//$timeout(function(){
			DashboardService.createProject($scope.project);
			//Reset scope project
			$scope.project = _initProject();
			TabsService.switchToDashboard();
			//cfpLoadingBar.complete();
		//}, 10000);

	}
	//$scope.init();

}]);