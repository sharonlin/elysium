/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/9/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
function _almLogin(req, res){
	console.log('almLogin');
	res.json({data:'ALM Login Mock Data'});
}
function _getDBFields(req, res){
	console.log('getDBFields');
	res.json({data:'DB Fields Mock Data'});
}
function _configure(req, res){
	console.log('configure');
	res.json({data:'Configure Mock Data'});
}
function _startPrediction(req, res){
	console.log('startPrediction '+req.body.predictionId);
	res.json({data:'Start Prediction Mock Data'});
}
function _getPredictionResults(req, res){
	console.log('getPredictionResults '+req.params.predictionId);
	res.json({data:'Prediction Results Mock Data'});
}


function _init(app, router){
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
	app.use('/api', router);

	router.post('/almLogin', _almLogin);
	router.get('/getDBFields', _getDBFields);
	router.post('/configure', _configure);
	router.post('/run', _startPrediction);
	router.get('/results/:predictionId', _getPredictionResults);
	console.log('Elysium Routes');
}

module.exports = function () {
	return {
		init : _init
	};
}()