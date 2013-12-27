var algorithm1 = require('../algorithms/Algorithm1');
var algorithm2 = require('../algorithms/Algorithm2');
var algorithm3 = require('../algorithms/Algorithm3');

// Exports
module.exports.predict = predict;


// predict values
function predict(algorithmId, values, callback) {
	var err;
	var ret = 0;
	
	console.log("***** AlgorithmControler ******");
	console.log("algorithmId " +algorithmId );
	console.log("values " + values );
	
	// TODO - Validar dados de entrada do algoritimo.	
	var isValidated = true; // valvalidate(values); 
	if( isValidated )
	{
		switch (algorithmId) {
			case 0:
				console.log("case 0");
				ret = algorithm1.predict(values);
				break
			case 1:
				console.log("case 1");
				ret = algorithm2.predict(values);
				break
			case 2:
				console.log("case 2");
				ret = algorithm3.predict(values);
				break
			default:
				console.log("default");
				err = "algorithm not found";
		}	
	}
	else{
		err = "invalid data";
	}
	
	return ret;
};