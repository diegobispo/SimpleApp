
//TODO fazer a chamada python
function predict(values, callback) 
{
	var length = values.length;
	
	var list = [];
	
	for (var i=0; i < values.length; i++)
	{
		var randomnumber = Math.floor(Math.random()*length);
		var plus = values[i] + randomnumber;
		list.push(plus);
	}
	
	return  list;
}