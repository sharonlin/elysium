/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/9/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var currentSessionCookie;
function _almLogin(req, res){
	console.log('ALM Login Host:'+req.query.almHost);
	var options = {
		//host: 'myd-vm05784.hpswlabs.adapps.hp.com',
		hostname:'web-proxy.isr.hp.com',
		port: 8080,
		path: req.query.almHost+'/qcbin/authentication-point/authenticate',//'http://myd-vm05784.hpswlabs.adapps.hp.com:8080/qcbin/authentication-point/authenticate',//req.query.almHost+'/qcbin/authentication-point/authenticate',
		auth: 'sa' + ':' +''
	};

	http.get(options, function(almRes){
		var body = "";
		almRes.on('data', function(data) {
			body += data;
		});
		almRes.on('end', function() {
			console.log('Login End');
			console.dir(almRes.headers);
			if(almRes.headers['set-cookie']) {
				currentSessionCookie = almRes.headers['set-cookie'];
				Object.defineProperty(almRes.headers, 'set-cookie', {
					value: almRes.headers['set-cookie'],
					writable: true,
					enumerable: true,
					configurable: true
				});
				res.header("Access-Control-Allow-Credentials", true);
				console.log('ALM Headers');
				console.dir(almRes.headers);
				res.status(almRes.statusCode).send('login successful');

			}
		});
		almRes.on('error', function(e) {
			console.log("Got error: " + e.message);
			res.status(almRes.statusCode).send('login failure');
		});
	});
}

function _getDBFields(req, res){
	//http://myd-vm05784.hpswlabs.adapps.hp.com:8080/qcbin/rest/domains/DEFAULT/projects/project1/customization/lists
	console.log('Get DB Fields');
	console.dir(currentSessionCookie);
	var options = {
		//host: 'myd-vm05784.hpswlabs.adapps.hp.com',
		hostname:'web-proxy.isr.hp.com',
		port: 8080,
		path: req.query.almHost+'/qcbin/rest/domains/ANNA/projects/proj1/customization/lists',//http://myd-vm05784.hpswlabs.adapps.hp.com:8080/qcbin/rest/domains/DEFAULT/projects/project1/customization/lists',
		headers: {
//			'Content-Length':0,
			'Content-Type':  'application/json',
//			'Cookie':        'LWSSO_COOKIE_KEY='+req.headers['Cookie']
			'Cookie':        currentSessionCookie[0]
		}
	};

	http.get(options, function(loginRes){
//		var body = "";
//		loginRes.on('data', function(data) {
//			body += data;
//		});
//		loginRes.on('end', function() {
//			console.dir(loginRes.headers);
//			if(loginRes.headers['set-cookie']) {
//				currentSessionCookie =  loginRes.headers['set-cookie'];
//			}
//		});
//		loginRes.on('error', function(e) {
//			console.log("Got error: " + e.message);
//		});
		loginRes.pipe(res);
	});
	//res.json({data:'DB Fields Mock Data'});
}
function _configure(req, res){
	console.log('configure');
	res.json({data:'Configure Mock Data'});
}
var counter = 0;
function _startPrediction(req, res){
//	console.log('startPrediction '+req.body.predictionId);

	console.log('Start Prediction');
	console.dir(currentSessionCookie);
	var options = {
		//host: 'myd-vm05784.hpswlabs.adapps.hp.com',
		hostname:'web-proxy.isr.hp.com',
		port: 8080,
		path: req.query.almHost+'/qcbin/rest/domains/ANNA/projects/proj1/prediction',//http://myd-vm05784.hpswlabs.adapps.hp.com:8080/qcbin/rest/domains/DEFAULT/projects/project1/customization/lists',

		headers: {
			'Accept': 'application/json',
			'Cookie':        currentSessionCookie[0]
		}
	};
	console.log(options);
	http.get(options, function(predictionResults){
		predictionResults.pipe(res);
	});
}
function _getPredictionResults(req, res){
	console.log('getPredictionResults '+req.params.predictionId);
	//if(counter++ % 2 === 0) {
		res.json([{moduleName:'A', prediction:85}, {moduleName:'B', prediction:28}, {moduleName:'C', prediction:76}, {moduleName:'D', prediction:74}, {moduleName:'E', prediction:68}]);
	//}else {
	//	res.send();
	//}
}


function _init(app, router){
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
	app.use('/api', router);

	router.get('/almLogin', _almLogin);
	router.get('/getDBFields', _getDBFields);
	router.post('/configure', _configure);
//	router.post('/run', _startPrediction);
	router.get('/runSync', _startPrediction);
	router.get('/results/:predictionId', _getPredictionResults);
	console.log('Elysium Routes');
}

module.exports = function () {
	return {
		init : _init
	};
}()