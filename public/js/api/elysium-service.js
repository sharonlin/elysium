/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/21/14
 * Time: 8:17 AM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory("ElysiumService", ['$http', function ($http) {

	var modelId = 0;
	var predictionId = 0;
	function _startPrediction(modelId, targetRelease, cb) {
		$http.post('api/run', {host: host, port: port, path: context, type: 'jenkins'}).success(function (data, status) {
			cb(predictionId++);
		}).error(function (data, status) {
				cb(null);
			});
	};

	function _getPredictionResults(options, cb) {
		$http.get('api/results').success(function (data, status) {
			cb(data);
		}).error(function (data, status) {
				cb(null);
			});
	};

	function _configure(options) {
		return modelId++;
	};

	function _almLogin(options) {

	};

	function _getFields(options) {

	};

	return {
		almLogin: _almLogin,
		getFields: _getFields,
		configure: _configure,
		startPrediction: _startPrediction,
		getPredictionResults: _getPredictionResults
	}
}]);