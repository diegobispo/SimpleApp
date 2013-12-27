
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var DataModel = require('./models/DataModel');
var AlgorithmController = require('./controllers/AlgorithmController.js');
var ImageController = require('./controllers/ImageController.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/user', user.list);
app.get('/', function(req, res) {
	
	fs.readFile('./views/index.html', function(error, content) {
		if (error) {
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content, 'utf-8');
		}
	});
});

app.get('/predict/:id', function(req, res) {
	var predictId = req.params.id;
	DataModel.findById(predictId, function(err, data){
		if (err) throw err;

		res.json(data);
	});
});

app.post('/predict/' , function(req, res){
	console.log('**** Get Predcit *********');
	
	var algorithmId = req.body.algorithmId;
	var imputPoints = req.body.imputPoints;

	//console.log(req);
	
	//console.log("***** algorithmId: " +algorithmId);
	
	//{"x":[1,2,3,4,5], "y":[4,5,6,7,8]};
	
	var xIn = imputPoints.x;
	var yIn = imputPoints.y;
	
	console.log("**** xIn: " +xIn);
	console.log("**** yIn: " +yIn);
	
	var xOut = AlgorithmController.predict(algorithmId, xIn);
	var yOut = AlgorithmController.predict(algorithmId, yIn);
	
	console.log("**** xOut: " +xOut);
	console.log("**** yOut: " +yOut);

	
	//var inputImage = ImageController.generatBinaryImage(xIn, yIn);//TODO - implementar esta funcao na classe ImageController
	//var outputImage = ImageController.generatBinaryImage(xOut, yOut);//TODO - implementar esta funcao na classe ImageController 
	
	DataModel.addDataModel(xIn, yIn, xOut, yOut, function(err, predict){
		if (err) throw err;
		res.json(predict._id);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
