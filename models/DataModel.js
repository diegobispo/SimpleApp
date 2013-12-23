var db = require('../lib/db');
var DataModelSchema = new db.Schema({
	xIn: [Number],
	yIn: [Number],
	xOut: [Number],
	yOut: [Number],
	inputImage: Buffer,
	outputImage: Buffer
})


var MyDataModel = db.mongoose.model('DataModel', DataModelSchema);

// Exports
module.exports.addDataModel = addDataModel;


// Add DataModel to database
function addDataModel(xIn, yIn, xOut, yOut, inputImage, outputImage, callback) {
	var instance = new MyDataModel();
	instance.xIn = xIn;
	instance.yIn = yIn;
	instance.xOut = xOut;
	instance.inputImage = inputImage;
	instance.outputImage = outputImage;
	
	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance)
		}
	});
}