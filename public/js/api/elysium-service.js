/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 10/21/14
 * Time: 8:17 AM
 * To change this template use File | Settings | File Templates.
 */
elysiumApp.factory("ElysiumService", ['$http', function ($http) {

	function _runPrediction(host, port, cb) {
		$http.post('api/run', {host: host, port: port, path: context, type: 'jenkins'}).success(function (data, status) {
			cb(data);
		}).error(function (data, status) {
				cb(null);
			});
	}

	function _getLastResults(host, port, cb) {
		$http.get('api/results').success(function (data, status) {
			cb(data);
		}).error(function (data, status) {
				cb(null);
			});
	}

	return {
		runPrediction: _runPrediction,
		getLastResults: _getLastResults
	}
}]);