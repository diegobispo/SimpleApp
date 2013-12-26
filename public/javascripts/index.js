/*
* Constants
*/
var ID_DATA1 = 0;
var ID_DATA2 = 1;
var ID_DATA3 = 2;
var ID_DATA4 = 3;

function getImputData(){

	var inputdata = [{
		'label': 'Data 1',
		'value': ID_DATA1
		}, {
		'label': 'Data 2',
		'value': ID_DATA2
		}, {
		'label': 'data3',
		'value': ID_DATA3
		},{
		'label': 'data4',
		'value': ID_DATA4
		}
	];
	
	return inputdata;
};

function control($scope,$http){
	$scope.imputDataItens = getImputData();
	
	$scope.submit = function() {
		if (this.text) {
			console.log('Estou no submit');
			console.log('Text: '+ this.text);
			
			var data = getData(this.imputData);
			algorithmId = this.text;
			
			var x = data.x;
			var y = data.y;
			$scope.imputPoints= getPoints(x, y);
			
			var xPred = getFakePredictions(x);
			var yPred = getFakePredictions(y);
			$scope.outputPoints= getPoints(xPred, yPred);
						
			/*$http.get('/predict/:imputPoints/algorithm/:algorithmId', imputPoints,algorithmId).success(function(predict){  
				$scope.outputPoints= predict;
			});*/
			
			//app.post('/predict/:dataID/algorithm/:algorithmId', function(req, res)
		}
	};
}


function getData(dataId) {
	var ret;
	
	switch (dataId) {
			case ID_DATA1:
				ret = {"x":[1,2,3,4,5], "y":[4,5,6,7,8]};
				break
				
			case ID_DATA2:
				ret = {"x":[2,4,5,6,7], "y":[2,4,5,6,7]};
				break
				
			case ID_DATA3:
				ret = {"x":[1,2,3,4,5], "y":[1,2,3,4,5]};
				break
				
			case ID_DATA4:
				ret = {"x":[8,9,10,11,12], "y":[10,9,8,7,8]};
				break
		}
	
	return ret;
};


function getFakePredictions(values) {

	var length = values.length;
	
	var list = values;
	console.log('length 1: ' + length);
	
	for (var i=0; i < 20; i++)
	{
		var randomIndex = Math.floor(Math.random()* (length-1));
		var randomNumber = Math.floor(Math.random()* (length-1));		
		var value = values[randomIndex] + randomNumber;
		
		list.push(value);
	}
	console.log('list.length: ' + list.length);
	console.log('length 2: ' + length);
		
	return  list;
};

function getPoints(listX, listY) {

	var length = listX.length;
	
	var list = [];
	
	for (var i=0; i < length; i++)
	{
		var point = [];
		point.x = listX[i];
		point.y = listY[i];
		
		list.push(point);
	}
	
	return  list;
};