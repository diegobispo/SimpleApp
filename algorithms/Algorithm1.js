// Exports
module.exports.predict = predict;

//TODO fazer a chamada python
function predict(values, callback) 
{
	console.log("Algorithm 1: " + values);
	console.log("Values: " + values);
	
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
	console.log("list: " + list);
	return  list;
}