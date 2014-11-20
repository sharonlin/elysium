/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/20/14
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.directive('modal', function () {
	return {
		template: '<div class="modal fade">' +
			'<div class="modal-dialog" style="margin-top: 20%;">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
			'<h4 class="modal-title">{{ title }}</h4>' +
			'</div>' +
			'<div class="modal-body" ng-transclude></div>' +
			'</div>' +
			'</div>' +
			'</div>',
		restrict: 'E',
		transclude: true,
		replace:true,
		scope:true,
		link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$on('showLoadingData', function() {
				$(element).modal('show');
			});
			scope.$on('progressMessage', function(event, message) {
				console.log(message);
				$(element).find("span").html(message);
			});
			scope.$on('hideLoadingData', function() {
				$(element).modal('hide');
			});
//			scope.$watch(attrs.visible, function(value){
//				console.log("sdfsdsfs");
//				if(value == true)
//					$(element).modal('show');
//				else
//					$(element).modal('hide');
//			});

			$(element).on('shown.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function(){
				scope.$apply(function(){
					scope.$parent[attrs.visible] = false;
				});
			});
		}
	};
});