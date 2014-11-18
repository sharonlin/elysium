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
	function _syncPrediction(cb) {
		console.log('Start prediction');
		$http.get('api/runSync').success(function (data, status) {
			cb(null, data);
		}).error(function (data, status) {
				cb('Start prediction Failure');
			});
	};

	function _startPrediction(modelId, targetRelease, cb) {
		console.log('Start prediction '+modelId);
		$http.post('api/run',{modelid:modelId, targetrelease:targetRelease} ).success(function (data, status) {
			cb(null, predictionId++);
		}).error(function (data, status) {
			cb('Start prediction Failure');
		});
	};

	function _getPredictionResults(predictionId, cb) {
		console.log('Get Prediction Results for predictionId:'+predictionId);
		$http.get('api/results/'+predictionId).success(function (data, status) {
			cb(null, data);
		}).error(function (data, status) {
				cb('get prediction results failure');
			});
	};

	function _configure(options, cb) {
		console.log('Start prediction');
		$http.post('api/configure', options).success(function (data, status) {
			cb(null, modelId++);
		}).error(function (data, status) {
				cb('Model Configure Failure');
			});
	};

	function _almLogin(options, cb) {
		console.log('ALM Login '+options.almHost);
		//{withCredentials: true}
		$http.get('api/almLogin?almHost='+options.almHost)
			.success(function(data, status){
			cb();
		}).error(function (data, status) {
			cb('ALM Login Failure');
		});

	};

	function _getFields(options, cb) {
		$http.get('api/getDBFields?almHost='+options.almHost)
			.success(function(data, status){
				cb([{'name':'f1'}, {'name':'f2'}, {'name':'f3'}, {'name':'f4'}, {'name':'f5'}]);
			}).error(function (data, status) {
				cb();
			});
	};

	return {
		almLogin: _almLogin,
		getFields: _getFields,
		configure: _configure,
		startPrediction: _startPrediction,
		getPredictionResults: _getPredictionResults,
		syncPrediction : _syncPrediction
	}
}]);