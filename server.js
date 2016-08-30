var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res)
{	
	var fileName = path.join(__dirname, 'index.html');
	res.sendFile(fileName, function(err)
	{
		if(err)
		{
			console.log(err);
			res.status(err.status).end();
		}
		else
		{
			console.log('Sent');
		}
	});
});

app.get('/api/shorten/:url', function(req, res)
{
	var str_url = req.params.url;
	res.end(str_url);
});

app.listen(port);