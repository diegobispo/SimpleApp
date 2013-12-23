var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

var username = ""
var password = "";
var address = 'localhost:27017/nockmarket';
connect();
// Connect to mongo
function connect() {
//var url = 'mongodb://' + username + ':' + password + address;
var url = 'mongodb://' + address;
mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}