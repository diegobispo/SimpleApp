var db = require('../lib/db');
var DataModelSchema = new db.Schema({
	xIn: [Number],
	yIn: [Number],
	xOut: [Number],
	yOut: [Number]
})


var MyDataModel = db.mongoose.model('DataModel', DataModelSchema);

// Exports
module.exports.addDataModel = addDataModel;
module.exports.findById = findById;


// Add DataModel to database
function addDataModel(xIn, yIn, xOut, yOut, callback) {
	var instance = new MyDataModel();
	instance.xIn = xIn;
	instance.yIn = yIn;
	instance.xOut = xOut;
	instance.yOut = yOut;
		
	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}

// Find DataModel by ID
function findById(predictId, callback) {
	
	//var instance = new MyDataModel();
	
	MyDataModel.findOne({ _id: predictId }).exec( function(err, predict) {
		if (err) return console.error(err);
		
		console.log("findOne predict: " + predict );
		console.log("findOne predictId: " + predictId );
		return callback( null, predict);
	});     	
}