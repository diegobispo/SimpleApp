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

var MyApp = angular.module('MyApp', [ 'angles' ])

MyApp.controller('control',['$scope', '$http', function ($scope, $http){
	$scope.imputDataItens = getImputData();
	$scope.isVisible = false;
	$scope.submit = function() {
		if (this.text) {
			$scope.isVisible = true;
			
			var data = getData(this.imputData);
			algorithmId = this.text;
			
			var x = data.x;
			var y = data.y;			
			$scope.imputPoints= getPoints(x, y);
						
			console.log('1 $scope.inputXs: '+ $scope.inputXs);
			console.log('1 $scope.inputYs: '+ $scope.inputYs);
			
			var xPred = getFakePredictions(x);
			var yPred = getFakePredictions(y);			
			$scope.outputPoints= getPoints(xPred, yPred);
			
			
			console.log('data.x: '+  data.y);
			console.log(' data.y: '+  data.x);
			
			/*$http.get('/predict/:imputPoints/algorithm/:algorithmId', imputPoints,algorithmId).success(function(predict){  
				$scope.outputPoints= predict;
			});*/
			
			//app.post('/predict/:dataID/algorithm/:algorithmId', function(req, res)
						
			 $scope.chartDataIn = {
			    labels :  x,
			    datasets : [
				{
				    fillColor : "rgba(151,187,205,0)",
				    strokeColor : "#e67e22",
				    pointColor : "rgba(151,187,205,0)",
				    pointStrokeColor : "#e67e22",
				    data : y
				}				
			    ] 
			};
			
			$scope.chartDataOut = {
			    labels :  xPred,
			    datasets : [
				{
				    fillColor : "rgba(151,187,205,0)",
				    strokeColor : "#e67e22",
				    pointColor : "rgba(151,187,205,0)",
				    pointStrokeColor : "#e67e22",
				    data : yPred
				}				
			    ]
			};



		    $scope.myChartOptions =  getChartOptions();
		    
			
		}
	};
}])

function getChartOptions(){
	var  ret = {
		//Boolean - If we show the scale above the chart data			
		scaleOverlay : false,
		
		//Boolean - If we want to override with a hard coded scale
		scaleOverride : false,
		
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : null,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : null,
		//Number - The scale starting value
		scaleStartValue : null,

		//String - Colour of the scale line	
		scaleLineColor : "rgba(0,0,0,.1)",
		
		//Number - Pixel width of the scale line	
		scaleLineWidth : 1,

		//Boolean - Whether to show labels on the scale	
		scaleShowLabels : true,
		
		//Interpolated JS string - can access value
		scaleLabel : "<%=value%>",
		
		//String - Scale label font declaration for the scale label
		scaleFontFamily : "'Arial'",
		
		//Number - Scale label font size in pixels	
		scaleFontSize : 12,
		
		//String - Scale label font weight style	
		scaleFontStyle : "normal",
		
		//String - Scale label font colour	
		scaleFontColor : "#666",	
		
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,
		
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,	
		
		//Boolean - Whether the line is curved between points
		bezierCurve : true,
		
		//Boolean - Whether to show a dot for each point
		pointDot : true,
		
		//Number - Radius of each point dot in pixels
		pointDotRadius : 3,
		
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,
		
		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,
		
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,
		
		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,
		
		//Boolean - Whether to animate the chart
		animation : true,

		//Number - Number of animation steps
		animationSteps : 60,
		
		//String - Animation easing effect
		animationEasing : "easeOutQuart",

		//Function - Fires when the animation is complete
		onAnimationComplete : null
	}
	
	return ret;
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
	var list = [];
	
	for (var i=0; i < length; i++)
	{
		list.push(values[i]);
	}
		
	for (var i=0; i < 20; i++)
	{
		var randomIndex = Math.floor(Math.random()* (length-1));
		var randomNumber = Math.floor(Math.random()* (length-1));		
		var value = values[randomIndex] + randomNumber;
		
		list.push(value);
	}
	
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